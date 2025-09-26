import React from 'react';

// Common props for all icons to keep them consistent
const commonProps = (props: React.SVGProps<SVGSVGElement>): React.SVGProps<SVGSVGElement> => ({
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  strokeWidth: 1.5,
  stroke: "currentColor",
  ...props, // Spread incoming props to allow overrides
});

export const HeartPulseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.375 18.375a2.25 2.25 0 00-3-3.037M12 15.75l-2.625-2.625M12 15.75l2.625 2.625" />
  </svg>
);

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

export const UserCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

export const LogOutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)} fill="currentColor" strokeWidth={0}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const PaperclipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.735l-7.69 7.69a6 6 0 01-8.485-8.485l7.69-7.69a4.5 4.5 0 016.364 6.364l-7.69 7.69a3 3 0 01-4.243-4.243l7.69-7.69" />
  </svg>
);

export const VideoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />
  </svg>
);

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const CreditCardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>
);

export const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
  </svg>
);

export const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
  </svg>
);

export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const FileTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const MessageSquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.537a59.735 59.735 0 01-3.238.217-59.735 59.735 0 01-3.238-.217L4.22 17.221a2.097 2.097 0 01-1.98-2.193v-4.286c0-.97.616-1.813 1.5-2.097L6.75 8.25m13.5 0L12 12m-6.75-3.75L12 12" />
  </svg>
);

export const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export const BotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5v4.25a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v-4.25m-6 0v4.25a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25v-4.25" />
  </svg>
);

export const PillIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path d="M14.25 4.5l5.25 5.25-6.75 6.75-5.25-5.25L14.25 4.5zM12.75 6l3 3m-3.75 3.75l-5.25-5.25 6.75-6.75 5.25 5.25-6.75 6.75z"/>
  </svg>
);

export const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PlusCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a2.397 2.397 0 01-.527 1.784c-.21.242-.438.464-.676.662a2.397 2.397 0 01-1.784.527m-9-14.25a2.397 2.397 0 01.527-1.784c.21-.242.438-.464.676-.662a2.397 2.397 0 011.784-.527m9 14.25a2.397 2.397 0 00-.527-1.784c-.21-.242-.438-.464-.676-.662a2.397 2.397 0 00-1.784-.527m-9-14.25a2.397 2.397 0 00-.527 1.784c.21.242.438.464.676.662a2.397 2.397 0 001.784.527" />
  </svg>
);

export const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const SmileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008h-.008V9.75z" />
  </svg>
);

export const ClipboardCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M9 5.25v.75m3-3v.75m3-3v.75M9 5.25V3m3-3v2.25m3-3v2.25M9 5.25a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v.75M9 5.25h3.75m-3.75 0a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5H9.75" />
  </svg>
);

export const ClipboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5.25v.75m3-3v.75m3-3v.75M9 5.25V3m3-3v2.25m3-3v2.25M9 5.25h3.75m-3.75 0a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5H9.75" />
  </svg>
);

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const MicrophoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12 0v-1.5a6 6 0 00-6-6v0a6 6 0 00-6 6v1.5m6 9.75v-1.5" />
  </svg>
);

export const RefreshCwIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...commonProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.18-3.185m-3.181 9.348a8.25 8.25 0 00-11.664 0l-3.18 3.185m3.181-9.348l-3.181-3.183a8.25 8.25 0 000-11.664l3.181-3.185 3.181 3.185z" />
  </svg>
);

export const StethoscopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...commonProps(props)}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 3.75h16.5M5.25 1.5s-2.625 2.625-2.625 5.25v1.5c0 2.625 2.625 5.25 2.625 5.25m13.5-12s2.625 2.625 2.625 5.25v1.5c0 2.625-2.625 5.25-2.625 5.25M9 1.5s-2.625 2.625-2.625 5.25v1.5c0 2.625 2.625 5.25 2.625 5.25m6-12s2.625 2.625 2.625 5.25v1.5c0 2.625-2.625 5.25-2.625 5.25M6.75 18a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25v.75a2.25 2.25 0 01-2.25 2.25h-6a2.25 2.25 0 01-2.25-2.25v-.75z" />
    </svg>
);

export const ActivityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...commonProps(props)}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h.008v.008H3.75V12zm0 3h.008v.008H3.75v-.008zm0 3h.008v.008H3.75v-.008zm5.625-6h.008v.008h-.008V12zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm5.625-6h.008v.008h-.008V12zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 1.673.832 3.166 2.094 4.079.25.18.517.34.79.485V21h12.232v-8.186c.273-.145.54-.305.79-.485C20.168 11.416 21 9.923 21 8.25z" />
    </svg>
);

export const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...commonProps(props)}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

export const SaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...commonProps(props)}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5v12m-4.5-4.5L12 18l4.5-4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5" />
    </svg>
);