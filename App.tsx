import React, { useState, useMemo } from 'react';
import type { Doctor, Message } from './types';
import { DOCTORS } from './constants';
import Header from './components/Header';
import LeftAside from './components/LeftAside';
import RightAside from './components/RightAside';
import DoctorSelection from './components/DoctorSelection';
import PaymentForm from './components/PaymentForm';
import ChatWindow from './components/ChatWindow';
import ConsultationSummary from './components/ConsultationSummary';
import VideoCallModal from './components/VideoCallModal';

type AppStep = 'doctor-selection' | 'payment' | 'chat' | 'summary';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('doctor-selection');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep('payment');
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
    setCurrentStep('chat');
  };

  const handleEndConsultation = (chatHistory: Message[]) => {
    setMessages(chatHistory);
    setCurrentStep('summary');
  };

  const handleStartNew = () => {
    setSelectedDoctor(null);
    setMessages([]);
    setSearchQuery('');
    setCurrentStep('doctor-selection');
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

  const renderContent = () => {
    switch (currentStep) {
      case 'doctor-selection':
        return <DoctorSelection doctors={filteredDoctors} onSelect={handleSelectDoctor} />;
      case 'payment':
        return <PaymentForm doctor={selectedDoctor} onPaymentSuccess={handlePaymentSuccess} />;
      case 'chat':
        return <ChatWindow doctor={selectedDoctor} initialMessages={messages} onEndConsultation={handleEndConsultation} onVideoCall={openVideoModal} />;
      case 'summary':
        return <ConsultationSummary doctor={selectedDoctor} chatHistory={messages} onStartNew={handleStartNew} />;
      default:
        return <DoctorSelection doctors={filteredDoctors} onSelect={handleSelectDoctor} />;
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100 font-sans">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
          onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        />
        <div className="flex flex-1 overflow-hidden">
          <LeftAside 
            onNavigateHome={handleStartNew} 
            onVideoCall={openVideoModal}
            isMobileNavOpen={isMobileNavOpen}
            onCloseMobileNav={() => setIsMobileNavOpen(false)}
          />
          <main className="flex-1 overflow-y-auto bg-white relative">
            {isMobileNavOpen && (
              <div 
                className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
                onClick={() => setIsMobileNavOpen(false)}
                aria-hidden="true"
              ></div>
            )}
            <div className="container mx-auto max-w-5xl">
              {renderContent()}
            </div>
          </main>
          <RightAside />
        </div>
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