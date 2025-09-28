import React, { useState, useMemo } from 'react';
import type { Doctor } from '../types';
// FIX: Replaced missing CalendarIcon with CalendarDaysIcon
import { CreditCardIcon, LockIcon, CalendarDaysIcon, ShieldCheckIcon, UserIcon } from './IconComponents';
import Spinner from './Spinner';

interface PaymentFormProps {
  doctor: Doctor | null;
  onPaymentSuccess: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ doctor, onPaymentSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [errors, setErrors] = useState({ number: '', name: '', expiry: '', cvv: '' });

    const processingFee = 5000; // 5000 RWF

    const validate = () => {
        const newErrors = { number: '', name: '', expiry: '', cvv: '' };
        let isValid = true;
        if (!/^\d{16}$/.test(cardData.number.replace(/\s/g, ''))) {
            newErrors.number = "Nimero y'ikarita igomba kuba imibare 16.";
            isValid = false;
        }
        if (cardData.name.trim().length < 3) {
            newErrors.name = "Izina rigomba kuba rifite byibuze inyuguti 3.";
            isValid = false;
        }
        if (!/^(0[1-9]|1[0-2])\s*\/\s*([2-9][0-9])$/.test(cardData.expiry)) {
            newErrors.expiry = "Itariki igomba kuba MM / YY (Urugero: 08 / 25).";
            isValid = false;
        }
        if (!/^\d{3,4}$/.test(cardData.cvv)) {
            newErrors.cvv = "CVV igomba kuba imibare 3 cyangwa 4.";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            onPaymentSuccess();
        }, 2000);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setCardData(prev => ({ ...prev, [id]: value }));
    }

  if (!doctor) return null;

  const totalAmount = doctor.consultationFee + processingFee;

  return (
    <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Uzuza Ubwishyu Bwawe</h2>
            <p className="text-gray-600 mb-6">Ishyura mu mutekano ubujyanama bwawe na Dr. {doctor.name}.</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Incamake y'Ibyaguzwe</h3>
                <div className="flex justify-between items-center text-gray-700">
                    <span>Ubujyanama na Dr. {doctor.name}</span>
                    <span className="font-medium">{doctor.consultationFee.toLocaleString('rw-RW')} RWF</span>
                </div>
                 <div className="flex justify-between items-center text-gray-700 mt-2">
                    <span>Amafaranga ya serivisi</span>
                    <span className="font-medium">{processingFee.toLocaleString('rw-RW')} RWF</span>
                </div>
                <hr className="my-4"/>
                <div className="flex justify-between items-center font-bold text-xl">
                    <span>Igiteranyo</span>
                    <span>{totalAmount.toLocaleString('rw-RW')} RWF</span>
                </div>
            </div>
             <div className="mt-6 flex items-center text-sm text-gray-500">
                <ShieldCheckIcon className="w-5 h-5 mr-2 text-green-500" />
                <span>Ubwishyu bwa SSL bwizewe. Amakuru yawe ararinzwe.</span>
            </div>
        </div>
        <div className="lg:w-1/2">
             <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                 <div>
                    <label htmlFor="number" className="block text-sm font-medium text-gray-700">Nimero y'Ikarita</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <CreditCardIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" id="number" value={cardData.number} onChange={handleChange} className={`block w-full rounded-md border-gray-300 pl-10 sm:text-sm p-2.5 ${errors.number ? 'border-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`} placeholder="0000 0000 0000 0000" />
                    </div>
                    {errors.number && <p className="mt-1 text-xs text-red-600">{errors.number}</p>}
                </div>
                
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Izina riri ku Ikarita</label>
                    <div className="mt-1 relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" id="name" value={cardData.name} onChange={handleChange} className={`block w-full rounded-md border-gray-300 pl-10 sm:text-sm p-2.5 ${errors.name ? 'border-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`} placeholder="Nkurunziza Jean" />
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Igihe Izarangirira</label>
                         <div className="mt-1 relative rounded-md shadow-sm">
                             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                {/* FIX: Replaced missing CalendarIcon with CalendarDaysIcon */}
                                <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input type="text" id="expiry" value={cardData.expiry} onChange={handleChange} className={`block w-full rounded-md border-gray-300 pl-10 sm:text-sm p-2.5 ${errors.expiry ? 'border-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`} placeholder="UK / UM" />
                         </div>
                         {errors.expiry && <p className="mt-1 text-xs text-red-600">{errors.expiry}</p>}
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input type="text" id="cvv" value={cardData.cvv} onChange={handleChange} className={`block w-full rounded-md border-gray-300 pl-10 sm:text-sm p-2.5 ${errors.cvv ? 'border-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`} placeholder="123" />
                        </div>
                        {errors.cvv && <p className="mt-1 text-xs text-red-600">{errors.cvv}</p>}
                    </div>
                </div>
                 <div>
                    <label htmlFor="insurance" className="block text-sm font-medium text-gray-700">Ubwishingizi / Mituelle (Si itegeko)</label>
                    <select id="insurance" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5">
                        <option>Nta yo</option>
                        <option>Radiant</option>
                        <option>Britam</option>
                        <option>RSSB</option>
                    </select>
                </div>
                <button type="submit" disabled={isProcessing} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400">
                    {isProcessing ? <Spinner/> : `Ishyura ${totalAmount.toLocaleString('rw-RW')} RWF`}
                </button>
            </form>
        </div>
    </div>
  );
};

export default PaymentForm;