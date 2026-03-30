import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface AuthProps {
  initialMode?: 'signin' | 'signup';
}

const WAIVER_VERSION = '1.0_Feb_2026';

export default function Auth({ initialMode = 'signup' }: AuthProps) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
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

  const { signIn, signUp } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          const { data: existingAcceptance } = await supabase
            .from('user_legal_acceptance')
            .select('id')
            .eq('user_id', data.user.id)
            .maybeSingle();

          if (!existingAcceptance) {
            await supabase.from('user_legal_acceptance').insert({
              user_id: data.user.id,
              waiver_version: WAIVER_VERSION,
            });
          }

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
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    window.scrollTo(0, 0);
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
                  className="w-full transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <div className="button-text w-full py-3 bg-[#B11226] text-white font-bold rounded">
                      LOADING...
                    </div>
                  ) : (
                    <img
                      src="https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20sign%20in.png"
                      alt="Sign In"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto"
                      style={{ width: '100%', objectFit: 'contain', display: 'block' }}
                    />
                  )}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2E2E2E]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-black text-[#A0A0A0]">New to CombatCraft?</span>
                </div>
              </div>

              <button
                onClick={toggleMode}
                className="w-full transition-transform hover:scale-105"
              >
                <img
                  src="https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/cerate%20account%20new.png"
                  alt="Create Account"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto"
                  style={{ width: '100%', objectFit: 'contain', display: 'block' }}
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
                    onClick={() => navigate('/terms-of-service')}
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
                    onClick={() => navigate('/disclaimer')}
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
                  onClick={() => navigate('/privacy-policy')}
                  className="text-[#B11226] hover:underline font-bold"
                >
                  Privacy Policy
                </button>
              </p>

              <button
                type="submit"
                disabled={loading || !allCheckboxesAccepted}
                className="w-full transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="button-text w-full py-3 bg-[#B11226] text-white font-bold rounded">
                    CREATING...
                  </div>
                ) : (
                  <img
                    src="https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/cerate%20account%20new.png"
                    alt="Create Account"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                    style={{ width: '100%', objectFit: 'contain', display: 'block' }}
                  />
                )}
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
