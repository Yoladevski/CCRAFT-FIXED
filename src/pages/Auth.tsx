import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BGPattern } from '../components/ui/bg-pattern';
import { supabase } from '../lib/supabase';
import { PillButton } from '../components/PillButton';

interface AuthProps {
  onNavigate: (page: string) => void;
}

const WAIVER_VERSION = '1.0_Feb_2026';

export default function Auth({ onNavigate }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Sign-up specific state
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [waiverAccepted, setWaiverAccepted] = useState(false);
  const [liabilityAccepted, setLiabilityAccepted] = useState(false);

  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    setError('');

    if (isSignUp) {
      if (!ageConfirmed) {
        setError('You must confirm that you are 16 years or older');
        return;
      }
      if (!termsAccepted) {
        setError('You must accept the Terms of Service');
        return;
      }
      if (!waiverAccepted) {
        setError('You must accept the Training Waiver');
        return;
      }
      if (!liabilityAccepted) {
        setError('You must accept the Liability Disclaimer');
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

    // Validate sign-up requirements
    if (isSignUp) {
      if (!ageConfirmed) {
        setError('You must confirm that you are 16 years or older');
        return;
      }
      if (!termsAccepted) {
        setError('You must accept the Terms of Service');
        return;
      }
      if (!waiverAccepted) {
        setError('You must accept the Training Waiver');
        return;
      }
      if (!liabilityAccepted) {
        setError('You must accept the Liability Disclaimer');
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
          // Record legal acceptance
          await supabase.from('user_legal_acceptance').insert({
            user_id: data.user.id,
            waiver_version: WAIVER_VERSION,
          });

          // Show success message
          setSuccessMessage('Account created successfully! Please check your email to verify your account.');
          setEmail('');
          setPassword('');
          setAgeConfirmed(false);
          setTermsAccepted(false);
          setWaiverAccepted(false);
          setLiabilityAccepted(false);
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

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccessMessage('');
    setAgeConfirmed(false);
    setTermsAccepted(false);
    setWaiverAccepted(false);
    setLiabilityAccepted(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative -mt-20 pt-20">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-[#1A1A1A] rounded-lg border border-[#2E2E2E] p-6 sm:p-8 relative overflow-hidden">
          {/* Background image with opacity - only visible in the card background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'url(https://i.postimg.cc/sx1hGTSM/backround-email.jpg)',
              backgroundSize: '120%'
            }}
          />

          <div className="relative z-10">
            <h2 className="cc-outline-text text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
              {isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
            </h2>

          {error && (
            <div className="mb-4 p-4 bg-[#B11226]/20 border border-[#B11226] rounded text-center text-sm sm:text-base">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-4 bg-green-500/20 border border-green-500 rounded text-center text-sm sm:text-base text-green-400">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm text-[#A0A0A0] mb-2 text-body">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors text-body"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm text-[#A0A0A0] mb-2 text-body">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors text-body"
                placeholder="••••••••"
              />
            </div>

            {isSignUp && (
              <div className="space-y-4 border-t border-[#2E2E2E] pt-6 mt-6">
                <div className="bg-[#0E0E0E] border border-[#2E2E2E] rounded p-4 sm:p-6 space-y-4">
                  <h3 className="cc-outline-text text-lg sm:text-xl font-bold text-[#B11226] mb-4">
                    REQUIRED AGREEMENTS
                  </h3>

                  {/* Age Confirmation */}
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={ageConfirmed}
                      onChange={(e) => setAgeConfirmed(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-[#2E2E2E] bg-[#1A1A1A] text-[#B11226] focus:ring-[#B11226] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                      required
                    />
                    <span className="text-sm sm:text-base text-[#E0E0E0] group-hover:text-white transition-colors">
                      I confirm that I am <span className="font-bold text-[#B11226]">16 years of age or older</span>
                    </span>
                  </label>

                  {/* Terms of Service */}
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-[#2E2E2E] bg-[#1A1A1A] text-[#B11226] focus:ring-[#B11226] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                      required
                    />
                    <span className="text-sm sm:text-base text-[#E0E0E0] group-hover:text-white transition-colors">
                      I have read and agree to the{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('TermsOfService')}
                        className="text-[#B11226] hover:underline font-semibold"
                      >
                        Terms of Service
                      </button>
                    </span>
                  </label>

                  {/* Training Waiver */}
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={waiverAccepted}
                      onChange={(e) => setWaiverAccepted(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-[#2E2E2E] bg-[#1A1A1A] text-[#B11226] focus:ring-[#B11226] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                      required
                    />
                    <div className="text-sm sm:text-base text-[#E0E0E0] group-hover:text-white transition-colors">
                      <p className="mb-2">
                        <span className="font-bold text-white">TRAINING WAIVER:</span> I understand that combat sports training involves physical risk including but not limited to: bruising, cuts, sprains, fractures, concussions, and other serious injuries.
                      </p>
                      <p className="text-xs sm:text-sm text-[#A0A0A0]">
                        I voluntarily assume all risks associated with training and agree to follow all safety guidelines.
                      </p>
                    </div>
                  </label>

                  {/* Liability Disclaimer */}
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={liabilityAccepted}
                      onChange={(e) => setLiabilityAccepted(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-[#2E2E2E] bg-[#1A1A1A] text-[#B11226] focus:ring-[#B11226] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                      required
                    />
                    <div className="text-sm sm:text-base text-[#E0E0E0] group-hover:text-white transition-colors">
                      <p className="mb-2">
                        <span className="font-bold text-white">LIABILITY RELEASE:</span> I release COMBATCRAFT, its owners, and affiliates from any liability for injuries or damages sustained during training.
                      </p>
                      <p className="text-xs sm:text-sm text-[#A0A0A0]">
                        COMBATCRAFT provides educational content only and does not replace professional medical advice or coaching.
                      </p>
                    </div>
                  </label>

                  {/* Additional Disclaimer */}
                  <div className="bg-[#B11226]/10 border border-[#B11226] rounded p-3 sm:p-4 mt-4">
                    <p className="text-xs sm:text-sm text-[#E0E0E0] leading-relaxed">
                      <span className="font-bold text-[#B11226]">IMPORTANT:</span> Always consult with a qualified healthcare professional before beginning any new training program. Train under the supervision of certified instructors. Use proper protective equipment at all times.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <PillButton
              type="submit"
              disabled={loading || (isSignUp && (!ageConfirmed || !termsAccepted || !waiverAccepted || !liabilityAccepted))}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {loading ? 'LOADING...' : isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
            </PillButton>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2E2E2E]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1A1A1A] text-[#A0A0A0]">OR</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading || (isSignUp && (!ageConfirmed || !termsAccepted || !waiverAccepted || !liabilityAccepted))}
            className="button-text w-full py-3 sm:py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-lg shadow-black/20"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isSignUp ? 'SIGN UP WITH GOOGLE' : 'SIGN IN WITH GOOGLE'}
          </button>

          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              className="text-[#A0A0A0] hover:text-white transition-colors text-sm sm:text-base text-body underline hover:no-underline"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
