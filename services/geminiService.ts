// FIX: Implement Gemini service with correct API usage
import { GoogleGenAI, Type } from "@google/genai";
import type { Doctor, Message } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

function formatChatHistory(messages: Message[]) {
    // Filter out system messages and format for the API
    return messages
        .filter(msg => msg.sender !== 'system')
        .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));
}

export const sendSymptomDetails = async (
    newMessage: string,
    history: Message[],
    doctor: Doctor
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
                systemInstruction: `You are Dr. ${doctor.name}, a ${doctor.specialty}. Respond to the user's symptoms in a helpful, professional, and empathetic manner. Speak in Kinyarwanda.`,
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
