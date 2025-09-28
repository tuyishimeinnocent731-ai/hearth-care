import React, { useState } from 'react';
import type { Doctor, Message, Page, UserProfile, Appointment, Conversation, Prescription, Notification } from './types';
import { DOCTORS } from './constants';
import { MOCK_APPOINTMENTS, MOCK_USER_PROFILE, MOCK_CONVERSATIONS, MOCK_PRESCRIPTIONS, MOCK_NOTIFICATIONS } from './mockData';
import Header from './components/Header';
import LeftAside from './components/LeftAside';
import RightAside from './components/RightAside';
import DoctorSelection from './components/DoctorSelection';
import SymptomFormPage from './pages/SymptomFormPage';
import PaymentForm from './components/PaymentForm';
import ChatWindow from './components/ChatWindow';
import ConsultationSummary from './components/ConsultationSummary';
import VideoCallModal from './components/VideoCallModal';
import SearchModal from './components/SearchModal';
import Toast from './components/Toast';

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
import SymptomCheckerPage from './pages/SymptomCheckerPage';
import HealthReportPage from './pages/HealthReportPage';
import PrescriptionAnalysisPage from './pages/PrescriptionAnalysisPage';
import LiveConsultationPage from './pages/LiveConsultationPage';
import AppointmentSummaryPage from './pages/AppointmentSummaryPage';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [symptomDetails, setSymptomDetails] = useState<{ text: string, file?: File } | null>(null);
    const [symptomSummary, setSymptomSummary] = useState<string | null>(null);
    const [isVideoCallVisible, setIsVideoCallVisible] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    
    // Mock data state
    const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER_PROFILE);
    const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
    const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
    const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
        setIsMobileSidebarOpen(false);
        setIsSearchOpen(false);
    };

    const handleSelectDoctor = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setCurrentPage('symptom-form');
    };

    const handleSymptomCheckComplete = (summary: string) => {
        setSymptomSummary(summary);
        setCurrentPage('doctor-selection');
    };

    const handleSymptomSubmit = (details: { text: string; file?: File }) => {
        setSymptomDetails(details);
        setSymptomSummary(null); // Clear summary after it's used
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

    const handleCancelAppointment = (appointmentId: number) => {
        setAppointments(prev => prev.map(appt => 
            appt.id === appointmentId ? { ...appt, status: 'Cancelled' } : appt
        ));
    };

    const handleDeleteNotification = (notificationId: number) => {
        setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    };
    
    const handleMarkAllNotificationsAsRead = () => {
        setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    };

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleViewAppointmentSummary = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setCurrentPage('appointment-summary');
    };

    const handleJoinVideoCall = (appointment: Appointment) => {
        const doctor = DOCTORS.find(d => d.name === appointment.doctorName);
        setSelectedDoctor(doctor || null);
        setIsVideoCallVisible(true);
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
            case 'symptom-form': return <SymptomFormPage doctor={selectedDoctor} onSubmit={handleSymptomSubmit} initialSymptoms={symptomSummary} />;
            case 'payment': return <PaymentForm doctor={selectedDoctor} onPaymentSuccess={handlePaymentSuccess} />;
            case 'chat': return <ChatWindow doctor={selectedDoctor} initialMessages={chatHistory} initialFile={symptomDetails?.file} onEndConsultation={handleEndConsultation} onVideoCall={() => setIsVideoCallVisible(true)} />;
            case 'summary': return <ConsultationSummary doctor={selectedDoctor} chatHistory={chatHistory} onStartNewConsultation={handleStartNewConsultation} onShowToast={showToast} />;
            case 'dashboard': return <HealthDashboardPage userProfile={userProfile} onNavigate={handleNavigate} appointments={appointments} prescriptions={MOCK_PRESCRIPTIONS} onJoinCall={handleJoinVideoCall} />;
            case 'appointments': return <AppointmentsPage appointments={appointments} onNavigate={handleNavigate} onCancelAppointment={handleCancelAppointment} onViewSummary={handleViewAppointmentSummary} onJoinCall={handleJoinVideoCall} />;
            case 'schedule-appointment': return <ScheduleAppointmentPage onSchedule={(appt) => { setAppointments(prev => [...prev, appt]); setCurrentPage('appointments'); }} doctors={DOCTORS} />;
            case 'messages': return <MessagesPage conversations={conversations} selectedConversationId={selectedConversationId} onSelectConversation={(id) => setSelectedConversationId(id)} onSendMessage={handleSendMessage} />;
            case 'prescriptions': return <PrescriptionsPage onNavigate={handleNavigate} />;
            case 'profile': return <ProfilePage userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />;
            case 'settings': return <SettingsPage onNavigate={handleNavigate} />;
            case 'notifications': return <NotificationsPage notifications={notifications} onDelete={handleDeleteNotification} onMarkAllRead={handleMarkAllNotificationsAsRead} />;
            case 'video-consultation': return <VideoConsultationPage onScheduleCall={() => setCurrentPage('schedule-appointment')} appointments={appointments} />;
            case 'ai-chat': return <AIChatPage userProfile={userProfile} />;
            case 'symptom-checker': return <SymptomCheckerPage userProfile={userProfile} onComplete={handleSymptomCheckComplete} />;
            case 'health-report': return <HealthReportPage userProfile={userProfile} appointments={appointments} prescriptions={MOCK_PRESCRIPTIONS} onNavigate={handleNavigate} />;
            case 'prescription-analysis': return <PrescriptionAnalysisPage userProfile={userProfile} prescriptions={MOCK_PRESCRIPTIONS} onNavigate={handleNavigate} />;
            case 'live-consultation': return <LiveConsultationPage onNavigate={handleNavigate} />;
            case 'appointment-summary': return <AppointmentSummaryPage appointment={selectedAppointment} onNavigate={handleNavigate} onShowToast={showToast} />;
            default: return <HealthDashboardPage userProfile={userProfile} onNavigate={handleNavigate} appointments={appointments} prescriptions={MOCK_PRESCRIPTIONS} onJoinCall={handleJoinVideoCall} />;
        }
    };
    
    const pageHasSidebars = ![ 'chat', 'messages', 'ai-chat', 'symptom-checker', 'health-report', 'prescription-analysis', 'live-consultation', 'appointment-summary' ].includes(currentPage);
    const showRightSidebar = pageHasSidebars && !['profile', 'settings', 'notifications', 'schedule-appointment'].includes(currentPage);


    return (
        <div className="flex h-screen bg-white font-sans text-gray-800">
            <LeftAside 
                currentPage={currentPage} 
                onNavigate={handleNavigate}
                isMobileOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    userProfile={userProfile} 
                    onNavigate={handleNavigate}
                    onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
                    onOpenSearch={() => setIsSearchOpen(true)}
                />
                <div className="flex flex-1 overflow-hidden">
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                       {renderPage()}
                    </main>
                    {showRightSidebar && <RightAside onNavigate={handleNavigate}/>}
                </div>
            </div>
            {isVideoCallVisible && <VideoCallModal doctor={selectedDoctor} onClose={() => setIsVideoCallVisible(false)} />}
            <SearchModal 
                isOpen={isSearchOpen} 
                onClose={() => setIsSearchOpen(false)} 
                onNavigate={handleNavigate}
                appointments={appointments}
                prescriptions={MOCK_PRESCRIPTIONS}
            />
            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
        </div>
    );
};

export default App;