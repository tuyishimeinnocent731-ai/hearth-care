import React, { useState } from 'react';
import type { Doctor, Message, Page, UserProfile, Appointment, Conversation } from './types';
import { DOCTORS } from './constants';
import { MOCK_APPOINTMENTS, MOCK_USER_PROFILE, MOCK_CONVERSATIONS } from './mockData';
import Header from './components/Header';
import LeftAside from './components/LeftAside';
import RightAside from './components/RightAside';
import DoctorSelection from './components/DoctorSelection';
import SymptomFormPage from './pages/SymptomFormPage';
import PaymentForm from './components/PaymentForm';
import ChatWindow from './components/ChatWindow';
import ConsultationSummary from './components/ConsultationSummary';
import VideoCallModal from './components/VideoCallModal';

// Pages
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

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [symptomDetails, setSymptomDetails] = useState<{ text: string, file?: File } | null>(null);
    const [isVideoCallVisible, setIsVideoCallVisible] = useState(false);
    
    // Mock data state
    const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER_PROFILE);
    const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
    const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
    const [selectedConversationId, setSelectedConversationId] = useState<number | null>(1);

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
    };

    const handleSelectDoctor = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setCurrentPage('symptom-form');
    };

    const handleSymptomSubmit = (details: { text: string; file?: File }) => {
        setSymptomDetails(details);
        setCurrentPage('payment');
    };

    const handlePaymentSuccess = () => {
        if (!selectedDoctor || !symptomDetails) return;
        
        const initialUserMessage: Message = {
            id: `user-initial-${Date.now()}`,
            text: symptomDetails.text,
            sender: 'user',
            timestamp: new Date().toISOString(),
        };

        if (symptomDetails.file) {
            initialUserMessage.attachment = {
                type: symptomDetails.file.type.startsWith('image/') ? 'image' : 'video',
                url: URL.createObjectURL(symptomDetails.file)
            }
        }
        
        const welcomeMessage: Message = {
             id: `system-${Date.now()}`,
            text: `Uhuje na Dr. ${selectedDoctor.name}.`,
            sender: 'system',
            timestamp: new Date().toISOString(),
        }
        setChatHistory([welcomeMessage, initialUserMessage]);
        setCurrentPage('chat');
    };

    const handleEndConsultation = (finalChatHistory: Message[]) => {
        setChatHistory(finalChatHistory);
        setCurrentPage('summary');
    };

    const handleStartNewConsultation = () => {
        setSelectedDoctor(null);
        setChatHistory([]);
        setSymptomDetails(null);
        setCurrentPage('doctor-selection');
    };
    
    const handleUpdateProfile = (profile: UserProfile) => {
        setUserProfile(profile);
    };

    const handleSendMessage = (conversationId: number, message: Message) => {
        setConversations(prev =>
            prev.map(convo => 
                convo.id === conversationId 
                    ? { ...convo, messages: [...convo.messages, message] }
                    : convo
            )
        );
         // Simulate doctor response
        const doctor = conversations.find(c => c.id === conversationId)?.doctor;
        if (doctor) {
            setTimeout(() => {
                 setConversations(prev => prev.map(c => c.id === conversationId ? {...c, isTyping: true} : c));
            }, 500);
            setTimeout(() => {
                const response: Message = {
                    id: `doc-resp-${Date.now()}`,
                    text: "Ndacyakurikiranira hafi ikibazo cyawe. Urakira.",
                    sender: 'doctor',
                    timestamp: new Date().toISOString(),
                    status: 'delivered',
                };
                 setConversations(prev =>
                    prev.map(convo => 
                        convo.id === conversationId 
                            ? { ...convo, messages: [...convo.messages, response], isTyping: false }
                            : convo
                    )
                );
            }, 2500);
        }
    };
    
    const renderPage = () => {
        switch (currentPage) {
            case 'doctor-selection': return <DoctorSelection onSelectDoctor={handleSelectDoctor} />;
            case 'symptom-form': return <SymptomFormPage doctor={selectedDoctor} onSubmit={handleSymptomSubmit} />;
            case 'payment': return <PaymentForm doctor={selectedDoctor} onPaymentSuccess={handlePaymentSuccess} />;
            case 'chat': return <ChatWindow doctor={selectedDoctor} initialMessages={chatHistory} initialFile={symptomDetails?.file} onEndConsultation={handleEndConsultation} onVideoCall={() => setIsVideoCallVisible(true)} />;
            case 'summary': return <ConsultationSummary doctor={selectedDoctor} chatHistory={chatHistory} onStartNewConsultation={handleStartNewConsultation} />;
            case 'dashboard': return <HealthDashboardPage userProfile={userProfile} onNavigate={handleNavigate} />;
            case 'appointments': return <AppointmentsPage appointments={appointments} onNavigate={handleNavigate} />;
            case 'schedule-appointment': return <ScheduleAppointmentPage onSchedule={(appt) => { setAppointments(prev => [...prev, appt]); setCurrentPage('appointments'); }} doctors={DOCTORS} />;
            case 'messages': return <MessagesPage conversations={conversations} selectedConversationId={selectedConversationId} onSelectConversation={(id) => setSelectedConversationId(id)} onSendMessage={handleSendMessage} />;
            case 'prescriptions': return <PrescriptionsPage />;
            case 'profile': return <ProfilePage userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />;
            case 'settings': return <SettingsPage onNavigate={handleNavigate} />;
            case 'notifications': return <NotificationsPage />;
            case 'video-consultation': return <VideoConsultationPage onScheduleCall={() => setCurrentPage('schedule-appointment')} appointments={appointments} />;
            case 'ai-chat': return <AIChatPage userProfile={userProfile} />;
            default: return <HealthDashboardPage userProfile={userProfile} onNavigate={handleNavigate} />;
        }
    };
    
    const pageHasSidebars = ![ 'chat', 'messages', 'ai-chat' ].includes(currentPage);

    return (
        <div className="flex h-screen bg-white font-sans text-gray-800">
            {pageHasSidebars && <LeftAside currentPage={currentPage} onNavigate={handleNavigate} />}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header userProfile={userProfile} onNavigate={handleNavigate} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                   {renderPage()}
                </main>
            </div>
            {pageHasSidebars && <RightAside onNavigate={handleNavigate}/>}
            {isVideoCallVisible && <VideoCallModal doctor={selectedDoctor} onClose={() => setIsVideoCallVisible(false)} />}
        </div>
    );
};

export default App;
