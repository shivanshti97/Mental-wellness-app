import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmergencyContact {
  id: string;
  country: string;
  region?: string;
  serviceName: string;
  phoneNumber: string;
  websiteUrl?: string;
  description: string;
}

interface CrisisLog {
  id: string;
  userId: string;
  triggerType: 'panic_button' | 'ai_escalation' | 'counselor_alert';
  interventionTaken: string;
  outcome?: string;
  followUpRequired: boolean;
  createdAt: string;
}

interface CrisisState {
  isGroundingModeActive: boolean;
  emergencyContacts: EmergencyContact[];
  recentCrisisLogs: CrisisLog[];
  userLocation: {
    country?: string;
    region?: string;
  };
  isLoadingContacts: boolean;
  groundingStep: number;
  groundingProgress: number;
}

const initialState: CrisisState = {
  isGroundingModeActive: false,
  emergencyContacts: [],
  recentCrisisLogs: [],
  userLocation: {},
  isLoadingContacts: false,
  groundingStep: 0,
  groundingProgress: 0,
};

const crisisSlice = createSlice({
  name: 'crisis',
  initialState,
  reducers: {
    activateGroundingMode: (state) => {
      state.isGroundingModeActive = true;
      state.groundingStep = 0;
      state.groundingProgress = 0;
    },
    deactivateGroundingMode: (state) => {
      state.isGroundingModeActive = false;
      state.groundingStep = 0;
      state.groundingProgress = 0;
    },
    setGroundingStep: (state, action: PayloadAction<number>) => {
      state.groundingStep = action.payload;
      state.groundingProgress = (action.payload / 5) * 100; // 5 steps in 5-4-3-2-1 technique
    },
    setEmergencyContacts: (state, action: PayloadAction<EmergencyContact[]>) => {
      state.emergencyContacts = action.payload;
      state.isLoadingContacts = false;
    },
    setUserLocation: (state, action: PayloadAction<{ country?: string; region?: string }>) => {
      state.userLocation = action.payload;
    },
    setLoadingContacts: (state, action: PayloadAction<boolean>) => {
      state.isLoadingContacts = action.payload;
    },
    addCrisisLog: (state, action: PayloadAction<CrisisLog>) => {
      state.recentCrisisLogs.unshift(action.payload);
      // Keep only the 10 most recent logs
      if (state.recentCrisisLogs.length > 10) {
        state.recentCrisisLogs = state.recentCrisisLogs.slice(0, 10);
      }
    },
    updateCrisisLog: (state, action: PayloadAction<{ id: string; updates: Partial<CrisisLog> }>) => {
      const { id, updates } = action.payload;
      const logIndex = state.recentCrisisLogs.findIndex(log => log.id === id);
      if (logIndex !== -1) {
        state.recentCrisisLogs[logIndex] = { ...state.recentCrisisLogs[logIndex], ...updates };
      }
    },
  },
});

export const {
  activateGroundingMode,
  deactivateGroundingMode,
  setGroundingStep,
  setEmergencyContacts,
  setUserLocation,
  setLoadingContacts,
  addCrisisLog,
  updateCrisisLog,
} = crisisSlice.actions;

export default crisisSlice.reducer;