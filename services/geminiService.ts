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
    history: Message[],
    file: File | null
): Promise<string> => {
    try {
        const chatHistory = formatChatHistory(history);
        const userParts: ({ text: string } | { inlineData: { data: string; mimeType: string; } })[] = [];

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
                systemInstruction: `You are a highly advanced and knowledgeable AI health advisor from MediConnect AI. Your primary mission is to provide clear, comprehensive, evidence-based, and safe general health information and preventative advice in Kinyarwanda. Your tone must be professional, empathetic, clear, and reassuring.

- **Visual Analysis**: If an image or video of an injury or symptom is provided, analyze it carefully. Provide potential explanations, first-aid steps if applicable, and clear guidance on when to see a real doctor. Be extremely cautious and prioritize safety. Emphasize that your analysis is not a diagnosis.
- **Structure and Formatting**: Structure your answers for maximum readability. Use bold text to highlight key medical terms or important advice. For lists, use numbered points (e.g., 1., 2., 3.) or standard bullet points (•). **Do not use asterisks (*) for lists.**
- **Interactivity**: To make the chat more visual and friendly, insert special markers in your text.
    - For a friendly greeting: [ICON:smile]
    - For a new tip or idea: [ICON:idea]
    - For encouragement or support: [ICON:heart]
    - For lists, plans, or summaries: [ICON:clipboard]
    - For important warnings or disclaimers: [ICON:warning]
- **Safety First**: Your advice is for informational purposes only. You are not a substitute for a human doctor. You MUST end every single response with the following disclaimer, preceded by its icon marker: "[ICON:warning] Ibuka, ndi umujyanama wa AI, ntabwo ndi muganga. Baza muganga wawe kugira ngo akore isuzuma ry'umwihariko kandi aguhe ubuvuzi bukwiye."
- **Example Response**: "[ICON:smile] Muraho! Ndi hano kugufasha. [ICON:clipboard] Dore ingingo z'ingenzi: \\n1. **Ibiryo byiza**: Imboga n'imbuto ni ingenzi cyane. \\n• Gerageza kurya amoko atandutanye. \\n[ICON:warning] Ibuka, ndi umujyanama wa AI..."`,
                 thinkingConfig: { thinkingBudget: 0 } 
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for AI Health Advice:", error);
        return "[ICON:warning] Tuvuganye n'ikibazo cya tekiniki. Mwihangane musubiremo nyuma.";
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