import { useEffect, useState, useRef } from 'react';
import { LogOut, User, Camera, Copy, Check, Eye, EyeOff, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Database } from '../lib/supabase';
import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AccountProps {
  onBack: () => void;
}

export default function Account({ onBack }: AccountProps) {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'settings'>('profile');

  const [fullName, setFullName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [preferredDiscipline, setPreferredDiscipline] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [uploadingPicture, setUploadingPicture] = useState(false);

  const [newEmail, setNewEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        setProfile(data);
        setFullName(data.full_name || '');
        setWeight(data.weight?.toString() || '');
        setHeight(data.height?.toString() || '');
        setExperienceLevel(data.experience_level || 'Beginner');
        setPreferredDiscipline(data.preferred_discipline || '');
        setProfilePicture(data.profile_picture_url);

        // Check if this is first time setup
        if (!data.full_name) {
          setIsFirstTimeSetup(true);
        }
      }

      setLoading(false);
    }

    loadProfile();
  }, [user]);

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage('File size must be less than 5MB');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setMessage('Only JPEG, PNG, GIF, and WebP images are allowed');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setUploadingPicture(true);
    setMessage('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile.${fileExt}`;

      const { error: deleteError } = await supabase.storage
        .from('profile-pictures')
        .remove([fileName]);

      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_picture_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setProfilePicture(publicUrl);
      setMessage('Profile picture updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      console.error('Error uploading picture:', error);
      setMessage('Error uploading picture');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setUploadingPicture(false);
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (isFirstTimeSetup && !fullName.trim()) {
      setMessage('Please enter your full name to continue');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      // DIAGNOSTIC LOGGING
      console.log('[DIAGNOSTIC] user.id:', user?.id);

      const payload = {
        full_name: fullName || null,
        weight: weight ? parseInt(weight) : null,
        height: height ? parseInt(height) : null,
        experience_level: experienceLevel,
        preferred_discipline: preferredDiscipline || null,
      };

      console.log('[DIAGNOSTIC] Payload being sent:', JSON.stringify(payload, null, 2));
      console.log('[DIAGNOSTIC] Height value:', height);
      console.log('[DIAGNOSTIC] Height after parseInt:', height ? parseInt(height) : null);
      console.log('[DIAGNOSTIC] Weight value:', weight);
      console.log('[DIAGNOSTIC] Weight after parseInt:', weight ? parseInt(weight) : null);

      const { data, error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('user_id', user.id)
        .select(); // DIAGNOSTIC: Temporarily added to confirm rows updated

      console.log('[DIAGNOSTIC] Update response data:', data);
      console.log('[DIAGNOSTIC] Rows returned:', data?.length || 0);

      if (error) {
        console.error('[DIAGNOSTIC] Full Supabase error object:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
          fullError: error
        });
        throw error;
      }

      if (isFirstTimeSetup) {
        setMessage('Profile created successfully! Welcome to COMBATCRAFT');
        setIsFirstTimeSetup(false);
        setTimeout(() => {
          setMessage('');
          onBack();
        }, 2000);
      } else {
        setMessage('Profile updated successfully');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error: any) {
      console.error('[DIAGNOSTIC] Caught error:', error);
      setMessage('Error updating profile');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setMessage('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage('Error updating password');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyReferralLink = () => {
    if (!profile?.referral_code) return;

    const referralLink = `${window.location.origin}?ref=${profile.referral_code}`;
    navigator.clipboard.writeText(referralLink);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });

      if (error) throw error;

      setMessage('Email update initiated. Please check your new email for confirmation.');
      setNewEmail('');
      setTimeout(() => setMessage(''), 5000);
    } catch (error: any) {
      setMessage('Error updating email');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handlePhoneChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        phone: `${countryCode}${phoneNumber}`
      });

      if (error) throw error;

      setMessage('Phone number updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage('Error updating phone number');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase.rpc('delete_user_account');

      if (error) throw error;

      await signOut();
    } catch (error: any) {
      setMessage('Error deleting account. Please contact support.');
      setTimeout(() => setMessage(''), 3000);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]" style={{ fontFamily: 'Orbitron, sans-serif' }}>LOADING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-12 px-3 sm:px-4 relative -mt-20 pt-16 sm:pt-24 overflow-x-hidden">
      <div className="max-w-4xl mx-auto relative z-10 w-full box-border">
        <div className="mb-3 sm:mb-6">
          <BackButton onClick={onBack} />
        </div>
        <h1 className="cc-outline-text text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-12">
          {isFirstTimeSetup ? 'COMPLETE YOUR PROFILE' : 'ACCOUNT'}
        </h1>

        {isFirstTimeSetup && (
          <div className="mb-6 p-4 sm:p-6 bg-[#B11226]/10 border-2 border-[#B11226] rounded-lg text-center">
            <h2 className="cc-outline-text text-xl sm:text-2xl font-bold text-[#B11226] mb-2">
              WELCOME TO COMBATCRAFT!
            </h2>
            <p className="text-[#E0E0E0] text-sm sm:text-base" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
              Please fill in your name to complete your profile setup and start your training journey.
            </p>
          </div>
        )}

        {message && (
          <div className={`mb-6 p-4 rounded text-center ${
            message.includes('success') || message.includes('initiated') || message.includes('check your')
              ? 'bg-green-500/20 border border-green-500 text-green-500'
              : 'bg-[#B11226]/20 border border-[#B11226] text-[#B11226]'
          }`} style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
            {message}
          </div>
        )}

        <div
          className="bg-[#1A1A1A] border-2 border-[#B11226] mb-4 sm:mb-6 overflow-hidden rounded-lg mt-[65px] relative"
          style={{
            boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
          }}
        >
          <BGPattern variant="grid" fill="#1E1E1E" size={20} mask="fade-edges" />
          {/* Mobile Tab Navigation with Arrows */}
          <div className="flex sm:hidden border-b border-[#2E2E2E] items-center">
            <button
              onClick={() => {
                if (activeTab === 'security') setActiveTab('profile');
                else if (activeTab === 'settings') setActiveTab('security');
              }}
              disabled={activeTab === 'profile'}
              className={`p-3 transition-colors ${
                activeTab === 'profile'
                  ? 'text-[#2E2E2E] cursor-not-allowed'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 py-3 text-center">
              <span className="button-text text-sm font-bold text-white bg-[#B11226] px-4 py-1 rounded">
                {activeTab === 'profile' && 'PROFILE'}
                {activeTab === 'security' && 'SECURITY'}
                {activeTab === 'settings' && 'SETTINGS'}
              </span>
            </div>
            <button
              onClick={() => {
                if (activeTab === 'profile') setActiveTab('security');
                else if (activeTab === 'security') setActiveTab('settings');
              }}
              disabled={activeTab === 'settings'}
              className={`p-3 transition-colors ${
                activeTab === 'settings'
                  ? 'text-[#2E2E2E] cursor-not-allowed'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Desktop Tab Navigation */}
          <div className="hidden sm:flex border-b border-[#2E2E2E]">
            <button
              onClick={() => setActiveTab('profile')}
              className={`button-text flex-1 py-2 px-6 text-base font-bold transition-colors text-center whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-[#B11226] text-white'
                  : 'bg-transparent text-[#A0A0A0] hover:bg-[#2E2E2E]'
              }`}
            >
              PROFILE
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`button-text flex-1 py-2 px-6 text-base font-bold transition-colors text-center whitespace-nowrap ${
                activeTab === 'security'
                  ? 'bg-[#B11226] text-white'
                  : 'bg-transparent text-[#A0A0A0] hover:bg-[#2E2E2E]'
              }`}
            >
              SECURITY
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`button-text flex-1 py-2 px-6 text-base font-bold transition-colors text-center whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-[#B11226] text-white'
                  : 'bg-transparent text-[#A0A0A0] hover:bg-[#2E2E2E]'
              }`}
            >
              SETTINGS
            </button>
          </div>

          <div className="p-3 sm:p-6 md:p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col items-center gap-3 sm:gap-4 pb-6 sm:pb-8 border-b border-[#2E2E2E]">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 min-w-[96px] min-h-[96px] sm:min-w-[128px] sm:min-h-[128px] rounded-full border-4 border-[#B11226] overflow-hidden bg-[#2E2E2E] flex items-center justify-center">
                      {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" width="128" height="128" />
                      ) : (
                        <User size={48} className="text-[#A0A0A0] sm:hidden" />
                      )}
                      {!profilePicture && (
                        <User size={64} className="text-[#A0A0A0] hidden sm:block" />
                      )}
                    </div>
                    <button
                      onClick={handleProfilePictureClick}
                      disabled={uploadingPicture}
                      className="absolute bottom-0 right-0 bg-[#B11226] p-3 rounded-full hover:bg-[#8B0E1C] transition-colors disabled:opacity-50"
                      title="Upload profile picture"
                    >
                      <Camera size={20} className="text-white" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  {uploadingPicture && (
                    <p className="text-sm text-[#A0A0A0]" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                      UPLOADING...
                    </p>
                  )}
                  <p className="text-xs text-[#A0A0A0] text-center max-w-sm" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                    Click the camera icon to upload a profile picture (max 5MB)
                  </p>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                      FULL NAME {isFirstTimeSetup && <span className="text-[#B11226]">*</span>}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-4 py-3 bg-[#0E0E0E] border rounded text-white focus:outline-none transition-colors ${
                        isFirstTimeSetup
                          ? 'border-[#B11226] focus:border-[#B11226]'
                          : 'border-[#2E2E2E] focus:border-[#B11226]'
                      }`}
                      style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
                      placeholder="John Doe"
                      required={isFirstTimeSetup}
                    />
                    {isFirstTimeSetup && (
                      <p className="text-xs text-[#B11226] mt-1" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                        Required to continue
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-1 sm:mb-2" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                        WEIGHT (LBS)
                      </label>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors"
                        style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
                        placeholder="185"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-1 sm:mb-2" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                        HEIGHT (IN)
                      </label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors"
                        style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
                        placeholder="72"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-1 sm:mb-2" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                      EXPERIENCE LEVEL
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors"
                      style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
                    >
                      <option value="Beginner">BEGINNER</option>
                      <option value="Intermediate">INTERMEDIATE</option>
                      <option value="Advanced">ADVANCED</option>
                      <option value="Expert">EXPERT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-1 sm:mb-2" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                      PREFERRED DISCIPLINE
                    </label>
                    <select
                      value={preferredDiscipline}
                      onChange={(e) => setPreferredDiscipline(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors"
                      style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
                    >
                      <option value="">SELECT...</option>
                      <option value="Boxing">BOXING</option>
                      <option value="Muay Thai">MUAY THAI</option>
                      <option value="BJJ">BJJ</option>
                      <option value="Kickboxing">KICKBOXING</option>
                      <option value="Karate">KARATE</option>
                      <option value="Taekwondo">TAEKWONDO</option>
                      <option value="Judo">JUDO</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="button-text w-full py-3 sm:py-4 bg-[#B11226] text-white text-sm sm:text-base font-bold rounded hover:bg-[#8B0E1C] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'SAVING...' : 'SAVE PROFILE'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 sm:space-y-8">
                <div className="pb-6 sm:pb-8 border-b border-[#2E2E2E]">
                  <h2 className="cc-outline-text text-xl sm:text-2xl font-bold mb-4">
                    ACCOUNT INFO
                  </h2>
                  <div className="mt-4">
                    <div className="text-xs sm:text-sm text-[#A0A0A0] mb-1" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>CURRENT EMAIL</div>
                    <div className="text-sm sm:text-base break-all" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>{user?.email}</div>
                  </div>
                  {profile && (
                    <div className="grid grid-cols-2 gap-3 sm:gap-6 mt-6">
                      <div>
                        <div className="text-xs sm:text-sm text-[#A0A0A0] mb-1" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>RANK</div>
                        <div className="text-lg sm:text-2xl font-bold text-[#B11226]" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>{profile.rank}</div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-[#A0A0A0] mb-1" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>POWER LEVEL</div>
                        <div className="text-lg sm:text-2xl font-bold text-[#B11226]" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>{profile.power_level}</div>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleEmailChange} className="space-y-4 pb-6 sm:pb-8 border-b border-[#2E2E2E]">
                  <h2 className="cc-outline-text text-lg sm:text-xl font-bold">
                    CHANGE EMAIL
                  </h2>
                  <div>
                    <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                      NEW EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors"
                      style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
                      placeholder="newemail@example.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={saving || !newEmail}
                    className="button-text w-full py-3 sm:py-4 bg-[#B11226] text-white text-sm sm:text-base font-bold rounded hover:bg-[#8B0E1C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'UPDATING...' : 'UPDATE EMAIL'}
                  </button>
                </form>

                <form onSubmit={handlePhoneChange} className="space-y-4 pb-6 sm:pb-8 border-b border-[#2E2E2E]">
                  <h2 className="cc-outline-text text-lg sm:text-xl font-bold">
                    PHONE NUMBER
                  </h2>
                  <div>
                    <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                      PHONE NUMBER
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-28 sm:w-32 shrink-0 px-2 sm:px-3 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#B11226] transition-colors"
                        style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
                      >
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+64">🇳🇿 +64</option>
                        <option value="+353">🇮🇪 +353</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+34">🇪🇸 +34</option>
                        <option value="+39">🇮🇹 +39</option>
                        <option value="+31">🇳🇱 +31</option>
                        <option value="+32">🇧🇪 +32</option>
                        <option value="+41">🇨🇭 +41</option>
                        <option value="+43">🇦🇹 +43</option>
                        <option value="+46">🇸🇪 +46</option>
                        <option value="+47">🇳🇴 +47</option>
                        <option value="+45">🇩🇰 +45</option>
                        <option value="+358">🇫🇮 +358</option>
                        <option value="+351">🇵🇹 +351</option>
                        <option value="+30">🇬🇷 +30</option>
                        <option value="+48">🇵🇱 +48</option>
                        <option value="+420">🇨🇿 +420</option>
                        <option value="+36">🇭🇺 +36</option>
                        <option value="+40">🇷🇴 +40</option>
                        <option value="+7">🇷🇺 +7</option>
                        <option value="+380">🇺🇦 +380</option>
                        <option value="+90">🇹🇷 +90</option>
                        <option value="+972">🇮🇱 +972</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+92">🇵🇰 +92</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+880">🇧🇩 +880</option>
                        <option value="+94">🇱🇰 +94</option>
                        <option value="+977">🇳🇵 +977</option>
                        <option value="+86">🇨🇳 +86</option>
                        <option value="+81">🇯🇵 +81</option>
                        <option value="+82">🇰🇷 +82</option>
                        <option value="+84">🇻🇳 +84</option>
                        <option value="+66">🇹🇭 +66</option>
                        <option value="+60">🇲🇾 +60</option>
                        <option value="+65">🇸🇬 +65</option>
                        <option value="+63">🇵🇭 +63</option>
                        <option value="+62">🇮🇩 +62</option>
                        <option value="+55">🇧🇷 +55</option>
                        <option value="+54">🇦🇷 +54</option>
                        <option value="+57">🇨🇴 +57</option>
                        <option value="+56">🇨🇱 +56</option>
                        <option value="+52">🇲🇽 +52</option>
                        <option value="+27">🇿🇦 +27</option>
                        <option value="+234">🇳🇬 +234</option>
                        <option value="+254">🇰🇪 +254</option>
                        <option value="+233">🇬🇭 +233</option>
                        <option value="+20">🇪🇬 +20</option>
                        <option value="+212">🇲🇦 +212</option>
                      </select>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 min-w-0 px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors"
                        style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
                        placeholder="7911 123456"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={saving || !phoneNumber}
                    className="button-text w-full py-3 sm:py-4 bg-[#B11226] text-white text-sm sm:text-base font-bold rounded hover:bg-[#8B0E1C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'UPDATING...' : 'UPDATE PHONE'}
                  </button>
                </form>

                <form onSubmit={handlePasswordChange} className="space-y-4 sm:space-y-6">
                  <h2 className="cc-outline-text text-lg sm:text-xl font-bold">
                    CHANGE PASSWORD
                  </h2>

                  <div>
                    <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                      CURRENT PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors pr-10 sm:pr-12"
                        style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-white transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                      NEW PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors pr-10 sm:pr-12"
                        style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-white transition-colors"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                      CONFIRM NEW PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors pr-10 sm:pr-12"
                        style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={saving || !newPassword || !confirmPassword}
                    className="button-text w-full py-3 sm:py-4 bg-[#B11226] text-white text-sm sm:text-base font-bold rounded hover:bg-[#8B0E1C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'UPDATING...' : 'UPDATE PASSWORD'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="cc-outline-text text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                    REFERRAL PROGRAM
                  </h2>
                  <p className="text-sm sm:text-base text-[#A0A0A0] mb-4 sm:mb-6" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                    Share your unique referral link with friends and earn rewards when they join!
                  </p>

                  {profile?.referral_code && (
                    <div className="bg-[#0E0E0E] border border-[#2E2E2E] rounded p-3 sm:p-4">
                      <div className="text-xs sm:text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                        YOUR REFERRAL CODE
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                        <div className="flex-1 bg-[#1A1A1A] border border-[#2E2E2E] rounded px-3 sm:px-4 py-2 sm:py-3 overflow-x-auto">
                          <code className="text-[#B11226] font-bold text-sm sm:text-lg whitespace-nowrap" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                            {profile.referral_code}
                          </code>
                        </div>
                        <button
                          onClick={handleCopyReferralLink}
                          className="button-text px-4 sm:px-6 py-2 sm:py-3 bg-[#B11226] text-white text-sm sm:text-base font-bold rounded hover:bg-[#8B0E1C] transition-all flex items-center justify-center gap-2">
                          {copiedReferral ? (
                            <>
                              <Check size={18} />
                              COPIED
                            </>
                          ) : (
                            <>
                              <Copy size={18} />
                              COPY LINK
                            </>
                          )}
                        </button>
                      </div>
                      <div className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-[#A0A0A0] break-all" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                        {window.location.origin}?ref={profile.referral_code}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 sm:pt-8 border-t border-[#2E2E2E]">
                  <h2 className="cc-outline-text text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#B11226]">
                    DANGER ZONE
                  </h2>
                  <div className="space-y-3">
                    <button
                      onClick={handleSignOut}
                      className="button-text w-full py-3 sm:py-4 bg-[#2E2E2E] text-white text-sm sm:text-base font-bold rounded hover:bg-[#3E3E3E] transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} />
                      SIGN OUT
                    </button>

                    {!showDeleteConfirm ? (
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="button-text w-full py-3 sm:py-4 bg-[#B11226]/20 border-2 border-[#B11226] text-[#B11226] text-sm sm:text-base font-bold rounded hover:bg-[#B11226] hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 size={18} />
                        DELETE ACCOUNT
                      </button>
                    ) : (
                      <div className="bg-[#B11226]/10 border-2 border-[#B11226] rounded p-3 sm:p-4">
                        <p className="text-xs sm:text-sm text-[#B11226] mb-3 sm:mb-4 font-bold" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                          WARNING: This action cannot be undone. All your data will be permanently deleted.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <button
                            onClick={handleDeleteAccount}
                            disabled={saving}
                            className="button-text flex-1 py-2 sm:py-3 bg-[#B11226] text-white text-sm sm:text-base font-bold rounded hover:bg-[#8B0E1C] transition-all disabled:opacity-50"
                          >
                            {saving ? 'DELETING...' : 'CONFIRM DELETE'}
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(false)}
                            disabled={saving}
                            className="button-text flex-1 py-2 sm:py-3 bg-[#2E2E2E] text-white text-sm sm:text-base font-bold rounded hover:bg-[#3E3E3E] transition-all disabled:opacity-50"
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
