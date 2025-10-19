import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Car, MapPin, CreditCard, Clock, Shield, Smartphone } from 'lucide-react';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div className="home">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('home.title')}
            <span className="gradient-text"> {t('home.titleHighlight')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('home.subtitle')}
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-large">
              {t('home.getStarted')}
            </Link>
            <Link to="/login" className="btn btn-secondary btn-large">
              {t('home.signIn')}
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card">
            <Car size={48} color="#667eea" />
            <h3>Real-time Updates</h3>
            <p>Live slot availability</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">{t('home.whyChoose')}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Clock size={40} />
            </div>
            <h3>{t('feature.realtime')}</h3>
            <p>{t('feature.realtimeDesc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <MapPin size={40} />
            </div>
            <h3>{t('feature.navigation')}</h3>
            <p>{t('feature.navigationDesc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <CreditCard size={40} />
            </div>
            <h3>{t('feature.payment')}</h3>
            <p>{t('feature.paymentDesc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={40} />
            </div>
            <h3>{t('feature.pricing')}</h3>
            <p>{t('feature.pricingDesc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Smartphone size={40} />
            </div>
            <h3>{t('feature.booking')}</h3>
            <p>{t('feature.bookingDesc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Car size={40} />
            </div>
            <h3>{t('feature.management')}</h3>
            <p>{t('feature.managementDesc')}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">{t('home.howItWorks')}</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>{t('step.search')}</h3>
            <p>{t('step.searchDesc')}</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>{t('step.book')}</h3>
            <p>{t('step.bookDesc')}</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>{t('step.navigate')}</h3>
            <p>{t('step.navigateDesc')}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>{t('home.ready')}</h2>
        <p>{t('home.joinNow')}</p>
        <Link to="/register" className="btn btn-primary btn-large">
          {t('home.startParking')}
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ParkLink</h3>
            <p>Smart parking solution for modern cities</p>
          </div>
          <div className="footer-section">
            <h4>For Users</h4>
            <ul>
              <li>Find Parking</li>
              <li>Book Slots</li>
              <li>Payment Options</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>For Owners</h4>
            <ul>
              <li>List Your Parking</li>
              <li>Manage Slots</li>
              <li>Analytics Dashboard</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 ParkLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
