import { GoogleGenAI } from "@google/genai";
import type { Doctor, Message, UserProfile, Appointment, Prescription } from "../types";

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

    const parts = [];
    if (file) {
      const imagePart = await fileToGenerativePart(file);
      parts.push(imagePart);
    }
    parts.push({ text: prompt });

    // FIX: Updated to use ai.models.generateContent and corrected contents structure.
    const response = await ai.models.generateContent({
      model,
      contents: { parts: parts },
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

    // FIX: Updated to use ai.models.generateContent.
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
    
    const parts = [];
    if (file) {
      const filePart = await fileToGenerativePart(file);
      parts.push(filePart);
    }
    parts.push({ text: prompt });

    // FIX: Updated to use ai.models.generateContent and corrected contents structure.
    const response = await ai.models.generateContent({
        model,
        contents: { parts: parts },
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

export const generateHealthReport = async (
    userProfile: UserProfile,
    appointments: Appointment[],
    prescriptions: Prescription[]
): Promise<string> => {
    try {
        const systemInstruction = `You are a helpful AI health analyst for a Rwandan digital health app. Your role is to analyze a user's health data and generate a clear, encouraging, and easy-to-understand health report in Kinyarwanda. You are NOT a doctor. You MUST NOT provide a medical diagnosis. Your goal is to summarize information and provide general wellness recommendations based on the data provided. Use markdown for structure and bolding.`;

        const dob = new Date(userProfile.dob);
        const age = new Date().getFullYear() - dob.getFullYear();

        const prompt = `Please generate a personal health report in Kinyarwanda based on the following data:

**User Profile:**
- Age: ${age}
- Chronic Conditions: ${userProfile.chronicConditions.join(', ') || 'Nta yo'}
- Allergies: ${userProfile.allergies.join(', ') || 'Nta yo'}
- Lifestyle: Smoking (${userProfile.lifestyle.smokingStatus}), Alcohol (${userProfile.lifestyle.alcoholConsumption})

**Recent Appointments (${appointments.length}):**
${appointments.map(a => `- ${new Date(a.date).toLocaleDateString('rw-RW')} na ${a.doctorName} (${a.specialty}), Statusi: ${a.status}`).join('\n')}

**Active Prescriptions (${prescriptions.filter(p => p.status === 'Active').length}):**
${prescriptions.filter(p => p.status === 'Active').map(p => `- ${p.medication} (${p.dosage}, ${p.frequency}) yanditswe na ${p.doctorName}`).join('\n')}

---

Based on this data, provide a report with the following markdown sections:
### Incamake y'Ubuzima Bwawe
(A brief, positive summary of the user's engagement with their health.)

### Iby'ingenzi byavuye mu Isesengura
(Key observations from the data, e.g., "Witabiriye gahunda zawe na muganga neza," or "Ufite imiti igenewe kugufasha kuri [condition].")

### Inama zo Kwita ku Buzima Bwawe
(Provide 2-3 actionable, general wellness tips. For example, "Komeza kunywa amazi ahagije" or "Gerageza gukora imyitozo ngororamubiri yoroheje.")

### **Icyitonderwa cy'ingenzi**
(A mandatory disclaimer: "Iyi raporo ni incamake ishingiye ku makuru watanze. Ntabwo isimbura inama za muganga. Mu gihe ufite ikibazo cy'ubuzima, ni byiza kugisha inama umuganga wabigize umwuga.")
`;

        // FIX: Updated to use ai.models.generateContent.
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: { systemInstruction },
        });

        return response.text;
    } catch (error) {
        console.error("Gemini API error in generateHealthReport:", error);
        throw new Error("Failed to generate health report.");
    }
};

export const analyzePrescriptions = async (prescriptions: Prescription[]): Promise<string> => {
    try {
        const systemInstruction = `You are a helpful AI medical assistant for a Rwandan health app. Your role is to analyze a list of prescriptions and explain them in simple, clear Kinyarwanda for a patient. You are NOT a doctor and you MUST NOT give medical advice that contradicts a doctor's orders. Your goal is to empower the patient with understanding. Use markdown for structure.`;
        
        const prescriptionList = prescriptions
            .filter(p => p.status === 'Active')
            .map(p => `- **${p.medication} (${p.dosage}, ${p.frequency})**: yanditswe na ${p.doctorName}`)
            .join('\n');

        if (prescriptions.filter(p => p.status === 'Active').length === 0) {
            return "Nta miti ikoreshwa ifite isobanurwa muri iki gihe.";
        }

        const prompt = `Please analyze the following active prescriptions and provide a simple explanation for each in Kinyarwanda.

**Imiti Ikoreshwa:**
${prescriptionList}

---

For each medication, provide a response with the following markdown structure:
### ${"Umuti_Amazina"}
- **Iki Kiwukora:** (Explain in 1-2 simple sentences what this medication is generally used for. E.g., "Uyu muti ufasha kurwanya 'infections' ziterwa na 'bacteries'.")
- **Inama Rusange:** (Provide 1-2 general, safe tips for taking it. E.g., "Ni byiza kuwufatana n'ifunguro kugira ngo wirinde ibibazo byo mu gifu." or "Nywa amazi menshi igihe urimo gufata uyu muti.")

Finish with a mandatory and very important disclaimer section at the end:
### **ICYITONDERWA CY'INGENZI**
Aya makuru ni ayo kugufasha gusobanukirwa gusa. Ntabwo asimbura na gato inama wagiriwe na muganga wawe. Buri gihe ukurikize amabwiriza wahawe na muganga cyangwa farumasiye ku bijyanye n'imiti yawe.`;

        // FIX: Updated to use ai.models.generateContent.
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: { systemInstruction },
        });

        return response.text;

    } catch (error) {
        console.error("Gemini API error in analyzePrescriptions:", error);
        throw new Error("Failed to analyze prescriptions.");
    }
};