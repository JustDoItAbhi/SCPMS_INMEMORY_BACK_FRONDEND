
// import './App.css'
import { BrowserRouter, Route, Router, Routes, useLocation } from 'react-router-dom';

import AppContent from './components/apps/AppContent';
import { AuthProvider } from './components/Login Component/UseAuth';
import AuthLogin from './components/Login Component/AuthLogin';
// import GalaxyBackground from './components/GalaxyBackground';

function App() {


  return (
    <>
     <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<AuthLogin/>} />
            <Route path='/*' element={<AppContent />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
