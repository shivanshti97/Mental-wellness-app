import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  riskAssessment?: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
    recommendations: string[];
  };
}

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  currentRiskLevel: 'low' | 'medium' | 'high';
  isTyping: boolean;
  sessionId: string | null;
}

const initialState: ChatState = {
  messages: [],
  isOpen: false,
  currentRiskLevel: 'low',
  isTyping: false,
  sessionId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    setRiskLevel: (state, action: PayloadAction<'low' | 'medium' | 'high'>) => {
      state.currentRiskLevel = action.payload;
    },
    setIsTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.sessionId = null;
      state.currentRiskLevel = 'low';
    },
  },
});

export const {
  toggleChat,
  setIsOpen,
  addMessage,
  setMessages,
  setRiskLevel,
  setIsTyping,
  setSessionId,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
