import { GoogleGenAI } from "@google/genai";
import type { Doctor, Message, UserProfile } from "../types";

// Note: API_KEY should be set in your environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const model = "gemini-2.5-flash";

const fileToGenerativePart = async (file: File) => {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      mimeType: file.type,
      data: base64EncodedData,
    },
  };
};

export const sendSymptomDetails = async (
  prompt: string,
  chatHistory: Message[],
  doctor: Doctor,
  file?: File | null
): Promise<string> => {
  try {
    const systemInstruction = `You are an AI medical assistant for Dr. ${doctor.name}, a ${doctor.specialty}.
You are communicating with a patient in Kinyarwanda.
Your goal is to be empathetic, professional, and clear.
Based on the user's message and any attached image/video, ask clarifying questions to better understand their symptoms.
Keep your responses concise, asking one or two questions at a time.
Do not provide a diagnosis or medical advice. Defer to Dr. ${doctor.name} for that.
Example: "Murakoze gusangira ayo makuru. Kugira ngo Dr. ${doctor.name} abashe kubafasha neza, mwasobanura niba hari ibindi bimenyetso mujya mwumva?"
The user's language is Kinyarwanda. All your responses must be in Kinyarwanda.`;

    const contents = [];
    if (file) {
      const imagePart = await fileToGenerativePart(file);
      contents.push(imagePart);
    }
    contents.push({ text: prompt });

    const response = await ai.models.generateContent({
      model,
      contents: { parts: contents },
      config: {
        systemInstruction,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API error in sendSymptomDetails:", error);
    throw new Error(
      "An error occurred while communicating with the AI assistant."
    );
  }
};

export const generateConsultationSummary = async (
  chatHistory: Message[],
  doctor: Doctor
): Promise<string> => {
  try {
    const conversation = chatHistory
      .map((msg) => `${msg.sender === 'user' ? 'Patient' : `Dr. ${doctor.name}`}: ${msg.text}`)
      .join("\n");

    const prompt = `Please provide a structured summary of the following medical consultation in Kinyarwanda. Use markdown for formatting. The summary should include these sections:
    1. **Iby'ingenzi ku murwayi:** (Patient's initial complaints)
    2. **Ibivugwa na Muganga:** (Doctor's key questions and statements)
    3. **Inama za Muganga:** (Doctor's final advice or next steps)
    4. **Imiti yanditswe:** (Any prescribed medications)

    Here is the conversation transcript:
    ---
    ${conversation}
    ---
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API error in generateConsultationSummary:", error);
    throw new Error("Failed to generate consultation summary.");
  }
};

export const getAIHealthAdvice = async (
  prompt: string,
  chatHistory: Message[],
  file: File | null,
  userProfile: UserProfile
): Promise<string> => {
  try {
    const systemInstruction = `You are a friendly and helpful AI health advisor for a digital health app in Rwanda.
Your primary language for communication is Kinyarwanda.
You provide general health information, wellness tips, and advice on healthy living.
**You must never provide a medical diagnosis or prescribe medication.**
If the user asks for a diagnosis or seems to be in an emergency, you must advise them to consult a real doctor immediately using the app.
Use the user's profile information to personalize your advice where appropriate, but do not state their personal information back to them.
You can use special tokens like [ICON:smile], [ICON:idea], [ICON:warning], [ICON:clipboard], [ICON:heart] to add visual cues.

User Profile context:
- Age based on DOB: ${userProfile.dob}
- Chronic Conditions: ${userProfile.chronicConditions.join(', ') || 'None'}
- Allergies: ${userProfile.allergies.join(', ') || 'None'}`;
    
    const contents = [];
    if (file) {
      const filePart = await fileToGenerativePart(file);
      contents.push(filePart);
    }
    contents.push({ text: prompt });

    const response = await ai.models.generateContent({
        model,
        contents: { parts: contents },
        config: {
            systemInstruction
        },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API error in getAIHealthAdvice:", error);
    throw new Error("An error occurred while communicating with the AI assistant.");
  }
};
