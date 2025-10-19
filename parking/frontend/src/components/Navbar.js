import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Car, LogOut, User, LayoutDashboard } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Car size={32} />
          <span>ParkLink</span>
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to={isAdmin ? '/admin/dashboard' : '/dashboard'} className="nav-link">
                <LayoutDashboard size={20} />
                {t('nav.dashboard')}
              </Link>
              
              {!isAdmin && (
                <>
                  <Link to="/find-parking" className="nav-link">
                    {t('nav.findParking')}
                  </Link>
                  <Link to="/my-bookings" className="nav-link">
                    {t('nav.myBookings')}
                  </Link>
                </>
              )}
              
              {isAdmin && (
                <Link to="/admin/manage-slots" className="nav-link">
                  {t('nav.manageSlots')}
                </Link>
              )}
              
              <div className="nav-user">
                <User size={20} />
                <span>{user?.name}</span>
              </div>
              
              <LanguageSwitcher />
              
              <button onClick={handleLogout} className="btn btn-logout">
                <LogOut size={20} />
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <LanguageSwitcher />
              
              <Link to="/login" className="nav-link">
                {t('nav.login')}
              </Link>
              <Link to="/register" className="btn btn-primary">
                {t('home.getStarted')}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
