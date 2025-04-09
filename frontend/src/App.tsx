import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetailPage from './pages/MovieDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminPage from './pages/AdminPage';
import MoviePage from './pages/MoviePage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route element={<ProtectedRoute requiredRole="Administrator" />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="/moviedetails/:id" element={<MovieDetailPage />} />
          <Route path="/moviepage" element={<MoviePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
