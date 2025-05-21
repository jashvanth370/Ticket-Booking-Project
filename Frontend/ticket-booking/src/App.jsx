import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import BookingPage from './pages/BookingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';



function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/bookings" element={<BookingPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}


export default App
