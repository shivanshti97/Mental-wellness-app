import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Counselor {
  id: string;
  name: string;
  specializations: string[];
  bio: string;
  avatarUrl?: string;
  rating: number;
  availability: string[];
}

interface Appointment {
  id: string;
  studentId: string;
  counselorId: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
}

interface AppointmentState {
  upcoming: Appointment[];
  counselors: Counselor[];
  selectedCounselor: Counselor | null;
  bookingStep: number;
  isLoading: boolean;
}

const initialState: AppointmentState = {
  upcoming: [],
  counselors: [],
  selectedCounselor: null,
  bookingStep: 0,
  isLoading: false,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setUpcomingAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.upcoming = action.payload;
    },
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.upcoming.push(action.payload);
    },
    setCounselors: (state, action: PayloadAction<Counselor[]>) => {
      state.counselors = action.payload;
    },
    setSelectedCounselor: (state, action: PayloadAction<Counselor | null>) => {
      state.selectedCounselor = action.payload;
    },
    setBookingStep: (state, action: PayloadAction<number>) => {
      state.bookingStep = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateAppointmentStatus: (state, action: PayloadAction<{ id: string; status: Appointment['status'] }>) => {
      const appointment = state.upcoming.find(apt => apt.id === action.payload.id);
      if (appointment) {
        appointment.status = action.payload.status;
      }
    },
  },
});

export const {
  setUpcomingAppointments,
  addAppointment,
  setCounselors,
  setSelectedCounselor,
  setBookingStep,
  setLoading,
  updateAppointmentStatus,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
