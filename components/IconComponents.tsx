
import React from 'react';

type SVGProps = React.SVGProps<SVGSVGElement>;

const defaultProps: SVGProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const HeartPulseIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.7-1 2.1 4.4 1.4-2.2H21.8"/></svg>;
export const SearchIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
export const BellIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
export const UserCircleIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="4"/><path d="M12 16c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
export const SettingsIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
export const LogOutIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
export const ChevronDownIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="m6 9 6 6 6-6"/></svg>;
export const MenuIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
export const StarIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} fill="currentColor" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
export const SendIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
export const PaperclipIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
export const VideoIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>;
export const XIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
export const CreditCardIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
export const LockIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
export const CalendarIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>;
export const ShieldCheckIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
export const UserIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
export const FileTextIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>;
export const HomeIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
export const MessageSquareIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
export const ChartBarIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M3 12h18M3 6h18M3 18h18"/></svg>;
export const BotIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>;
export const PillIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>;
export const ClockIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
export const CheckCircleIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>;
export const PlusCircleIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>;
export const RefreshCwIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>;
export const LightbulbIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 8a6 6 0 0 0-12 0c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>;
export const AlertTriangleIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
export const SmileIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>;
export const ClipboardCheckIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>;
export const ClipboardIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>;
export const CheckIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><polyline points="20 6 9 17 4 12"/></svg>;
export const MicrophoneIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>;
export const EditIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
export const SaveIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
export const UploadCloudIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>;
export const StethoscopeIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>;
export const ActivityIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
export const DropletIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>;
export const ArrowUpRightIcon: React.FC<SVGProps> = (props) => <svg {...defaultProps} {...props}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>;
