import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom' 
import './index.css'
import { AnimatePresence } from 'framer-motion'
import ConversationQuestions from './pages/ConversationQuestions'





function App() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center'>
      <div className='container titles'>
        <h1 className='cuponents'>CUPonents</h1>
         <h1 className='text-center text-2xl'>Multiple Component Generator</h1>
      </div> 
      
       <AnimatePresence wait>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<ConversationQuestions />} />
            
            
          </Routes>
        </AnimatePresence>
        
    </div>
  )
}

export default App
