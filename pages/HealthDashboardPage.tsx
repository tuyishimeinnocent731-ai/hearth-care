import React, { useState, useEffect } from 'react';
import type { Page, UserProfile, Appointment, Prescription, HealthGoal } from '../types';
import { MOCK_HEALTH_GOALS, MOCK_HEALTH_METRICS } from '../mockData';
import { 
    ArrowUpRightIcon, 
    LightbulbIcon, 
    RefreshCwIcon, 
    CalendarDaysIcon, 
    PillIcon, 
    StethoscopeIcon,
    TargetIcon,
    PlusIcon,
    ActivityIcon,
    EditIcon,
    Trash2Icon,
    XIcon,
    ClipboardPulseIcon,
    PhoneWaveIcon
} from '../components/IconComponents';
import { getAIHealthAdvice } from '../services/geminiService';
import Spinner from '../components/Spinner';

interface HealthDashboardPageProps {
    userProfile: UserProfile;
    onNavigate: (page: Page) => void;
    appointments: Appointment[];
    prescriptions: Prescription[];
    onJoinCall: (appointment: Appointment) => void;
}

const DashboardCard: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode, className?: string, headerAction?: React.ReactNode }> = ({ title, icon, children, className = '', headerAction }) => (
  <div className={`bg-white p-5 rounded-xl shadow-sm border border-gray-200 ${className}`}>
    <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
      <h3 className="font-bold text-lg text-gray-800 flex items-center">
        {icon}
        <span className={icon ? 'ml-3' : ''}>{title}</span>
      </h3>
      {headerAction}
    </div>
    {children}
  </div>
);

const GoalModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (goal: HealthGoal) => void;
    goal: HealthGoal | null;
}> = ({ isOpen, onClose, onSave, goal }) => {
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');

    useEffect(() => {
        if (goal) {
            setName(goal.name);
            setTarget(goal.target);
        } else {
            setName('');
            setTarget('');
        }
    }, [goal, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        const newGoal: HealthGoal = {
            id: goal?.id || Date.now().toString(),
            name,
            target,
            progress: goal?.progress || 0,
            icon: goal?.icon || ActivityIcon, 
            color: goal?.color || 'blue',
        };
        onSave(newGoal);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 animate-in fade-in-0 zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{goal ? 'Hindura Intego' : 'Ongeraho Intego'}</h2>
                    <button onClick={onClose}><XIcon className="w-5 h-5"/></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Izina ry'intego</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 p-2 border rounded-md" placeholder="Urugero: Kugenda n'amaguru"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Intego</label>
                        <input type="text" value={target} onChange={e => setTarget(e.target.value)} className="w-full mt-1 p-2 border rounded-md" placeholder="Urugero: 10,000 Intambwe"/>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-md hover:bg-gray-200">Reka</button>
                    <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Bika</button>
                </div>
            </div>
        </div>
    );
};


const HealthDashboardPage: React.FC<HealthDashboardPageProps> = ({ userProfile, onNavigate, appointments, prescriptions, onJoinCall }) => {
    const [healthTip, setHealthTip] = useState('');
    const [isTipLoading, setIsTipLoading] = useState(true);
    const [healthGoals, setHealthGoals] = useState(MOCK_HEALTH_GOALS);
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState<HealthGoal | null>(null);

    const fetchHealthTip = async () => {
        setIsTipLoading(true);
        try {
            const tip = await getAIHealthAdvice(
                'Give me a short, useful, and encouraging health tip for today in Kinyarwanda. Start with something like "[ICON:idea] Inama y\'Umunsi:"',
                [], null, userProfile
            );
            setHealthTip(tip);
        } catch (error) {
            console.error("Failed to fetch health tip:", error);
            setHealthTip("Tuvuganye n'ikibazo mu kubona inama y'ubuzima. Gerageza nyuma.");
        } finally {
            setIsTipLoading(false);
        }
    };

    useEffect(() => {
        fetchHealthTip();
    }, []);
    
    const handleSaveGoal = (goal: HealthGoal) => {
        const index = healthGoals.findIndex(g => g.id === goal.id);
        if (index > -1) {
            setHealthGoals(prev => prev.map(g => g.id === goal.id ? goal : g));
        } else {
            setHealthGoals(prev => [...prev, goal]);
        }
    };
    
    const handleDeleteGoal = (goalId: string) => {
        setHealthGoals(prev => prev.filter(g => g.id !== goalId));
    };

    const handleOpenGoalModal = (goal: HealthGoal | null) => {
        setEditingGoal(goal);
        setIsGoalModalOpen(true);
    };


    const nextAppointment = appointments
        .filter(a => a.status === 'Upcoming' && new Date(a.date) > new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    const appointmentActivities = appointments.filter(a => a.status !== 'Upcoming').map(a => ({
        type: 'appointment',
        date: new Date(a.date),
        title: `Gahunda na ${a.doctorName}`,
        description: a.status === 'Completed' ? 'Byarangiye' : 'Byahagaritswe',
        Icon: StethoscopeIcon,
    }));
    const prescriptionActivities = prescriptions.map(p => ({
        type: 'prescription',
        date: new Date(p.dateIssued),
        title: `Wandikiwe ${p.medication}`,
        description: `Na ${p.doctorName}`,
        Icon: PillIcon,
    }));
    const recentActivity = [...appointmentActivities, ...prescriptionActivities]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 4);

    const handleGoalProgress = (goalId: string) => {
        setHealthGoals(goals => goals.map(g => {
            if (g.id === goalId) {
                const targetNum = parseInt(g.target.match(/\d+/)?.[0] || '1');
                const increment = 100 / targetNum;
                return { ...g, progress: Math.min(100, g.progress + increment) };
            }
            return g;
        }));
    };

    const colorClasses: { [key: string]: { bg: string, text: string, progressBg: string } } = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-600', progressBg: 'bg-blue-500' },
        green: { bg: 'bg-green-100', text: 'text-green-600', progressBg: 'bg-green-500' },
        indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', progressBg: 'bg-indigo-500' },
        yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', progressBg: 'bg-yellow-500' },
    };

    return (
        <>
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Murakaza neza, {userProfile.fullName.split(' ')[0]}!</h1>
                <p className="mt-2 text-lg text-gray-600">Dore uko ubuzima bwawe buhagaze uyu munsi.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* New Symptom Checker Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <div className="p-3 bg-white/20 rounded-lg"><ClipboardPulseIcon className="w-8 h-8 text-white"/></div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold">Ufite ikibazo cy'ubuzima?</h2>
                            <p className="text-sm text-blue-100 mt-1">Banza uganire n'umujyanama wacu wa AI kugirango usuzume ibimenyetso byawe.</p>
                        </div>
                        <button onClick={() => onNavigate('symptom-checker')} className="w-full sm:w-auto px-5 py-2.5 bg-white text-blue-600 font-bold rounded-lg shadow-sm hover:bg-blue-50 transition-colors whitespace-nowrap">
                            Tangira Isuzuma
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {MOCK_HEALTH_METRICS.map(metric => (
                            <div key={metric.id} className="bg-white p-4 rounded-xl shadow-sm border">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-sm text-gray-600">{metric.name}</h3>
                                    <metric.icon className="w-5 h-5 text-gray-400" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{metric.value} <span className="text-sm font-medium text-gray-500">{metric.unit}</span></p>
                            </div>
                        ))}
                    </div>

                     <DashboardCard title="Ibikorwa bya Vuba" icon={<ActivityIcon className="w-5 h-5 text-gray-500"/>} headerAction={<a href="#" onClick={(e) => {e.preventDefault(); onNavigate('notifications')}} className="text-sm font-medium text-blue-600 hover:underline">Reba byose</a>}>
                        <div className="space-y-3">
                            {recentActivity.length > 0 ? recentActivity.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-100 rounded-full"><item.Icon className="w-5 h-5 text-gray-500"/></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">{item.title}</p>
                                        <p className="text-xs text-gray-500">{item.description}</p>
                                    </div>
                                    <p className="text-xs text-gray-400">{item.date.toLocaleDateString('rw-RW', {month: 'short', day: 'numeric'})}</p>
                                </div>
                            )) : <p className="text-sm text-gray-500 text-center py-4">Nta gikorwa cya vuba gihari.</p>}
                        </div>
                    </DashboardCard>
                </div>

                <div className="space-y-6">
                     {nextAppointment ? (
                        <DashboardCard title="Gahunda Iteganyijwe" icon={<CalendarDaysIcon className="w-5 h-5 text-gray-500"/>}>
                            <div className="flex items-center gap-4">
                               <div className="flex-1">
                                    <p className="text-base font-bold text-gray-800">{nextAppointment.type} na {nextAppointment.doctorName}</p>
                                    <p className="text-sm text-gray-500">{new Date(nextAppointment.date).toLocaleString('rw-RW', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                </div>
                                <button onClick={() => onJoinCall(nextAppointment)} className="px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 text-sm">Injira</button>
                            </div>
                        </DashboardCard>
                    ) : (
                         <DashboardCard title="Gahunda Iteganyijwe" icon={<CalendarDaysIcon className="w-5 h-5 text-gray-500"/>}>
                            <div className="text-center py-3">
                                <p className="font-semibold text-gray-800">Nta gahunda nshya ifite</p>
                                <button onClick={() => onNavigate('schedule-appointment')} className="mt-2 text-sm font-semibold text-blue-600 hover:underline">Fata Gahunda</button>
                            </div>
                         </DashboardCard>
                    )}
                    
                    <DashboardCard title="Ubujyanama Bwa Live na AI" icon={<PhoneWaveIcon className="w-5 h-5 text-gray-500"/>}>
                        <p className="text-sm text-gray-600 mb-4">Girana ikiganiro cy'amajwi mu buryo bweruye n'umujyanama wacu wa AI.</p>
                        <button onClick={() => onNavigate('live-consultation')} className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700">Tangira Ikiganiro</button>
                    </DashboardCard>

                    <DashboardCard title="Intego Z'ubuzima" icon={<TargetIcon className="w-5 h-5 text-gray-500"/>} headerAction={<button onClick={() => handleOpenGoalModal(null)} className="text-sm font-medium text-blue-600 hover:underline">Ongeraho</button>}>
                        <div className="space-y-4">
                            {healthGoals.map(goal => {
                                const colors = colorClasses[goal.color] || colorClasses.blue;
                                return (
                                    <div key={goal.id} className="group">
                                        <div className="flex justify-between items-center text-sm mb-1.5">
                                            <span className={`font-bold flex items-center ${colors.text}`}>
                                                <goal.icon className="w-4 h-4 mr-2" /> {goal.name}
                                            </span>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleOpenGoalModal(goal)}><EditIcon className="w-3 h-3 text-gray-400 hover:text-blue-600"/></button>
                                                <button onClick={() => handleDeleteGoal(goal.id)}><Trash2Icon className="w-3 h-3 text-gray-400 hover:text-red-600"/></button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className={`${colors.progressBg} h-2 rounded-full`} style={{width: `${goal.progress}%`}}></div>
                                            </div>
                                            <button onClick={() => handleGoalProgress(goal.id)} className={`flex-shrink-0 w-6 h-6 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center hover:opacity-80`}>
                                                <PlusIcon className="w-4 h-4"/>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </DashboardCard>
                     <DashboardCard title="Inama y'Umunsi" icon={<LightbulbIcon className="w-5 h-5 text-yellow-500"/>} headerAction={<button onClick={fetchHealthTip} className="p-1 rounded-full hover:bg-gray-100" disabled={isTipLoading}><RefreshCwIcon className={`w-4 h-4 text-gray-500 ${isTipLoading ? 'animate-spin' : ''}`}/></button>}>
                       {isTipLoading ? <div className="flex justify-center items-center h-16"><Spinner/></div> : <p className="text-sm text-gray-600 leading-relaxed">{healthTip}</p>}
                    </DashboardCard>
                </div>
            </div>
        </div>
        <GoalModal 
            isOpen={isGoalModalOpen}
            onClose={() => setIsGoalModalOpen(false)}
            onSave={handleSaveGoal}
            goal={editingGoal}
        />
        </>
    );
};

export default HealthDashboardPage;