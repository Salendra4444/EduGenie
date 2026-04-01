import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SplitAuth.css';

function Signup() {
  useEffect(() => {
    document.title = 'Signup';
  }, []);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const onOtpChange = (e) => {
    setOtp(e.target.value);
    setError('');
    setSuccess('');
  };

  const onSubmitSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Check password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('OTP sent to your email!');
        setStep(2);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Signup successful! You can now login.');
        alert('Signup successful! You can now login.');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(data.message || 'Verification failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('A new OTP has been sent to your email!');
      } else {
        setError(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-page-wrapper">
      <div className="split-container">
        
        {/* Gradient Panel (Left on Desktop) */}
        <div className="split-gradient-panel">
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <Link to="/login" className="split-link">
            <button type="button" className="split-btn-outline">SIGN IN</button>
          </Link>
        </div>

        {/* Form Panel (Right on Desktop) */}
        <div className="split-form-panel">
          <h2>{step === 1 ? 'Create Account' : 'Verify Email'}</h2>
          
          {step === 2 && <p className="sub-text">An email with the code was sent to {formData.email}</p>}
          
          {error && <div className="error-badge">{error}</div>}
          {success && <div className="success-badge">{success}</div>}
          
          {step === 1 ? (
            <form onSubmit={onSubmitSignup}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="Password (min 6 chars)"
              />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                required
                placeholder="Confirm password"
              />
              <button type="submit" className="split-btn-primary" disabled={loading}>
                {loading ? 'WAIT...' : 'SIGN UP'}
              </button>
            </form>
          ) : (
            <form onSubmit={onSubmitVerify}>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={onOtpChange}
                required
                placeholder="Enter 4-digit OTP"
                style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '18px', fontWeight: 'bold' }}
              />
              <button type="submit" className="split-btn-primary" disabled={loading}>
                {loading ? 'WAIT...' : 'VERIFY OTP'}
              </button>
              
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleResendOtp(); }} className="forgot-password" style={{ color: '#ff4b2b', fontWeight: 'bold', margin: '5px 0' }}>
                  Resend OTP
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setStep(1); }} className="forgot-password" style={{ margin: '5px 0' }}>
                  Back to Sign Up
                </a>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

export default Signup;
