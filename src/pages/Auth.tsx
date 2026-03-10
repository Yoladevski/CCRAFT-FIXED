import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface AuthProps {
  onNavigate: (page: string) => void;
}

const WAIVER_VERSION = '1.0_Feb_2026';

export default function Auth({ onNavigate }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    setError('');

    if (isSignUp) {
      if (!termsAccepted) {
        setError('You must accept the Terms of Service');
        return;
      }
      if (!disclaimerAccepted) {
        setError('You must acknowledge the Training Risk Disclaimer');
        return;
      }
      if (!ageConfirmed) {
        setError('You must confirm that you are 16 years or older');
        return;
      }

      sessionStorage.setItem('pendingGoogleSignUp', 'true');
      sessionStorage.setItem('waiverVersion', WAIVER_VERSION);
    }

    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!termsAccepted) {
        setError('You must accept the Terms of Service');
        return;
      }
      if (!disclaimerAccepted) {
        setError('You must acknowledge the Training Risk Disclaimer');
        return;
      }
      if (!ageConfirmed) {
        setError('You must confirm that you are 16 years or older');
        return;
      }
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await signUp(email, password);

        if (signUpError) {
          setError(signUpError.message);
        } else if (data?.user) {
          await supabase.from('user_legal_acceptance').insert({
            user_id: data.user.id,
            waiver_version: WAIVER_VERSION,
          });

          setSuccessMessage('Account created successfully! Please check your email to verify your account.');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setTermsAccepted(false);
          setDisclaimerAccepted(false);
          setAgeConfirmed(false);
          window.scrollTo(0, 0);
        }
      } else {
        const { error: signInError } = await signIn(email, password);

        if (signInError) {
          setError(signInError.message);
        } else {
          window.scrollTo(0, 0);
          onNavigate('Dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });
      if (error) throw error;
      setSuccessMessage('Password reset email sent! Check your inbox.');
      setEmail('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setIsForgotPassword(false);
    setError('');
    setSuccessMessage('');
    setTermsAccepted(false);
    setDisclaimerAccepted(false);
    setAgeConfirmed(false);
    setConfirmPassword('');
  };

  const allCheckboxesAccepted = termsAccepted && disclaimerAccepted && ageConfirmed;

  if (isForgotPassword) {
    return (
      <div className="min-h-screen flex items-start justify-center px-4 pt-0 pb-2">
        <div className="w-full max-w-[420px]">
          <div className="bg-black rounded-lg border border-[#2E2E2E] p-4 sm:p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-center mb-4 bg-black rounded-lg">
                <img
                  src="https://api.combatcraft.co.uk/storage/v1/object/public/images/logo%20small.PNG"
                  alt="CombatCraft"
                  className="h-52 w-auto object-contain"
                />
              </div>

              <h2 className="cc-outline-text text-2xl font-bold text-center mb-6">
                RESET PASSWORD
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-[#B11226]/20 border border-[#B11226] rounded text-center text-sm">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded text-center text-sm text-green-400">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#A0A0A0] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="button-text w-full py-3 bg-[#B11226] text-white font-bold rounded hover:bg-[#8B0E1C] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'SENDING...' : 'SEND RESET EMAIL'}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(false); setError(''); setSuccessMessage(''); }}
                    className="text-[#A0A0A0] hover:text-white transition-colors text-sm underline hover:no-underline"
                  >
                    Back to sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isSignUp) {
    return (
      <div className="min-h-screen flex items-start justify-center px-4 pt-0 pb-2">
        <div className="w-full max-w-[420px]">
          <div className="bg-black rounded-lg border border-[#2E2E2E] p-4 sm:p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-center mb-4 bg-black rounded-lg">
                <img
                  src="https://api.combatcraft.co.uk/storage/v1/object/public/images/logo%20small.PNG"
                  alt="CombatCraft"
                  className="h-52 w-auto object-contain"
                />
              </div>

              <p className="text-[#A0A0A0] text-sm text-center mb-4">
                Train with purpose.<br />
                Progress with structure.
              </p>

              <h2 className="cc-outline-text text-2xl font-bold text-center mb-6">
                SIGN IN
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-[#B11226]/20 border border-[#B11226] rounded text-center text-sm">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded text-center text-sm text-green-400">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#A0A0A0] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm text-[#A0A0A0]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => { setIsForgotPassword(true); setError(''); setSuccessMessage(''); }}
                      className="text-xs text-[#B11226] hover:text-white transition-colors underline hover:no-underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="button-text w-full py-3 bg-[#B11226] text-white font-bold rounded hover:bg-[#8B0E1C] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'LOADING...' : 'SIGN IN'}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2E2E2E]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-black text-[#A0A0A0]">OR</span>
                </div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="button-text w-full py-3 bg-[#B11226] text-white font-bold rounded hover:bg-[#8B0E1C] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                style={{ WebkitTextStroke: '0px', textStroke: '0px' }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="white"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="white"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="white"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="white"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                SIGN IN WITH GOOGLE
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2E2E2E]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-black text-[#A0A0A0]">OR</span>
                </div>
              </div>

              <button
                onClick={toggleMode}
                className="w-full transition-transform hover:scale-105"
              >
                <img
                  src="https://api.combatcraft.co.uk/storage/v1/object/public/images/create%20account.png"
                  alt="Create Account"
                  className="w-full h-auto"
                />
              </button>

              <p className="text-[#606060] text-xs text-center mt-4">
                Your data is protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center px-4 pt-0 pb-2">
      <div className="w-full max-w-[420px]">
        <div className="bg-black rounded-lg border border-[#2E2E2E] p-4 sm:p-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-center mb-4 bg-black rounded-lg">
              <img
                src="https://api.combatcraft.co.uk/storage/v1/object/public/images/logo%20small.PNG"
                alt="CombatCraft"
                className="h-52 w-auto object-contain"
              />
            </div>

            <p className="text-[#A0A0A0] text-sm text-center mb-4">
              Train with purpose.<br />
              Progress with structure.
            </p>

            <h2 className="cc-outline-text text-2xl font-bold text-center mb-6">
              CREATE ACCOUNT
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-[#B11226]/20 border border-[#B11226] rounded text-center text-sm">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded text-center text-sm text-green-400">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#A0A0A0] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm text-[#A0A0A0] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm text-[#A0A0A0] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-3 pt-2 flex flex-col items-center">
                <label className="flex flex-col items-center cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 rounded border-[#2E2E2E] bg-[#1A1A1A] text-[#B11226] focus:ring-[#B11226] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                      required
                    />
                    <span className="text-xs text-[#A0A0A0] group-hover:text-white transition-colors">
                      I agree to
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('TermsOfService')}
                    className="text-xs text-[#B11226] hover:underline font-bold mt-1"
                  >
                    Terms of Service
                  </button>
                </label>

                <label className="flex flex-col items-center cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={disclaimerAccepted}
                      onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                      className="w-4 h-4 rounded border-[#2E2E2E] bg-[#1A1A1A] text-[#B11226] focus:ring-[#B11226] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                      required
                    />
                    <span className="text-xs text-[#A0A0A0] group-hover:text-white transition-colors">
                      I acknowledge the
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('Disclaimer')}
                    className="text-xs text-[#B11226] hover:underline font-bold mt-1"
                  >
                    Training Risk Disclaimer
                  </button>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    className="w-4 h-4 rounded border-[#2E2E2E] bg-[#1A1A1A] text-[#B11226] focus:ring-[#B11226] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                    required
                  />
                  <span className="text-xs text-[#A0A0A0] group-hover:text-white transition-colors">
                    I confirm I am 16 years or older
                  </span>
                </label>
              </div>

              <p className="text-xs text-[#A0A0A0] text-center pt-2">
                By creating an account I also agree to the CombatCraft{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('PrivacyPolicy')}
                  className="text-[#B11226] hover:underline font-bold"
                >
                  Privacy Policy
                </button>
              </p>

              <button
                type="submit"
                disabled={loading || !allCheckboxesAccepted}
                className="button-text w-full py-3 bg-[#B11226] text-white font-bold rounded hover:bg-[#8B0E1C] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2E2E2E]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-[#A0A0A0]">OR</span>
              </div>
            </div>

            <button
              onClick={toggleMode}
              className="w-full py-3 border border-[#2E2E2E] text-white font-bold rounded hover:border-[#B11226] hover:bg-[#B11226]/10 transition-all"
              style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em' }}
            >
              SIGN IN
            </button>

            <p className="text-[#606060] text-xs text-center mt-4">
              Your data is protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
