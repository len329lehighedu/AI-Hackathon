
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase().endsWith('@lehigh.edu')) {
      setError('');
      onLogin(email.trim().toLowerCase());
    } else {
      setError('Please use a valid lehigh.edu email address.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-bg">
      <div className="w-full max-w-md p-8 space-y-8 bg-brand-surface rounded-lg shadow-xl border border-brand-secondary">
        <div className="flex flex-col items-center">
          <img src="https://image2url.com/images/1763230135301-08ad8a08-f02f-4835-92a9-14af60f15d53.png" alt="Lehigh University Logo" className="h-16 w-auto mb-4" />
          <h1 className="text-3xl font-bold text-center text-brand-text">Lehigh Course Planner</h1>
          <p className="mt-2 text-center text-brand-accent">Please log in with your Lehigh email.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-brand-secondary bg-white text-brand-text placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
              placeholder="Email address (e.g., hawk@lehigh.edu)"
            />
          </div>

          {error && <p className="text-sm text-center text-lehigh-red">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;