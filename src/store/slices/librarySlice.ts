import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Resource {
  id: string;
  title: string;
  description?: string;
  category: string;
  type: 'video' | 'audio' | 'article' | 'worksheet' | 'exercise';
  url: string;
  duration?: number;
  difficultyLevel?: number;
  tags: string[];
  isFeatured: boolean;
}

interface UserProgress {
  id: string;
  userId: string;
  resourceId: string;
  progressPercentage: number;
  completedAt?: string;
  rating?: number;
  notes?: string;
}

interface LibraryState {
  resources: Resource[];
  userProgress: UserProgress[];
  recommendations: Resource[];
  currentResource: Resource | null;
  isLoading: boolean;
  selectedCategory: string | null;
}

const initialState: LibraryState = {
  resources: [],
  userProgress: [],
  recommendations: [],
  currentResource: null,
  isLoading: false,
  selectedCategory: null,
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setResources: (state, action: PayloadAction<Resource[]>) => {
      state.resources = action.payload;
    },
    setUserProgress: (state, action: PayloadAction<UserProgress[]>) => {
      state.userProgress = action.payload;
    },
    updateProgress: (state, action: PayloadAction<UserProgress>) => {
      const index = state.userProgress.findIndex(p => p.resourceId === action.payload.resourceId);
      if (index !== -1) {
        state.userProgress[index] = action.payload;
      } else {
        state.userProgress.push(action.payload);
      }
    },
    setRecommendations: (state, action: PayloadAction<Resource[]>) => {
      state.recommendations = action.payload;
    },
    setCurrentResource: (state, action: PayloadAction<Resource | null>) => {
      state.currentResource = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  setResources,
  setUserProgress,
  updateProgress,
  setRecommendations,
  setCurrentResource,
  setLoading,
  setSelectedCategory,
} = librarySlice.actions;

export default librarySlice.reducer;
