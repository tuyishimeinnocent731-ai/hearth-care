import React, { useState, useRef } from 'react';
import type { Doctor } from '../types';
import { PaperclipIcon, XIcon, VideoIcon } from '../components/IconComponents';

interface SymptomFormPageProps {
    doctor: Doctor | null;
    onSubmit: (details: { text: string; file?: File }) => void;
}

const SymptomFormPage: React.FC<SymptomFormPageProps> = ({ doctor, onSubmit }) => {
    const [symptoms, setSymptoms] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!doctor) return <div className="p-8 text-center">Muganga ntiyatoranijwe. Subira inyuma uhitemo.</div>;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (filePreview) URL.revokeObjectURL(filePreview);
        setFilePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!symptoms.trim()) return;
        onSubmit({ text: symptoms, file: selectedFile || undefined });
    };

    return (
        <div className="p-6 md:p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <img src={doctor.imageUrl} alt={doctor.name} className="w-24 h-24 rounded-full mx-auto ring-4 ring-blue-100 mb-4"/>
                <h1 className="text-3xl font-bold text-gray-800">Sobanura Ibimenyetso Byawe</h1>
                <p className="mt-2 text-lg text-gray-600">Fasha Dr. {doctor.name} kukumva neza mbere yuko mutangira.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md border space-y-6">
                <div>
                    <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                        Sobanura neza uko wiyumva. Ni ibihe bimenyetso ufite? Byatangiye ryari?
                    </label>
                    <textarea
                        id="symptoms"
                        rows={6}
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Urugero: Mfite inkorora ikaze n'umuriro hashize iminsi itatu..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ongeraho Ifoto cyangwa Video (Si itegeko)
                    </label>
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500"
                    >
                        <div className="space-y-1 text-center">
                            <PaperclipIcon className="mx-auto h-12 w-12 text-gray-400"/>
                            <div className="flex text-sm text-gray-600">
                                <p className="pl-1">Kanda hano kugira ngo wongereho dosiye</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF kugeza kuri 10MB</p>
                        </div>
                    </div>
                     <input ref={fileInputRef} onChange={handleFileChange} type="file" accept="image/*,video/*" className="hidden" />
                </div>

                {filePreview && (
                    <div className="relative w-32 h-32 p-2 border rounded-lg bg-gray-100">
                        {selectedFile?.type.startsWith('image/') ? (
                            <img src={filePreview} alt="Preview" className="w-full h-full object-cover rounded"/>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black rounded"><VideoIcon className="w-8 h-8 text-white" /></div>
                        )}
                        <button type="button" onClick={removeFile} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600">
                            <XIcon className="w-4 h-4"/>
                        </button>
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        disabled={!symptoms.trim()}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                    >
                        Komeza kwishyura
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SymptomFormPage;