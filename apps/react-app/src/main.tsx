import App from './App.tsx'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Slide, ToastContainer } from "react-toastify";


createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar= {false}
        closeOnClick = {true}
        draggable
        theme='dark'
        transition={Slide}
        aria-label="Notifications"
      />      
      <App />
    </BrowserRouter>
  </RecoilRoot>

)
