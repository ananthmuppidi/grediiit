import React from 'react';
import './index.css';
import RegisterLogin from './Components/Auth';
import Navbar from "./Components/Nav";
import { Outlet } from "react-router-dom";


function App() {
    return (

            <div className="App">
                <Navbar />
                <Outlet />
            </div>
    
    );
}

export default App;
