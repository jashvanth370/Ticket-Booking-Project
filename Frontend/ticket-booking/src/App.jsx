import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import BookingPage from './pages/BookingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import '../src/styles/App.css'
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import WishlistPage from './pages/Wishlist';
import ReviewPage from './pages/ReviewPage';



function App() {
  return (

    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}


export default App
