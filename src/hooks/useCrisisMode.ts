import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addCrisisLog, setEmergencyContacts, setUserLocation } from '../store/slices/crisisSlice';

interface CrisisLog {
  id: string;
  userId: string;
  triggerType: 'panic_button' | 'ai_escalation' | 'counselor_alert';
  interventionTaken: string;
  outcome?: string;
  followUpRequired: boolean;
  createdAt: string;
}

export const useCrisisMode = () => {
  const dispatch = useDispatch();

  const triggerCrisisIntervention = useCallback(async (
    triggerType: 'panic_button' | 'ai_escalation' | 'counselor_alert'
  ) => {
    try {
      // Fetch user location
      const locationResponse = await fetch('https://ipapi.co/json/');
      const locationData = await locationResponse.json();
      
      dispatch(setUserLocation({
        country: locationData.country_name,
        region: locationData.region,
      }));

      // Fetch emergency contacts based on location
      const mockContacts = [
        {
          id: '1',
          country: locationData.country_name || 'Global',
          serviceName: 'National Suicide Prevention Lifeline',
          phoneNumber: '988',
          websiteUrl: 'https://988lifeline.org',
          description: '24/7 free and confidential support for people in distress',
        },
        {
          id: '2',
          country: locationData.country_name || 'Global',
          serviceName: 'Crisis Text Line',
          phoneNumber: 'Text HOME to 741741',
          websiteUrl: 'https://www.crisistextline.org',
          description: 'Free 24/7 support via text message',
        },
        {
          id: '3',
          country: locationData.country_name || 'Global',
          serviceName: 'International Association for Suicide Prevention',
          phoneNumber: 'Visit website for local numbers',
          websiteUrl: 'https://www.iasp.info/resources/Crisis_Centres',
          description: 'Directory of crisis centers worldwide',
        },
      ];

      dispatch(setEmergencyContacts(mockContacts));

      return {
        success: true,
        location: locationData,
      };
    } catch (error) {
      console.error('Error triggering crisis intervention:', error);
      
      // Fallback emergency contacts
      dispatch(setEmergencyContacts([
        {
          id: '1',
          country: 'Global',
          serviceName: 'Emergency Services',
          phoneNumber: '911',
          description: 'Call emergency services immediately if in danger',
        },
      ]));

      return {
        success: false,
        error,
      };
    }
  }, [dispatch]);

  const logCrisisEvent = useCallback((log: Omit<CrisisLog, 'id' | 'createdAt'>) => {
    const crisisLog: CrisisLog = {
      ...log,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    dispatch(addCrisisLog(crisisLog));
  }, [dispatch]);

  return {
    triggerCrisisIntervention,
    logCrisisEvent,
  };
};
