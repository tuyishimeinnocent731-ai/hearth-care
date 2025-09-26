
import React, { useState } from 'react';
import type { Page, Doctor, Message, UserProfile, Appointment, Conversation } from './types';
import { DOCTORS } from './constants';
import { MOCK_USER_PROFILE, MOCK_APPOINTMENTS, MOCK_CONVERSATIONS } from './mockData';

import LeftAside from './components/LeftAside';
import Header from './components/Header';
import RightAside from './components/RightAside';
import DoctorSelection from './components/DoctorSelection';
import SymptomFormPage from './pages/SymptomFormPage';
import PaymentForm from './components/PaymentForm';
import ChatWindow from './components/ChatWindow';
import ConsultationSummary from './components/ConsultationSummary';
import HealthDashboardPage from './pages/HealthDashboardPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ScheduleAppointmentPage from './pages/ScheduleAppointmentPage';
import MessagesPage from './pages/MessagesPage';
import PrescriptionsPage from './pages/PrescriptionsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import VideoConsultationPage from './pages/VideoConsultationPage';
import AIChatPage from './pages/AIChatPage';
import VideoCallModal from './components/VideoCallModal';


const App: React.FC = () => {
    const [page, setPage] = useState<Page>('dashboard');
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [symptomDetails, setSymptomDetails] = useState<{ text: string; file?: File } | null>(null);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER_PROFILE);
    const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
    const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
    const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
    const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);

    const handleNavigate = (newPage: Page) => {
        setPage(newPage);
    };

    const handleSelectDoctor = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setPage('symptom-form');
    };

    const handleSymptomSubmit = (details: { text: string; file?: File }) => {
        setSymptomDetails(details);
        setPage('payment');
    };

    const handlePaymentSuccess = () => {
        if (!selectedDoctor || !symptomDetails) return;
        const initialMessages: Message[] = [
            {
                id: 'system-1',
                sender: 'system',
                text: `Ubujyanama bwatangiye na Dr. ${selectedDoctor.name}`,
                timestamp: new Date().toISOString(),
            },
            {
                id: 'user-1',
                sender: 'user',
                text: symptomDetails.text,
                timestamp: new Date().toISOString(),
                attachment: symptomDetails.file ? { type: symptomDetails.file.type.startsWith('image/') ? 'image' : 'video', url: URL.createObjectURL(symptomDetails.file) } : undefined,
            }
        ];
        setChatHistory(initialMessages);
        setPage('chat');
    };

    const handleEndConsultation = (finalChatHistory: Message[]) => {
        setChatHistory(finalChatHistory);
        setPage('summary');
    };
    
    const handleStartNewConsultation = () => {
        setSelectedDoctor(null);
        setSymptomDetails(null);
        setChatHistory([]);
        setPage('consultation-start');
    };

    const handleScheduleAppointment = (newAppointment: Omit<Appointment, 'id' | 'status'>) => {
        setAppointments(prev => [...prev, { ...newAppointment, id: Date.now(), status: 'Upcoming' }]);
        setPage('appointments');
    };

    const handleUpdateProfile = (updatedProfile: UserProfile) => {
        setUserProfile(updatedProfile);
    };

    const handleSendMessage = (conversationId: number, message: Message) => {
        setConversations(prev => prev.map(convo => {
            if (convo.id === conversationId) {
                return { ...convo, messages: [...convo.messages, message] };
            }
            return convo;
        }));
    };

    const renderPage = () => {
        switch (page) {
            case 'dashboard':
                return <HealthDashboardPage />;
            case 'consultation-start':
                return <DoctorSelection onSelectDoctor={handleSelectDoctor} />;
            case 'symptom-form':
                return <SymptomFormPage doctor={selectedDoctor} onSubmit={handleSymptomSubmit} />;
            case 'payment':
                return <PaymentForm doctor={selectedDoctor} onPaymentSuccess={handlePaymentSuccess} />;
            case 'chat':
                return <ChatWindow 
                    doctor={selectedDoctor} 
                    initialMessages={chatHistory}
                    initialFile={symptomDetails?.file}
                    onEndConsultation={handleEndConsultation}
                    onVideoCall={() => setIsVideoCallModalOpen(true)}
                />;
            case 'summary':
                return <ConsultationSummary doctor={selectedDoctor} chatHistory={chatHistory} onStartNewConsultation={handleStartNewConsultation}/>;
            case 'appointments':
                return <AppointmentsPage appointments={appointments} onNavigate={handleNavigate} />;
            case 'schedule-appointment':
                return <ScheduleAppointmentPage doctors={DOCTORS} onSchedule={handleScheduleAppointment} onCancel={() => setPage('appointments')} />;
            case 'messages':
                return <MessagesPage 
                    conversations={conversations} 
                    selectedConversationId={selectedConversationId} 
                    onSelectConversation={setSelectedConversationId}
                    onSendMessage={handleSendMessage}
                />;
            case 'prescriptions':
                return <PrescriptionsPage />;
            case 'profile':
                return <ProfilePage userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />;
            case 'settings':
                return <SettingsPage onNavigate={handleNavigate} />;
            case 'notifications':
                return <NotificationsPage />;
            case 'video-consultation':
                return <VideoConsultationPage appointments={appointments} onScheduleCall={() => setPage('schedule-appointment')} />;
            case 'ai-chat':
                return <AIChatPage userProfile={userProfile} />;
            default:
                return <HealthDashboardPage />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex text-gray-800">
            <LeftAside currentPage={page} onNavigate={handleNavigate} />
            <div className="flex-1 flex flex-col lg:ml-64 lg:mr-80">
                <Header userProfile={userProfile} onNavigate={handleNavigate} />
                <main className="flex-1 overflow-y-auto">
                    {renderPage()}
                </main>
            </div>
            <RightAside onNavigate={handleNavigate}/>
            {selectedDoctor && <VideoCallModal 
                isOpen={isVideoCallModalOpen} 
                onClose={() => setIsVideoCallModalOpen(false)} 
                doctorName={selectedDoctor.name}
            />}
        </div>
    );
};

export default App;
