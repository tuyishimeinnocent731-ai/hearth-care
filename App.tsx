import React, { useState, useMemo } from 'react';
import type { Doctor, Message, UserProfile } from './types';
import { DOCTORS } from './constants';
import Header from './components/Header';
import LeftAside from './components/LeftAside';
import RightAside from './components/RightAside';
import DoctorSelection from './components/DoctorSelection';
import PaymentForm from './components/PaymentForm';
import ChatWindow from './components/ChatWindow';
import ConsultationSummary from './components/ConsultationSummary';
import VideoCallModal from './components/VideoCallModal';
import MessagesPage from './pages/MessagesPage';
import PrescriptionsPage from './pages/PrescriptionsPage';
import HealthDashboardPage from './pages/HealthDashboardPage';
import AppointmentsPage from './pages/AppointmentsPage';
import SettingsPage from './pages/SettingsPage';
import VideoConsultationPage from './pages/VideoConsultationPage';
import AIChatPage from './pages/AIChatPage';
import ProfilePage from './pages/ProfilePage';


export type Page = 'home' | 'messages' | 'prescriptions' | 'dashboard' | 'appointments' | 'settings' | 'video' | 'ai-chat' | 'profile';
type ChatStep = 'doctor-selection' | 'payment' | 'chat' | 'summary';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [chatStep, setChatStep] = useState<ChatStep>('doctor-selection');
  
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: 'K. Nkurunziza',
    email: 'nkurunziza.k@example.com',
    phone: '+250 788 123 456',
    dob: '1990-05-15',
    location: 'Kigali, Rwanda',
    profilePicture: 'https://picsum.photos/seed/user/200/200',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Asthma'],
    pastSurgeries: ['Appendectomy (2015)'],
    emergencyContact: { name: 'G. Uwera', phone: '+250 788 654 321' },
    lifestyle: { smokingStatus: 'Never', alcoholConsumption: 'Occasional' }
  });

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setIsMobileNavOpen(false); // Close mobile nav on navigation
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setChatStep('payment');
  };

  const handlePaymentSuccess = () => {
    if (!selectedDoctor) return;
    setMessages([
      {
        id: 'system-1',
        sender: 'system',
        text: `Ubuhamya bwawe na Dr. ${selectedDoctor.name} bwatangiye. Sobanura ibimenyetso byawe.`,
        timestamp: new Date().toISOString(),
      },
    ]);
    setChatStep('chat');
  };

  const handleEndConsultation = (chatHistory: Message[]) => {
    setMessages(chatHistory);
    setChatStep('summary');
  };

  const handleStartNew = () => {
    setSelectedDoctor(null);
    setMessages([]);
    setSearchQuery('');
    setChatStep('doctor-selection');
    setCurrentPage('home');
  };

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const filteredDoctors = useMemo(() => {
    if (!searchQuery) return DOCTORS;
    return DOCTORS.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderConsultationFlow = () => {
    switch (chatStep) {
      case 'doctor-selection':
        return <DoctorSelection doctors={filteredDoctors} onSelect={handleSelectDoctor} />;
      case 'payment':
        return <PaymentForm doctor={selectedDoctor} onPaymentSuccess={handlePaymentSuccess} />;
      case 'chat':
        return <ChatWindow doctor={selectedDoctor} initialMessages={messages} onEndConsultation={handleEndConsultation} onVideoCall={() => handleNavigate('video')} />;
      case 'summary':
        return <ConsultationSummary doctor={selectedDoctor} chatHistory={messages} onStartNew={handleStartNew} />;
      default:
        return <DoctorSelection doctors={filteredDoctors} onSelect={handleSelectDoctor} />;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
        case 'home':
            return renderConsultationFlow();
        case 'messages':
            return <MessagesPage />;
        case 'prescriptions':
            return <PrescriptionsPage />;
        case 'dashboard':
            return <HealthDashboardPage />;
        case 'appointments':
            return <AppointmentsPage />;
        case 'settings':
            return <SettingsPage onNavigate={handleNavigate} />;
        case 'video':
            return <VideoConsultationPage onScheduleCall={openVideoModal}/>;
        case 'ai-chat':
            return <AIChatPage userProfile={userProfile} />;
        case 'profile':
            return <ProfilePage userProfile={userProfile} onUpdateProfile={setUserProfile} />;
        default:
            return renderConsultationFlow();
    }
  };

  return (
    <>
      <div className="bg-gray-100 font-sans">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
          onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
          userProfile={userProfile}
          onNavigate={handleNavigate}
        />
        
        <LeftAside 
          onNavigate={handleNavigate}
          currentPage={currentPage}
          isMobileNavOpen={isMobileNavOpen}
          onCloseMobileNav={() => setIsMobileNavOpen(false)}
          userProfile={userProfile}
        />

        <main className="min-h-screen pt-16 lg:ml-72 lg:mr-80">
            {isMobileNavOpen && (
              <div 
                className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
                onClick={() => setIsMobileNavOpen(false)}
                aria-hidden="true"
              ></div>
            )}
            {renderPage()}
        </main>

        <RightAside onNavigate={handleNavigate} />
      </div>
      <VideoCallModal 
        isOpen={isVideoModalOpen} 
        onClose={closeVideoModal} 
        doctorName={selectedDoctor?.name || 'your doctor'} 
      />
    </>
  );
};

export default App;