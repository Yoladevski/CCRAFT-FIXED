import { useEffect, useState, useRef } from 'react';
import { LogOut, User, Camera, Copy, Check, Eye, EyeOff, Trash2 } from 'lucide-react';
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

    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName || null,
          weight: weight ? parseInt(weight) : null,
          height: height ? parseInt(height) : null,
          experience_level: experienceLevel,
          preferred_discipline: preferredDiscipline || null,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setMessage('Profile updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
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
        phone: phoneNumber
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
        <div className="text-2xl text-[#A0A0A0]" style={{ fontFamily: 'Redhawk' }}>LOADING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-4 relative -mt-20 pt-20 sm:pt-24">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onBack={onBack} />
        </div>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-12"
          style={{
            fontFamily: 'Redhawk',
            textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
          }}
        >
          ACCOUNT
        </h1>

        {message && (
          <div className={`mb-6 p-4 rounded text-center ${
            message.includes('success')
              ? 'bg-green-500/20 border border-green-500 text-green-500'
              : 'bg-[#B11226]/20 border border-[#B11226] text-[#B11226]'
          }`} style={{ fontFamily: 'Redhawk' }}>
            {message}
          </div>
        )}

        <div className="bg-[#1A1A1A] border border-[#2E2E2E] mb-6">
          <div className="flex border-b border-[#2E2E2E]">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 sm:py-4 px-2 sm:px-6 text-xs sm:text-base font-bold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#B11226] text-white'
                  : 'bg-transparent text-[#A0A0A0] hover:bg-[#2E2E2E]'
              }`}
              style={{ fontFamily: 'Redhawk' }}
            >
              PROFILE
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-3 sm:py-4 px-2 sm:px-6 text-xs sm:text-base font-bold transition-colors ${
                activeTab === 'security'
                  ? 'bg-[#B11226] text-white'
                  : 'bg-transparent text-[#A0A0A0] hover:bg-[#2E2E2E]'
              }`}
              style={{ fontFamily: 'Redhawk' }}
            >
              SECURITY
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 sm:py-4 px-2 sm:px-6 text-xs sm:text-base font-bold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#B11226] text-white'
                  : 'bg-transparent text-[#A0A0A0] hover:bg-[#2E2E2E]'
              }`}
              style={{ fontFamily: 'Redhawk' }}
            >
              SETTINGS
            </button>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div className="flex flex-col items-center gap-4 pb-8 border-b border-[#2E2E2E]">
                  <div className="relative">
                    <div className="w-32 h-32 min-w-[128px] min-h-[128px] rounded-full border-4 border-[#B11226] overflow-hidden bg-[#2E2E2E] flex items-center justify-center">
                      {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" width="128" height="128" />
                      ) : (
                        <User size={64} className="text-[#A0A0A0]" />
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
                    <p className="text-sm text-[#A0A0A0]" style={{ fontFamily: 'Redhawk' }}>
                      UPLOADING...
                    </p>
                  )}
                  <p className="text-xs text-[#A0A0A0] text-center max-w-sm" style={{ fontFamily: 'Redhawk' }}>
                    Click the camera icon to upload a profile picture (max 5MB)
                  </p>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-6">
                  <div>
                    <label className="block text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk' }}>
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors"
                      style={{ fontFamily: 'Redhawk' }}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk' }}>
                        WEIGHT (LBS)
                      </label>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors"
                        style={{ fontFamily: 'Redhawk' }}
                        placeholder="185"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk' }}>
                        HEIGHT (INCHES)
                      </label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors"
                        style={{ fontFamily: 'Redhawk' }}
                        placeholder="72"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk' }}>
                      EXPERIENCE LEVEL
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors"
                      style={{ fontFamily: 'Redhawk' }}
                    >
                      <option value="Beginner">BEGINNER</option>
                      <option value="Intermediate">INTERMEDIATE</option>
                      <option value="Advanced">ADVANCED</option>
                      <option value="Expert">EXPERT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk' }}>
                      PREFERRED DISCIPLINE
                    </label>
                    <select
                      value={preferredDiscipline}
                      onChange={(e) => setPreferredDiscipline(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white focus:outline-none focus:border-[#B11226] transition-colors"
                      style={{ fontFamily: 'Redhawk' }}
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
                    className="w-full py-4 bg-[#B11226] text-white font-bold rounded hover:bg-[#8B0E1C] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Redhawk' }}
                  >
                    {saving ? 'SAVING...' : 'SAVE PROFILE'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 sm:space-y-8">
                <div className="pb-6 sm:pb-8 border-b border-[#2E2E2E]">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: 'Redhawk' }}>
                    ACCOUNT INFO
                  </h2>
                  <div className="mt-4">
                    <div className="text-xs sm:text-sm text-[#A0A0A0] mb-1" style={{ fontFamily: 'Redhawk' }}>CURRENT EMAIL</div>
                    <div className="text-sm sm:text-base break-all" style={{ fontFamily: 'Redhawk' }}>{user?.email}</div>
                  </div>
                  {profile && (
                    <div className="grid grid-cols-2 gap-3 sm:gap-6 mt-6">
                      <div>
                        <div className="text-xs sm:text-sm text-[#A0A0A0] mb-1" style={{ fontFamily: 'Redhawk' }}>RANK</div>
                        <div className="text-lg sm:text-2xl font-bold text-[#B11226]" style={{ fontFamily: 'Redhawk' }}>{profile.rank}</div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-[#A0A0A0] mb-1" style={{ fontFamily: 'Redhawk' }}>POWER LEVEL</div>
                        <div className="text-lg sm:text-2xl font-bold text-[#B11226]" style={{ fontFamily: 'Inter' }}>{profile.power_level}</div>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleEmailChange} className="space-y-4 pb-6 sm:pb-8 border-b border-[#2E2E2E]">
                  <h2 className="text-lg sm:text-xl font-bold" style={{ fontFamily: 'Redhawk' }}>
                    CHANGE EMAIL
                  </h2>
                  <div>
                    <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk' }}>
                      NEW EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors"
                      style={{ fontFamily: 'Redhawk' }}
                      placeholder="newemail@example.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={saving || !newEmail}
                    className="w-full py-3 sm:py-4 bg-[#B11226] text-white text-sm sm:text-base font-bold rounded hover:bg-[#8B0E1C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Redhawk' }}
                  >
                    {saving ? 'UPDATING...' : 'UPDATE EMAIL'}
                  </button>
                </form>

                <form onSubmit={handlePhoneChange} className="space-y-4 pb-6 sm:pb-8 border-b border-[#2E2E2E]">
                  <h2 className="text-lg sm:text-xl font-bold" style={{ fontFamily: 'Redhawk' }}>
                    PHONE NUMBER
                  </h2>
                  <div>
                    <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk' }}>
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors"
                      style={{ fontFamily: 'Inter' }}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={saving || !phoneNumber}
                    className="w-full py-3 sm:py-4 bg-[#B11226] text-white text-sm sm:text-base font-bold rounded hover:bg-[#8B0E1C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Redhawk' }}
                  >
                    {saving ? 'UPDATING...' : 'UPDATE PHONE'}
                  </button>
                </form>

                <form onSubmit={handlePasswordChange} className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-bold" style={{ fontFamily: 'Redhawk' }}>
                    CHANGE PASSWORD
                  </h2>

                  <div>
                    <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk' }}>
                      CURRENT PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors pr-10 sm:pr-12"
                        style={{ fontFamily: 'Redhawk' }}
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
                    <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk' }}>
                      NEW PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors pr-10 sm:pr-12"
                        style={{ fontFamily: 'Redhawk' }}
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
                    <label className="block text-xs sm:text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk' }}>
                      CONFIRM NEW PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded text-white text-sm sm:text-base focus:outline-none focus:border-[#B11226] transition-colors pr-10 sm:pr-12"
                        style={{ fontFamily: 'Redhawk' }}
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
                    className="w-full py-3 sm:py-4 bg-[#B11226] text-white text-sm sm:text-base font-bold rounded hover:bg-[#8B0E1C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Redhawk' }}
                  >
                    {saving ? 'UPDATING...' : 'UPDATE PASSWORD'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Redhawk' }}>
                    REFERRAL PROGRAM
                  </h2>
                  <p className="text-sm sm:text-base text-[#A0A0A0] mb-4 sm:mb-6" style={{ fontFamily: 'Redhawk' }}>
                    Share your unique referral link with friends and earn rewards when they join!
                  </p>

                  {profile?.referral_code && (
                    <div className="bg-[#0E0E0E] border border-[#2E2E2E] rounded p-3 sm:p-4">
                      <div className="text-xs sm:text-sm text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk' }}>
                        YOUR REFERRAL CODE
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                        <div className="flex-1 bg-[#1A1A1A] border border-[#2E2E2E] rounded px-3 sm:px-4 py-2 sm:py-3 overflow-x-auto">
                          <code className="text-[#B11226] font-bold text-sm sm:text-lg whitespace-nowrap" style={{ fontFamily: 'Redhawk' }}>
                            {profile.referral_code}
                          </code>
                        </div>
                        <button
                          onClick={handleCopyReferralLink}
                          className="px-4 sm:px-6 py-2 sm:py-3 bg-[#B11226] text-white text-sm sm:text-base font-bold rounded hover:bg-[#8B0E1C] transition-all flex items-center justify-center gap-2"
                          style={{ fontFamily: 'Redhawk' }}>
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
                      <div className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-[#A0A0A0] break-all" style={{ fontFamily: 'Redhawk' }}>
                        {window.location.origin}?ref={profile.referral_code}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 sm:pt-8 border-t border-[#2E2E2E]">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#B11226]" style={{ fontFamily: 'Redhawk' }}>
                    DANGER ZONE
                  </h2>
                  <div className="space-y-3">
                    <button
                      onClick={handleSignOut}
                      className="w-full py-3 sm:py-4 bg-[#2E2E2E] text-white text-sm sm:text-base font-bold rounded hover:bg-[#3E3E3E] transition-all flex items-center justify-center gap-2"
                      style={{ fontFamily: 'Redhawk' }}
                    >
                      <LogOut size={18} />
                      SIGN OUT
                    </button>

                    {!showDeleteConfirm ? (
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="w-full py-3 sm:py-4 bg-[#B11226]/20 border-2 border-[#B11226] text-[#B11226] text-sm sm:text-base font-bold rounded hover:bg-[#B11226] hover:text-white transition-all flex items-center justify-center gap-2"
                        style={{ fontFamily: 'Redhawk' }}
                      >
                        <Trash2 size={18} />
                        DELETE ACCOUNT
                      </button>
                    ) : (
                      <div className="bg-[#B11226]/10 border-2 border-[#B11226] rounded p-3 sm:p-4">
                        <p className="text-xs sm:text-sm text-[#B11226] mb-3 sm:mb-4 font-bold" style={{ fontFamily: 'Redhawk' }}>
                          WARNING: This action cannot be undone. All your data will be permanently deleted.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <button
                            onClick={handleDeleteAccount}
                            disabled={saving}
                            className="flex-1 py-2 sm:py-3 bg-[#B11226] text-white text-sm sm:text-base font-bold rounded hover:bg-[#8B0E1C] transition-all disabled:opacity-50"
                            style={{ fontFamily: 'Redhawk' }}
                          >
                            {saving ? 'DELETING...' : 'CONFIRM DELETE'}
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(false)}
                            disabled={saving}
                            className="flex-1 py-2 sm:py-3 bg-[#2E2E2E] text-white text-sm sm:text-base font-bold rounded hover:bg-[#3E3E3E] transition-all disabled:opacity-50"
                            style={{ fontFamily: 'Redhawk' }}
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
