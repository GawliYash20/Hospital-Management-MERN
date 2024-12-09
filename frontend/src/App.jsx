import React from 'react';
import {
    BrowserRouter as Router,
    Routes, Route, NavLink
} from 'react-router-dom';
import Appointments from './components/Appointments';
import Doctors from './components/Doctors';
import Patients from './components/Patients';
import './App.css';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to="/appointments"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Appointments
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/doctors"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Doctors
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/patients"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Patients
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};


const App = () => {
    return (
        <Router>
            <div className="container">
                <h1 style={{ color: "green" }}>
                    Hospital Management App
                </h1>
                <Navigation />
                <Routes>
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/" element={<Appointments />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/patients" element={<Patients />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
