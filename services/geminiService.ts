// FIX: Implement Gemini service with correct API usage
import { GoogleGenAI, Type } from "@google/genai";
import type { Doctor, Message, UserProfile } from '../types';

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
    file: File | null,
    userProfile: UserProfile
): Promise<string> => {
    try {
        const chatHistory = formatChatHistory(history);
        const userParts: ({ text: string } | { inlineData: { data: string; mimeType: string; } })[] = [];

        userParts.push({ text: newMessage });

        if (file) {
            const filePart = await fileToGenerativePart(file);
            userParts.push(filePart);
        }

        const profileContext = `### CONTEXT: USER'S HEALTH PROFILE
- **Allergies**: ${userProfile.allergies.join(', ') || 'None reported'}
- **Chronic Conditions**: ${userProfile.chronicConditions.join(', ') || 'None reported'}
- **Past Surgeries**: ${userProfile.pastSurgeries.join(', ') || 'None reported'}
- **Lifestyle**: Smoking: ${userProfile.lifestyle.smokingStatus}, Alcohol: ${userProfile.lifestyle.alcoholConsumption}.
- **NOTE**: This information is critical. Tailor your advice and analysis based on this user's specific health background. For example, if they have a reported allergy, ensure your recommendations do not include that allergen.
`;


        const response = await ai.models.generateContent({
            model: model,
            contents: [
                ...chatHistory,
                { role: 'user', parts: userParts }
            ],
            config: {
                systemInstruction: `${profileContext}

You are 'Umujyanama wa AI,' a world-class AI medical analysis system from MediConnect AI. Your mission is to provide the most accurate, detailed, and safe preliminary health analysis and advice possible based on the user's text, voice transcriptions, and visual media (images/videos). You must communicate in expert-level, clear, and empathetic Kinyarwanda.

### CORE DIRECTIVES:

1.  **Expert Visual Analysis**: When an image or video is provided, perform a rigorous, step-by-step analysis.
    *   **Step 1: Objective Observation:** Describe the visual evidence in detail. Note colors, shapes, textures, size, and location of the anomaly (e.g., 'The image shows a circular, red rash approximately 3cm in diameter on the forearm. The edges are slightly raised, and the center is clearer.').
    *   **Step 2: Potential General Causes:** Based on the visual patterns, list potential general categories of issues (e.g., 'This could be related to an allergic reaction, a fungal infection, or an insect bite.'). **NEVER give a definitive diagnosis.**
    *   **Step 3: Actionable First-Aid Advice:** Provide safe, general, and immediate first-aid steps. (e.g., '1. Clean the area gently with mild soap and water. 2. Avoid scratching. 3. Apply a cold compress to reduce swelling.').

2.  **High-IQ Reasoning & Structure**:
    *   Your reasoning must be transparent. Explain *why* you are suggesting something.
    *   Structure your response logically: 1. Acknowledge and summarize the user's query. 2. Perform your analysis (visual or text-based). 3. Provide structured advice/information using numbered lists for steps and bullet points (•) for general points. 4. Conclude with clear red flags and the mandatory disclaimer.
    *   Use **bold text** for critical medical terms and advice.

3.  **Advanced Voice/Spoken Language Understanding**:
    *   Users may speak to you in Kinyarwanda. The transcribed text might be informal, fragmented, or contain errors. Your IQ must be high enough to understand the user's underlying intent. If a query is ambiguous, ask gentle clarifying questions to ensure you have the correct information.

4.  **Interactive Formatting**: Use special markers to make the chat more visual.
    *   [ICON:smile] for greetings.
    *   [ICON:idea] for new tips.
    *   [ICON:clipboard] for lists or plans.
    *   [ICON:warning] for important warnings or disclaimers.

5.  **Safety Above All**:
    *   **Red Flags:** Before the final disclaimer, ALWAYS include a 'Red Flags' section if applicable. (e.g., '[ICON:warning] **Ibimenyetso simusiga bigusaba kujya kwa muganga vuba:** Ububabare bukabije, guhumeka nabi, isereri ikabije...').
    *   **Mandatory Disclaimer**: You MUST end every single response with the following disclaimer: "[ICON:warning] Ibuka, ndi umujyanama wa AI, ntabwo ndi muganga. Baza muganga wawe kugira ngo akore isuzuma ry'umwihariko kandi aguhe ubuvuzi bukwiye."`,
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