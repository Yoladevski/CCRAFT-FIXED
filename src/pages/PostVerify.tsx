import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import LoadingScreen from '../components/LoadingScreen';

const WAIVER_VERSION = "1.0_Jan_2026";

export default function PostVerify() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showWaiver, setShowWaiver] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    checkWaiverStatus();
  }, [user]);

  const checkWaiverStatus = async () => {
    if (!user) {
      navigate('/auth', { replace: true });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_legal_acceptance')
        .select('id')
        .eq('user_id', user.id)
        .eq('waiver_version', WAIVER_VERSION)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        navigate('/create-profile', { replace: true });
      } else {
        setShowWaiver(true);
      }
    } catch (error) {
      console.error('Error checking waiver status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptWaiver = async () => {
    if (!user || !accepted) return;

    setAccepting(true);
    try {
      const { error } = await supabase
        .from('user_legal_acceptance')
        .insert({
          user_id: user.id,
          waiver_version: WAIVER_VERSION,
          accepted_at: new Date().toISOString()
        });

      if (error) throw error;

      navigate('/create-profile');
    } catch (error) {
      console.error('Error accepting waiver:', error);
      alert('Failed to accept waiver. Please try again.');
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!showWaiver) {
    return <LoadingScreen />;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      <div className="w-full max-w-4xl bg-neutral-900 rounded-lg shadow-2xl border border-red-600/30 max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        <div className="p-3 sm:p-4 md:p-6 border-b border-red-600/30">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-500 text-center">
            WAIVER & LEGAL AGREEMENT
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-neutral-400 text-center mt-1 sm:mt-2">
            Version {WAIVER_VERSION}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
          <div className="prose prose-invert max-w-none">
            <section className="space-y-2 sm:space-y-3">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-red-400">ASSUMPTION OF RISK</h2>
              <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed">
                I acknowledge that martial arts training, including but not limited to boxing, Muay Thai, karate, judo,
                and other combat sports, involves inherent risks of injury. These risks include, but are not limited to:
                sprains, strains, fractures, concussions, and other serious injuries that may result in temporary or
                permanent disability, or death.
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-red-400">MEDICAL CLEARANCE</h2>
              <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed">
                I confirm that I am in good physical condition and have no medical conditions that would prevent me
                from participating in martial arts training. I agree to consult with a physician before beginning any
                new training program.
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-red-400">RELEASE OF LIABILITY</h2>
              <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed">
                I hereby release, waive, discharge, and covenant not to sue FightCraft, its owners, instructors,
                employees, agents, and affiliates from any and all liability, claims, demands, actions, and causes
                of action whatsoever arising out of or related to any loss, damage, or injury that may be sustained
                by me while participating in training or using the platform.
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-red-400">INDEMNIFICATION</h2>
              <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed">
                I agree to indemnify and hold harmless FightCraft from any loss, liability, damage, or costs that
                may occur due to my participation in martial arts training, whether caused by the negligence of
                FightCraft or otherwise.
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-red-400">CONSENT TO TREATMENT</h2>
              <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed">
                In the event of an injury, I consent to receive medical treatment deemed necessary by medical
                professionals. I understand that I am responsible for all costs associated with such treatment.
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-red-400">ACKNOWLEDGMENT OF UNDERSTANDING</h2>
              <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed">
                I have read this waiver and release of liability, fully understand its terms, and understand that
                I am giving up substantial rights, including my right to sue. I acknowledge that I am accepting
                this agreement freely and voluntarily, and intend my acceptance to be a complete and unconditional
                release of all liability to the greatest extent allowed by law.
              </p>
            </section>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-6 border-t border-red-600/30 space-y-3 sm:space-y-4">
          <label className="flex items-start space-x-2 sm:space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-red-600 bg-neutral-800 checked:bg-red-600 checked:border-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-900 cursor-pointer flex-shrink-0"
            />
            <span className="text-xs sm:text-sm md:text-base text-neutral-300 group-hover:text-white transition-colors leading-relaxed">
              I have read and agree to the terms of this waiver. I understand that by checking this box and
              clicking "Accept & Continue", I am legally bound by this agreement.
            </span>
          </label>

          <button
            onClick={handleAcceptWaiver}
            disabled={!accepted || accepting}
            className="w-full py-3 sm:py-3.5 md:py-4 px-4 sm:px-6 bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base md:text-lg rounded-lg transition-colors shadow-lg disabled:shadow-none"
          >
            {accepting ? 'Processing...' : 'Accept & Continue'}
          </button>

          <p className="text-[10px] sm:text-xs md:text-sm text-neutral-500 text-center">
            You must accept this waiver to continue using FightCraft
          </p>
        </div>
      </div>
    </div>
  );
}
