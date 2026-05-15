import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoodLog {
  id: string;
  userId: string;
  moodScore: number;
  visualState: 'floating' | 'neutral' | 'sinking';
  notes?: string;
  factors?: {
    sleep: number;
    exercise: boolean;
    social: boolean;
    stress: number;
  };
  timestamp: string;
}

interface MoodState {
  currentMood: MoodLog | null;
  history: MoodLog[];
  insights: string[];
  isLoading: boolean;
}

const initialState: MoodState = {
  currentMood: null,
  history: [],
  insights: [],
  isLoading: false,
};

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setCurrentMood: (state, action: PayloadAction<MoodLog>) => {
      state.currentMood = action.payload;
    },
    addMoodLog: (state, action: PayloadAction<MoodLog>) => {
      state.history.unshift(action.payload);
      state.currentMood = action.payload;
    },
    setMoodHistory: (state, action: PayloadAction<MoodLog[]>) => {
      state.history = action.payload;
    },
    setInsights: (state, action: PayloadAction<string[]>) => {
      state.insights = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurrentMood, addMoodLog, setMoodHistory, setInsights, setLoading } = moodSlice.actions;
export default moodSlice.reducer;
