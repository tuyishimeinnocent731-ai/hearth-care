import React, { useState, useRef } from 'react';
import type { UserProfile } from '../types';
import { UserCircleIcon, StethoscopeIcon, ShieldCheckIcon, ActivityIcon, EditIcon, SaveIcon, UploadCloudIcon, DropletIcon } from '../components/IconComponents';

interface ProfilePageProps {
    userProfile: UserProfile;
    onUpdateProfile: (profile: UserProfile) => void;
}

const ProfileSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4 flex items-center">
            {icon}
            <span className="ml-3">{title}</span>
        </h2>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const InfoRow: React.FC<{ label: string; value: string | React.ReactNode; isEditable?: boolean; onChange?: (value: string) => void; type?: string; children?: React.ReactNode }> = ({ label, value, isEditable, onChange, type = "text", children }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <div className="md:col-span-2">
            {isEditable ? (
                children ? children : (
                    <input 
                        type={type}
                        value={value as string}
                        onChange={(e) => onChange?.(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                    />
                )
            ) : (
                <p className="text-sm text-gray-800 font-medium">{value}</p>
            )}
        </div>
    </div>
);

const TagList: React.FC<{ label: string; tags: string[]; isEditable?: boolean; onChange?: (tags: string[]) => void; }> = ({ label, tags, isEditable, onChange }) => {
    const handleTagChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            e.preventDefault();
            const newTags = [...tags, e.currentTarget.value.trim()];
            onChange?.(newTags);
            e.currentTarget.value = '';
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange?.(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            <label className="text-sm font-medium text-gray-600 mt-1">{label}</label>
            <div className="md:col-span-2">
                <div className={`flex flex-wrap gap-2 p-2 rounded-lg ${isEditable ? 'border border-dashed' : ''}`}>
                    {tags.map(tag => (
                        <div key={tag} className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium pl-2.5 pr-1 py-1 rounded-full">
                            {tag}
                            {isEditable && (
                                <button onClick={() => removeTag(tag)} className="ml-1.5 h-4 w-4 flex items-center justify-center text-blue-500 hover:bg-blue-300 rounded-full">&times;</button>
                            )}
                        </div>
                    ))}
                    {isEditable && (
                        <input 
                            type="text" 
                            onKeyDown={handleTagChange}
                            placeholder="Ongeramo..." 
                            className="text-sm p-1 bg-transparent focus:outline-none"
                        />
                    )}
                </div>
                 {!isEditable && tags.length === 0 && <p className="text-sm text-gray-500">Nta byatangajwe.</p>}
            </div>
        </div>
    );
}


const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile, onUpdateProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState<UserProfile>(userProfile);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        onUpdateProfile(profileData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setProfileData(userProfile);
        setIsEditing(false);
    }
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChange('profilePicture', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (field: keyof UserProfile, value: any) => {
        setProfileData(prev => ({...prev, [field]: value}));
    }
     const handleNestedChange = (parentField: 'emergencyContact' | 'lifestyle', childField: string, value: any) => {
        setProfileData(prev => ({
            ...prev,
            [parentField]: {
                ...prev[parentField],
                [childField]: value,
            },
        }));
    };

    return (
        <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Umwirondoro Wanjye</h1>
                    <p className="mt-2 text-lg text-gray-600">Genzura amakuru yawe bwite n'ay'ubuzima.</p>
                </div>
                {isEditing ? (
                    <div className="flex gap-2 mt-4 md:mt-0">
                         <button onClick={handleCancel} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-300">Reka</button>
                        <button onClick={handleSave} className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                            <SaveIcon className="w-5 h-5 mr-2"/> Bika
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white text-gray-700 font-semibold rounded-lg shadow-sm border hover:bg-gray-50 transition-colors">
                        <EditIcon className="w-5 h-5 mr-2"/> Hindura Umwirondoro
                    </button>
                )}
            </div>
            
            <div className="space-y-8">
                <ProfileSection title="Amakuru y'Ibanze" icon={<UserCircleIcon className="w-6 h-6 text-blue-600" />}>
                     <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative">
                            <img src={profileData.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-100"/>
                            {isEditing && (
                                <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100">
                                    <UploadCloudIcon className="w-5 h-5 text-blue-600"/>
                                </button>
                            )}
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                        <div className="flex-1 w-full">
                           <InfoRow label="Amazina Yombi" value={profileData.fullName} isEditable={isEditing} onChange={(val) => handleChange('fullName', val)} />
                           <InfoRow label="Email" value={profileData.email} isEditable={isEditing} onChange={(val) => handleChange('email', val)} type="email"/>
                           <InfoRow label="Telefone" value={profileData.phone} isEditable={isEditing} onChange={(val) => handleChange('phone', val)} type="tel"/>
                        </div>
                    </div>
                    <InfoRow label="Itariki y'amavuko" value={profileData.dob} isEditable={isEditing} onChange={(val) => handleChange('dob', val)} type="date"/>
                    <InfoRow label="Aho uherereye" value={profileData.location} isEditable={isEditing} onChange={(val) => handleChange('location', val)}/>
                </ProfileSection>

                <ProfileSection title="Amateka y'Ubuvuzi" icon={<StethoscopeIcon className="w-6 h-6 text-green-600" />}>
                    <InfoRow label="Uburebure (cm)" value={profileData.height || ''} isEditable={isEditing} onChange={(val) => handleChange('height', Number(val))} type="number"/>
                    <InfoRow label="Ibiro (kg)" value={profileData.weight || ''} isEditable={isEditing} onChange={(val) => handleChange('weight', Number(val))} type="number"/>
                    <InfoRow label="Ubwoko bw'amaraso" value={profileData.bloodType || 'N/A'} isEditable={isEditing}>
                        <select value={profileData.bloodType || 'N/A'} onChange={(e) => handleChange('bloodType', e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
                             <option>N/A</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                        </select>
                    </InfoRow>
                    <TagList label="Allergies" tags={profileData.allergies} isEditable={isEditing} onChange={(val) => handleChange('allergies', val)} />
                    <TagList label="Indwara zidakira" tags={profileData.chronicConditions} isEditable={isEditing} onChange={(val) => handleChange('chronicConditions', val)} />
                    <TagList label="Kubagwa kwabayeho" tags={profileData.pastSurgeries} isEditable={isEditing} onChange={(val) => handleChange('pastSurgeries', val)} />
                </ProfileSection>

                <ProfileSection title="Amakuru y'Ibyihutirwa" icon={<ShieldCheckIcon className="w-6 h-6 text-red-600" />}>
                    <InfoRow label="Amazina y'uwo guhamagara" value={profileData.emergencyContact.name} isEditable={isEditing} onChange={(val) => handleNestedChange('emergencyContact', 'name', val)} />
                    <InfoRow label="Telefone y'uwo guhamagara" value={profileData.emergencyContact.phone} isEditable={isEditing} onChange={(val) => handleNestedChange('emergencyContact', 'phone', val)} type="tel"/>
                </ProfileSection>

                 <ProfileSection title="Uburyo bw'Imibereho" icon={<ActivityIcon className="w-6 h-6 text-purple-600" />}>
                    <InfoRow label="Kunywa Itabi" value={profileData.lifestyle.smokingStatus} isEditable={isEditing}>
                        <select value={profileData.lifestyle.smokingStatus} onChange={(e) => handleNestedChange('lifestyle', 'smokingStatus', e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
                            <option>Not Specified</option><option>Never</option><option>Former</option><option>Current</option>
                        </select>
                    </InfoRow>
                     <InfoRow label="Kunywa Inzoga" value={profileData.lifestyle.alcoholConsumption} isEditable={isEditing}>
                        <select value={profileData.lifestyle.alcoholConsumption} onChange={(e) => handleNestedChange('lifestyle', 'alcoholConsumption', e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
                            <option>Not Specified</option><option>None</option><option>Occasional</option><option>Regular</option>
                        </select>
                     </InfoRow>
                </ProfileSection>
            </div>
        </div>
    );
};

export default ProfilePage;