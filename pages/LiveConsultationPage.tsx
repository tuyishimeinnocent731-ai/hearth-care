import React, { useState, useEffect, useRef } from 'react';
// FIX: The 'LiveSession' type is not exported from '@google/genai'.
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
import type { Page } from '../types';
import { ArrowLeftIcon, MicrophoneIcon, SparklesIcon, UserCircleIcon } from '../components/IconComponents';

interface LiveConsultationPageProps {
    onNavigate: (page: Page) => void;
}

// --- Audio Helper Functions ---
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
// -----------------------------


const LiveConsultationPage: React.FC<LiveConsultationPageProps> = ({ onNavigate }) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [statusText, setStatusText] = useState('Kanda buto kugirango utangire.');
    const [transcription, setTranscription] = useState<{user: string, model: string}[]>([]);
    const [currentUserText, setCurrentUserText] = useState('');
    const [currentModelText, setCurrentModelText] = useState('');
    
    // FIX: Replaced non-exported 'LiveSession' type with 'any'.
    const sessionPromiseRef = useRef<Promise<any> | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

    const stopRecording = () => {
        if (sessionPromiseRef.current) {
             sessionPromiseRef.current.then(session => session.close());
             sessionPromiseRef.current = null;
        }
        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current = null;
        }
        if (mediaStreamSourceRef.current) {
            mediaStreamSourceRef.current.disconnect();
            mediaStreamSourceRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }
        setIsConnected(false);
        setIsConnecting(false);
        setStatusText('Ikiganiro kirangiye. Kanda buto wongere utangire.');
    };

    const handleToggleConsultation = async () => {
        if (isConnected || isConnecting) {
            stopRecording();
            return;
        }

        setIsConnecting(true);
        setStatusText('Turimo guhuza na seriveri...');
        setTranscription([]);
        setCurrentUserText('');
        setCurrentModelText('');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            let nextStartTime = 0;
            const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            const outputNode = outputAudioContext.createGain();
            const sources = new Set<AudioBufferSourceNode>();

            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
                        audioContextRef.current = inputAudioContext;

                        const source = inputAudioContext.createMediaStreamSource(stream);
                        mediaStreamSourceRef.current = source;

                        const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
                        scriptProcessorRef.current = scriptProcessor;

                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob: Blob = {
                                data: encode(new Uint8Array(new Int16Array(inputData.map(x => x * 32768)).buffer)),
                                mimeType: 'audio/pcm;rate=16000',
                            };
                            
                            if (sessionPromiseRef.current) {
                                sessionPromiseRef.current.then((session) => {
                                    session.sendRealtimeInput({ media: pcmBlob });
                                });
                            }
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputAudioContext.destination);
                        
                        setIsConnecting(false);
                        setIsConnected(true);
                        setStatusText('Wavuga... Ndi kukumva.');
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.outputTranscription) {
                            setCurrentModelText(prev => prev + message.serverContent!.outputTranscription!.text);
                        }
                        if (message.serverContent?.inputTranscription) {
                             setCurrentUserText(prev => prev + message.serverContent!.inputTranscription!.text);
                        }
                        if(message.serverContent?.turnComplete) {
                            setTranscription(prev => [...prev, {user: currentUserText, model: currentModelText}]);
                            setCurrentUserText('');
                            setCurrentModelText('');
                        }

                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                        if (base64Audio) {
                            nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
                            const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
                            const source = outputAudioContext.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputNode);
                            source.addEventListener('ended', () => sources.delete(source));
                            source.start(nextStartTime);
                            nextStartTime += audioBuffer.duration;
                            sources.add(source);
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Live session error:', e);
                        setStatusText('Habaye ikibazo. Ongera ugerageze.');
                        stopRecording();
                    },
                    onclose: () => {
                        console.log('Live session closed.');
                        stopRecording();
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                    systemInstruction: 'You are an AI medical triage assistant for a Rwandan health app. Your goal is to gather detailed information about a patient\'s symptoms. All communication must be in Kinyarwanda. Be empathetic and professional. Ask clarifying questions one at a time. Do not provide a diagnosis.',
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                },
            });

        } catch (err) {
            console.error("Failed to get media devices.", err);
            setStatusText("Ntushobora gukoresha mikoro. Reba uburenganzira bwawe.");
            setIsConnecting(false);
        }
    };
    
    useEffect(() => {
        return () => stopRecording(); // Cleanup on component unmount
    }, []);

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-full flex flex-col">
             <div className="max-w-4xl mx-auto w-full">
                <button onClick={() => onNavigate('dashboard')} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Subira ku Imbonerahamwe
                </button>
                 <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Ubujyanama bwa Live na AI</h1>
                    <p className="mt-2 text-lg text-gray-600">Girana ikiganiro cy'amajwi n'umujyanama wa AI.</p>
                </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto mt-8">
                 <button 
                    onClick={handleToggleConsultation} 
                    className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl
                        ${isConnecting ? 'bg-yellow-500 text-white' : ''}
                        ${isConnected ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}
                    `}
                    disabled={isConnecting}
                >
                    {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
                    <MicrophoneIcon className="w-16 h-16"/>
                </button>
                <p className="mt-6 font-semibold text-gray-700">{statusText}</p>
            </div>

            <div className="w-full max-w-4xl mx-auto mt-8 bg-white p-6 rounded-t-xl border flex-1 overflow-y-auto">
                <h3 className="font-bold text-lg mb-4">Ibyavuzwe mu kiganiro</h3>
                <div className="space-y-4">
                    {transcription.map((t, i) => (
                        <React.Fragment key={i}>
                            <div className="flex gap-3"><UserCircleIcon className="w-6 h-6 text-gray-400 flex-shrink-0"/><p>{t.user}</p></div>
                            <div className="flex gap-3"><SparklesIcon className="w-6 h-6 text-blue-500 flex-shrink-0"/><p className="text-blue-800">{t.model}</p></div>
                        </React.Fragment>
                    ))}
                    {currentUserText && <div className="flex gap-3"><UserCircleIcon className="w-6 h-6 text-gray-400 flex-shrink-0"/><p className="text-gray-500 italic">{currentUserText}</p></div>}
                    {currentModelText && <div className="flex gap-3"><SparklesIcon className="w-6 h-6 text-blue-500 flex-shrink-0"/><p className="text-blue-500 italic">{currentModelText}</p></div>}
                </div>
            </div>

        </div>
    );
};

export default LiveConsultationPage;