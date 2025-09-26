// FIX: Implement Gemini service with correct API usage
import { GoogleGenAI, Type } from "@google/genai";
import type { Doctor, Message } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

// FIX: Update function to handle attachments in chat history, providing full multi-modal context to the model.
function formatChatHistory(messages: Message[]) {
    // Filter out system messages and format for the API
    return messages
        .filter(msg => msg.sender !== 'system')
        .map(msg => {
            const parts: ({ text: string } | { inlineData: { data: string; mimeType: string; } })[] = [];
            
            if (msg.text) {
                parts.push({ text: msg.text });
            }

            if (msg.attachment) {
                const [header, data] = msg.attachment.data.split(',');
                const mimeType = header.match(/:(.*?);/)?.[1] || 'application/octet-stream';
                parts.push({ inlineData: { mimeType, data } });
            }

            return {
                role: msg.sender === 'user' ? 'user' : 'model',
                parts,
            };
        });
}

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: {
        data: await base64EncodedDataPromise,
        mimeType: file.type,
      },
    };
};

export const getAIHealthAdvice = async (
    newMessage: string,
    history: Message[]
): Promise<string> => {
    try {
        const chatHistory = formatChatHistory(history);

        const response = await ai.models.generateContent({
            model: model,
            contents: [
                ...chatHistory,
                { role: 'user', parts: [{ text: newMessage }] }
            ],
            config: {
                systemInstruction: `You are a helpful AI health assistant from MediConnect AI. Provide general health advice and information for disease prevention. Your responses should be informative, safe, and encouraging. Always remind the user that you are not a real doctor and they should consult a professional for medical diagnosis and treatment. Your advice is for informational purposes only. Speak in Kinyarwanda.`,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for AI Health Advice:", error);
        return "Tuvuganye n'ikibazo cya tekiniki. Mwihangane musubiremo nyuma.";
    }
};

export const sendSymptomDetails = async (
    newMessage: string,
    history: Message[],
    doctor: Doctor,
    file: File | null
): Promise<string> => {
    try {
        const chatHistory = formatChatHistory(history);
        // FIX: Explicitly type userParts to allow both text and inlineData parts, resolving the TypeScript error.
        const userParts: ({ text: string } | { inlineData: { data: string; mimeType: string; } })[] = [];

        // FIX: Refactored userParts creation to be type-safe and avoid unsafe property access on a union type.
        const textForPrompt = file
            ? `Please analyze the attached media and consider it along with my message: ${newMessage}`
            : newMessage;

        userParts.push({ text: textForPrompt });

        if (file) {
            const filePart = await fileToGenerativePart(file);
            userParts.push(filePart);
        }

        const response = await ai.models.generateContent({
            model: model,
            contents: [
                ...chatHistory,
                { role: 'user', parts: userParts }
            ],
            config: {
                systemInstruction: `You are Dr. ${doctor.name}, a ${doctor.specialty}. Respond to the user's symptoms in a helpful, professional, and empathetic manner. If an image or video is provided, analyze it as part of your diagnosis. Speak in Kinyarwanda.`,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Tuvuganye n'ikibazo cya tekiniki. Mwihangane musubiremo nyuma.";
    }
};


export const generateConsultationSummary = async (
    chatHistory: Message[],
    doctor: Doctor
): Promise<string> => {
    try {
        const conversation = chatHistory
            .filter(m => m.sender !== 'system')
            .map(m => `${m.sender === 'user' ? 'Patient' : 'Doctor'}: ${m.text}`)
            .join('\n');

        const prompt = `Based on the following consultation between a patient and Dr. ${doctor.name}, please provide a structured summary in JSON format. The conversation is in Kinyarwanda. The summary should also be in Kinyarwanda.
        
        Conversation:
        ${conversation}
        
        Provide a JSON summary with the keys: "symptoms", "diagnosis", "prescription" (an array of objects with "name", "dosage", "frequency"), and "advice".`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        symptoms: {
                            type: Type.STRING,
                            description: "Ibimenyetso by'ingenzi umurwayi yagaragaje."
                        },
                        diagnosis: {
                            type: Type.STRING,
                            description: "Isesengura ry'ibanze ry'ibyo muganga akeka."
                        },
                        prescription: {
                            type: Type.ARRAY,
                            description: "Urutonde rw'imiti yandikiwe.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING, description: "Izina ry'umuti." },
                                    dosage: { type: Type.STRING, description: "Ingano y'umuti." },
                                    frequency: { type: Type.STRING, description: "Inshuro umuti unyobwa." }
                                }
                            }
                        },
                        advice: {
                            type: Type.STRING,
                            description: "Inama z'inyongera muganga yahaye umurwayi."
                        }
                    },
                },
            },
        });
        
        return response.text;

    } catch (error) {
        console.error("Error generating summary:", error);
        throw new Error("Failed to generate consultation summary.");
    }
};