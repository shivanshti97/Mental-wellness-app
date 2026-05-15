import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommunityPost {
  id: string;
  userId: string;
  title?: string;
  content: string;
  anonymousFlag: boolean;
  supportGroupId?: string;
  upvotes: number;
  isFlagged: boolean;
  moderationStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  isPrivate: boolean;
  memberCount: number;
}

interface CommunityState {
  posts: CommunityPost[];
  supportGroups: SupportGroup[];
  currentGroup: SupportGroup | null;
  moderationQueue: CommunityPost[];
  isLoading: boolean;
}

const initialState: CommunityState = {
  posts: [],
  supportGroups: [],
  currentGroup: null,
  moderationQueue: [],
  isLoading: false,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<CommunityPost[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<CommunityPost>) => {
      state.posts.unshift(action.payload);
    },
    setSupportGroups: (state, action: PayloadAction<SupportGroup[]>) => {
      state.supportGroups = action.payload;
    },
    setCurrentGroup: (state, action: PayloadAction<SupportGroup | null>) => {
      state.currentGroup = action.payload;
    },
    setModerationQueue: (state, action: PayloadAction<CommunityPost[]>) => {
      state.moderationQueue = action.payload;
    },
    upvotePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.upvotes += 1;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setPosts,
  addPost,
  setSupportGroups,
  setCurrentGroup,
  setModerationQueue,
  upvotePost,
  setLoading,
} = communitySlice.actions;

export default communitySlice.reducer;
