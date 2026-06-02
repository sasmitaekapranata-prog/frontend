import React from 'react'
import ReactDOM from 'react-dom/client'
// 🟢 Panggil AppRoutes yang berada di dalam folder routes kamu
import App from './App.jsx'
import './index.css' // Sesuaikan jika ada file css utama kamu

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)