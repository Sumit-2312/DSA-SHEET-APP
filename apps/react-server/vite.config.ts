import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: "0.0.0.0",// this will allow the server to be accessed from any IP address, you can specify the allowed hosts if you want to restrict access
    port: 5173,
  }
})
