import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Globe, MapPin, X } from 'lucide-react';

interface EmergencyContact {
  id: string;
  country: string;
  region?: string;
  serviceName: string;
  phoneNumber: string;
  websiteUrl?: string;
  description: string;
}

interface EmergencyContactsProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact[];
}

const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ isOpen, onClose, contacts }) => {
  const handleCallClick = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleWebsiteClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="glass-card max-w-3xl w-full mx-4 p-6 max-h-[80vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Phone className="w-6 h-6 text-red-400" />
              Emergency Contacts
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              aria-label="Close emergency contacts"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {contacts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">Loading emergency contacts for your location...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  className="glass-card-hover p-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {contact.serviceName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{contact.country}{contact.region ? `, ${contact.region}` : ''}</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">{contact.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleCallClick(contact.phoneNumber)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {contact.phoneNumber}
                        </button>
                        
                        {contact.websiteUrl && (
                          <button
                            onClick={() => handleWebsiteClick(contact.websiteUrl!)}
                            className="glass-card-hover px-4 py-2 rounded-lg text-white flex items-center gap-2"
                          >
                            <Globe className="w-4 h-4" />
                            Website
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-6 p-4 bg-yellow-900 bg-opacity-30 rounded-lg border border-yellow-600">
            <p className="text-sm text-yellow-200">
              <strong>Important:</strong> If you're in immediate danger, please call your local emergency services (911, 112, 999, etc.) right away.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmergencyContacts;