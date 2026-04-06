import React from 'react'
import App from './App.tsx'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>

)
