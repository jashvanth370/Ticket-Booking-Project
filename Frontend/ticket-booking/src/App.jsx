import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/user/HomePage';
import EventPage from './pages/event/EventPage';
import BookingPage from './pages/user/BookingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import '../src/styles/App.css'
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import WishlistPage from './pages/Wishlist';
import ReviewPage from './pages/ReviewPage';
import AddEventPage from './pages/admin/AddEventPage';
import EventDetailsPage from './pages/EventDetailsPage';
import MyEventsPage from './pages/event/MyEventsPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { ToastContainer } from 'react-toastify';

import AdminLoginPage from '../src/pages/admin/AdminLoginPage'
import 'react-toastify/dist/ReactToastify.css';
import UserProfilePage from './pages/user/UserProfilePage';



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
            <Route path="/addEvent" element={<AddEventPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/my-events" element={<MyEventsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* admin login */}
            <Route path="/login/admin" element={<AdminLoginPage role="ADMIN" />} />
            <Route path="/login/user" element={<LoginPage role="USER" />} />
            {/* <Route path="/login/admin" element={<AdminLoginPage role="ADMIN" />} /> */}

            {/* <Route path="/admin/dashboard" element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } /> */}

            <Route path='/user-profile' element={<UserProfilePage />} />



          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" />

      </div>
    </Router>
  )
}


export default App
