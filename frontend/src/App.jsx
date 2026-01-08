import {useEffect} from 'react';
import Navbar from './components/Navbar';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Loader} from 'lucide-react';

import {Toaster} from 'react-hot-toast';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import {useAuthStore} from './store/useAuthStore';
import {useThemeStore} from './store/useThemeStore';

function App() {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  
  console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  },  [checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser) 
    return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  );

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        {/* If loggen in , show Home. If not, redirect to Login */}
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to= "/login" />} />

        {/* If logged in, redirect away from Signup/Login to Home */}
        <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to="/" />}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/" />}/>

        <Route path='/settings' element={<SettingsPage/>}/>

        {/* Protect the Profile route */}
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login" /> }/>
        
      </Routes>

      <Toaster />

    </div>
  )
}

export default App;
