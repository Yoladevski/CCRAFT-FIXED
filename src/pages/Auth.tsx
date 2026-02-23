import { useState, lazy, Suspense } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BGPattern } from '../components/ui/bg-pattern';
import { supabase } from '../lib/supabase';

const Turnstile = lazy(() => import('@marsidev/react-turnstile'));

interface AuthProps {
  onNavigate: (page: string) => void;
}

const WAIVER_VERSION = '1.0_Feb_2026';

export default function Auth({ onNavigate }: AuthProps) {

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [waiverAccepted, setWaiverAccepted] = useState(false);
  const [liabilityAccepted, setLiabilityAccepted] = useState(false);

  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    setError('');

    if (isSignUp) {
      if (!ageConfirmed || !termsAccepted || !waiverAccepted || !liabilityAccepted) {
        setError('Please complete all agreements');
        return;
      }
      sessionStorage.setItem('pendingGoogleSignUp', 'true');
      sessionStorage.setItem('waiverVersion', WAIVER_VERSION);
    }

    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {

      if (!captchaToken) {
        setError('Please complete CAPTCHA');
        return;
      }

      if (!ageConfirmed || !termsAccepted || !waiverAccepted || !liabilityAccepted) {
        setError('Please complete all agreements');
        return;
      }
    }

    setLoading(true);

    try {

      if (isSignUp) {

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { captchaToken }
        });

        if (signUpError) {
          setError(signUpError.message);
        }

        else if (data?.user) {

          await supabase.from('user_legal_acceptance').insert({
            user_id: data.user.id,
            waiver_version: WAIVER_VERSION
          });

          onNavigate('Account');
        }

      }

      else {

        const { error: signInError } = await signIn(email, password);
        if (signInError) setError(signInError.message);
        else onNavigate('Dashboard');

      }

    }

    catch (err: any) {
      setError(err.message);
    }

    finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setCaptchaToken(null);
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

<h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
{isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
</h2>

{error && (
<div className="mb-4 p-4 bg-[#B11226]/20 border border-[#B11226] rounded text-center">
{error}
</div>
)}

<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
placeholder="your@email.com"
className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded"
/>

<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
minLength={6}
placeholder="••••••••"
className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded"
/>

{isSignUp && (

<Suspense fallback={null}>
<Turnstile
siteKey="0x4AAAAAACgutK8_-6I19L6o_P1Wt7Wje3k"
onSuccess={(token)=>setCaptchaToken(token)}
/>
</Suspense>

)}

<button
type="submit"
disabled={loading}
className="w-full py-3 sm:py-4 bg-[#B11226] text-white font-bold rounded"
>
{loading ? 'LOADING...' : isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
</button>

</form>

<button
onClick={handleGoogleSignIn}
className="w-full py-3 mt-4 bg-white text-black rounded"
>
{isSignUp ? 'SIGN UP WITH GOOGLE' : 'SIGN IN WITH GOOGLE'}
</button>

<button
onClick={toggleMode}
className="mt-6 underline text-sm"
>
{isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
</button>

</div>
</div>
</div>
);
}