// import { useState } from 'react'
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <MantineProvider>
          <Routes>
            <Route path="/*" element={<Home />} /></Routes> 
        </MantineProvider>
      </BrowserRouter>
    </>
  )
}

export default App
