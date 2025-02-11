import './App.css';
import Home from './Components/Home/Home';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Event from './Components/Event/Event';
import Contactus from './Components/Contact Us/Contactus';
import Aboutus from './Components/About Us/Aboutus';
import Notification from './Components/Notification/Notification';
import Dashboard from './Components/Dashboard/dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventDetails from './Components/Event/EventDetails';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/event" element={<Event/>} />
          <Route path="/events/:id" element={<EventDetails/>} />
          <Route path="/contact" element={<Contactus/>} />
          <Route path="/about" element={<Aboutus/>} />
          <Route path="/notification" element={<Notification/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
  );
}

export default App;
