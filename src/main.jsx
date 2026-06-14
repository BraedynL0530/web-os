import React from 'react'
import ReactDOM from 'react-dom/client'
import Boot from './componets/Boot.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Desktop from './componets/Desktop.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
            <Routes>
                <Route path="/boot" element={<Boot />} />

        <Route path="/" element={<Desktop />} />
        </Routes>
        </BrowserRouter>
  </React.StrictMode>,
)