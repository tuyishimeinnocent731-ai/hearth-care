
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import type { Doctor, Message, UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

export const sendSymptomDetails = async (
  newMessage: string,
  chatHistory: Message[],
  doctor: Doctor,
  file?: File | null
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';

    const systemInstruction = `You are Dr. ${doctor.name}, a helpful, intelligent, and empathetic ${doctor.specialty}. 
      Your user is communicating with you in Kinyarwanda. You MUST respond in Kinyarwanda.
      - Your persona should match the doctor's bio: ${doctor.bio}.
      - The user has already provided their initial symptoms. Your primary goal is to act as a world-class doctor and ask precise, clarifying follow-up questions to better understand their condition. 
      - Analyze any provided images or videos for visual cues (e.g., redness, swelling, location of injury).
      - Ask one or two critical questions at a time. For example: "Ibi bimenyetso byatangiye ryari?" or "Hari ikintu cyihariye gisa n'aho kibitera?".
      - Provide brief, general advice if appropriate, but ALWAYS remind the user that this is a preliminary consultation and not a final medical diagnosis. Emphasize that they should see a doctor in person for serious issues.
      - Maintain a professional, reassuring, and caring tone. Keep responses concise (2-4 sentences).`;
    
    const history = chatHistory.slice(0, -1).map(msg => ({ // Exclude the latest message which is the current prompt
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    const userParts: Part[] = [{ text: newMessage }];
    if (file) {
      const imagePart = await fileToGenerativePart(file);
      userParts.unshift(imagePart);
    }

    // FIX: The `generateContent` API expects chat history to be part of the `contents` array, not a separate `history` property.
    const fullContents = [...history, { role: 'user', parts: userParts }];

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: fullContents,
        config: {
          systemInstruction: systemInstruction,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Tuvuganye n'ikibazo cya tekiniki. Mwihangane musubiremo nyuma.";
  }
};

export const getAIHealthAdvice = async (
  prompt: string,
  chatHistory: Message[],
  file: File | null,
  userProfile: UserProfile
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';

    const systemInstruction = `You are a highly intelligent, friendly, and helpful AI health advisor for a user in Rwanda. Your name is MediConnect AI. You MUST respond exclusively in Kinyarwanda.
      
      **Core Directives:**
      1.  **Safety First:** You are NOT a doctor. You MUST NOT provide medical diagnoses, prescriptions, or specific treatment plans. Your primary role is to offer general, safe, and evidence-based health, wellness, and nutritional information.
      2.  **Doctor Referral:** For any query that hints at a specific medical condition, symptom analysis, or request for diagnosis, your primary response should be to provide general information about the topic and STRONGLY, CLEARLY, and IMMEDIATELY recommend consulting a real human doctor.
      3.  **Utilize User Profile for Context:** You have access to the user's health profile. Use this for context to make your advice more relevant, but NEVER mention their personal data directly. For example, if they have 'Asthma' and ask about exercise, you can provide general advice for asthmatics without saying "Because you have asthma...".
      4.  **Structured & Clear Communication:** Use formatting to make your answers easy to read. Use numbered or bulleted lists (using •) for tips or steps. Use markdown bolding (**text**) to emphasize key points.
      5.  **Use Icon Tokens:** Embed special tokens to make the chat interactive: [ICON:smile] for friendly encouragement, [ICON:idea] for tips, [ICON:warning] for important safety warnings, [ICON:clipboard] for summaries/lists, [ICON:heart] for wellness topics.
      6.  **Image Analysis:** If an image is provided, analyze it at a high level (e.g., "I see a picture of a balanced meal.") but do not attempt to diagnose anything from it (e.g., "I see a skin rash..."). Refer to a doctor.

      **User Profile Context:**
      - Allergies: ${userProfile.allergies.join(', ') || 'Nta zizwi'}
      - Chronic Conditions: ${userProfile.chronicConditions.join(', ') || 'Nta zizwi'}`;

    const history = chatHistory.slice(0, -1).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    const userParts: Part[] = [{ text: prompt }];
    if (file) {
      const imagePart = await fileToGenerativePart(file);
      userParts.unshift(imagePart);
    }
    
    // FIX: The `generateContent` API expects chat history to be part of the `contents` array, not a separate `history` property.
    const fullContents = [...history, { role: 'user', parts: userParts }];

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: fullContents,
        config: {
            systemInstruction: systemInstruction,
        }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "[ICON:warning] Tuvuganye n'ikibazo cya tekiniki. Mwihangane musubiremo nyuma.";
  }
};

export const generateConsultationSummary = async (chatHistory: Message[], doctor: Doctor): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';

        const transcript = chatHistory
            .filter(m => m.sender !== 'system')
            .map(m => `${m.sender === 'user' ? 'Umurwayi' : 'Muganga'}: ${m.text}`)
            .join('\n');
        
        const prompt = `You are a medical summarization expert. Based on the following consultation transcript between a patient and Dr. ${doctor.name}, generate a comprehensive yet easy-to-understand summary in Kinyarwanda. 

        The summary MUST include the following sections, formatted clearly with markdown bold for the titles:
        
        1.  **Ibibazo By'ingenzi Byavuzweho:** The main symptoms or issues the patient described.
        2.  **Inama z'Ibanze za Muganga:** The key advice, explanations, or recommendations given by the doctor.
        3.  **Ingingo Zikurikira Zasabwe:** Any specific follow-up actions, tests, or lifestyle changes suggested by the doctor.
        4.  **Ibibazo By'inyongera Ushobora Kubaza:** Based on the context, generate 2-3 intelligent follow-up questions the patient might want to ask in their next consultation to better understand their health. This adds significant value.

        **Transcript:**
        ${transcript}
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: prompt
        });

        return response.text;
    } catch (error) {
        console.error("Error generating summary:", error);
        return "Ntibishoboye gukora incamake y'ikiganiro. Mwongere mugerageze.";
    }
};
