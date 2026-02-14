import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ShimmerButton } from '../components/ui/ShimmerButton';

interface AuthProps {
  onNavigate: (page: string) => void;
}

export default function Auth({ onNavigate }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        setError(error.message);
      } else {
        window.scrollTo(0, 0);
        onNavigate('Account');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1A1A1A] rounded-lg border border-[#2E2E2E] p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-[#B11226]/20 border border-[#B11226] rounded text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <ShimmerButton
              type="submit"
              disabled={loading}
              className="w-full py-4 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'LOADING...' : isSignUp ? 'SIGN UP' : 'SIGN IN'}
            </ShimmerButton>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-[#A0A0A0] hover:text-white transition-colors text-body"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
