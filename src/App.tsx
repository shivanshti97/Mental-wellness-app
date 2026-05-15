import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import CounselorsPage from './pages/CounselorsPage';
import CommunityPage from './pages/CommunityPage';
import LibraryPage from './pages/LibraryPage';
import ProfilePage from './pages/ProfilePage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SOSButton from './components/crisis/SOSButton';
import WellnessChatbot from './components/ai/WellnessChatbot';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-gradient-to-br from-space-dark via-space-blue to-space-purple">
            <MainLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/counselors" element={<CounselorsPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/mood-tracker" element={<MoodTrackerPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Routes>
            </MainLayout>

            {/* Persistent Crisis Intervention Button */}
            <SOSButton />

            {/* AI Triage Chatbot */}
            <WellnessChatbot />
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;