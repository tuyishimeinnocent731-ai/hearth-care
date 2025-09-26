
import React, { useState, useMemo } from 'react';
import { DOCTORS } from './constants';
import { MOCK_USER_PROFILE } from './mockData';
import type { Doctor, Message, UserProfile } from './types';

// Components
import Header from './components/Header';
import LeftAside from './components/LeftAside';
import RightAside from './components/RightAside';
import DoctorSelection from './components/DoctorSelection';
import PaymentForm from './components/PaymentForm';
import ChatWindow from './components/ChatWindow';
import ConsultationSummary from './components/ConsultationSummary';
import VideoCallModal from './components/VideoCallModal';

// Pages
import AIChatPage from './pages/AIChatPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import PrescriptionsPage from './pages/PrescriptionsPage';
import HealthDashboardPage from './pages/HealthDashboardPage';
import VideoConsultationPage from './pages/VideoConsultationPage';
import MessagesPage from './pages/MessagesPage';

export type Page = 
  'home' | 
  'payment' | 
  'chat' | 
  'summary' | 
  'ai-chat' | 
  'profile' | 
  'settings' |
  'appointments' |
  'prescriptions' |
  'dashboard' |
  'video' |
  'messages';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isVideCallModalOpen, setIsVideoCallModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER_PROFILE);


  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentPage('payment');
  };

  const handlePaymentSuccess = () => {
    if (!selectedDoctor) return;
    const initialMessage: Message = {
        id: 'system-1',
        sender: 'system',
        text: `Ubujyanama na ${selectedDoctor.name} bwatangiye.`,
        timestamp: new Date().toISOString()
    };
    setChatHistory([initialMessage]);
    setCurrentPage('chat');
  };

  const handleEndConsultation = (finalChatHistory: Message[]) => {
    setChatHistory(finalChatHistory);
    setCurrentPage('summary');
  }

  const handleStartNewConsultation = () => {
    setSelectedDoctor(null);
    setChatHistory([]);
    setCurrentPage('home');
  }

  const handleNavigate = (page: Page) => {
      setCurrentPage(page);
  }

  const filteredDoctors = useMemo(() => {
    if (currentPage !== 'home') return DOCTORS;
    return DOCTORS.filter(doctor => 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentPage]);

  const onUpdateProfile = (profile: UserProfile) => {
      setUserProfile(profile);
      // Here you would typically also make an API call to save the profile
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <DoctorSelection doctors={filteredDoctors} onSelect={handleDoctorSelect} />;
      case 'payment':
        return <PaymentForm doctor={selectedDoctor} onPaymentSuccess={handlePaymentSuccess} />;
      case 'chat':
        return <ChatWindow 
                    doctor={selectedDoctor} 
                    initialMessages={chatHistory} 
                    onEndConsultation={handleEndConsultation}
                    onVideoCall={() => setIsVideoCallModalOpen(true)}
                />;
      case 'summary':
        return <ConsultationSummary doctor={selectedDoctor} chatHistory={chatHistory} onStartNew={handleStartNewConsultation} />;
      case 'ai-chat':
        return <AIChatPage userProfile={userProfile} />;
      case 'profile':
        return <ProfilePage userProfile={userProfile} onUpdateProfile={onUpdateProfile} />;
      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'prescriptions':
        return <PrescriptionsPage />;
      case 'dashboard':
        return <HealthDashboardPage />;
      case 'video':
        return <VideoConsultationPage onScheduleCall={() => handleNavigate('home')} />;
      case 'messages':
        return <MessagesPage />;
      default:
        return <DoctorSelection doctors={filteredDoctors} onSelect={handleDoctorSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <LeftAside 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        isMobileNavOpen={isMobileNavOpen}
        onCloseMobileNav={() => setIsMobileNavOpen(false)}
        userProfile={userProfile}
      />
      
      <div className="lg:pl-72 lg:pr-80">
        <Header 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery}
            onToggleMobileNav={() => setIsMobileNavOpen(true)}
            userProfile={userProfile}
            onNavigate={handleNavigate}
        />
        <main className="pt-16">
          {renderContent()}
        </main>
      </div>

      <RightAside onNavigate={handleNavigate} />

      <VideoCallModal 
        isOpen={isVideCallModalOpen}
        onClose={() => setIsVideoCallModalOpen(false)}
        doctorName={selectedDoctor?.name || 'your doctor'}
      />
       {isMobileNavOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsMobileNavOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;
