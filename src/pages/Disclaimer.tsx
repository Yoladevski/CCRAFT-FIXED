import BackButton from '../components/BackButton';

interface DisclaimerProps {
  onBack: () => void;
}

export default function Disclaimer({ onBack }: DisclaimerProps) {
  return (
    <div className="min-h-screen py-6 sm:py-16 px-4 sm:px-6 lg:px-8 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onClick={onBack} />
        </div>
        <h1 className="cc-outline-text text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          TRAINING RISK DISCLAIMER & LIABILITY WAIVER
        </h1>
        <p className="text-[#A0A0A0] mb-12 text-lg">Last Updated: 10/03/2026</p>

        <div className="space-y-8 text-[#E0E0E0]">
          <p className="text-lg leading-relaxed">
            CombatCraft provides instructional content related to martial arts training, including disciplines such as boxing and other combat sports.
          </p>
          <p className="text-lg leading-relaxed">
            By using the CombatCraft platform, you acknowledge and accept the risks associated with physical training and agree to the terms outlined below.
          </p>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">1. Acknowledgement of Risk</h2>
            <p className="mb-4 leading-relaxed">Martial arts and physical training involve inherent risks.</p>
            <p className="mb-4 leading-relaxed">These risks may include, but are not limited to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>muscle strain</li>
              <li>joint injury</li>
              <li>falls</li>
              <li>contact injuries</li>
              <li>serious physical injury</li>
            </ul>
            <p className="leading-relaxed">By participating in any training activities shown on CombatCraft, you acknowledge that you understand these risks.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">2. Voluntary Participation</h2>
            <p className="mb-4 leading-relaxed">All training activities performed after viewing CombatCraft instructional content are undertaken voluntarily.</p>
            <p className="leading-relaxed">Users are responsible for deciding whether a particular exercise, technique, or drill is appropriate for their physical condition and training environment.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">3. Safe Training Environment</h2>
            <p className="mb-4 leading-relaxed">Users are responsible for ensuring that they train in a safe environment with adequate space and suitable conditions.</p>
            <p className="leading-relaxed">CombatCraft is not responsible for injuries that occur due to unsafe training environments, lack of supervision, or improper equipment.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">4. Medical Disclaimer</h2>
            <p className="mb-4 leading-relaxed">CombatCraft does not provide medical advice.</p>
            <p className="mb-4 leading-relaxed">Users should consult a qualified healthcare professional before beginning any physical training program if they:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>have a medical condition</li>
              <li>have previously suffered injuries</li>
              <li>are unsure about their physical fitness to train</li>
            </ul>
            <p className="leading-relaxed">By using the platform you confirm that you are physically able to participate in training activities.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">5. No Coaching Relationship</h2>
            <p className="mb-4 leading-relaxed">CombatCraft provides general instructional content for educational purposes.</p>
            <p className="leading-relaxed">The platform does not provide personalised coaching, supervision, or professional training guidance.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">6. Responsible Use of Techniques</h2>
            <p className="mb-4 leading-relaxed">Techniques demonstrated on CombatCraft are intended for training, sporting, and educational purposes only.</p>
            <p className="leading-relaxed">Users are responsible for ensuring that techniques are used responsibly and in accordance with applicable laws and regulations.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">7. Assumption of Risk</h2>
            <p className="leading-relaxed">By using the CombatCraft platform you voluntarily assume full responsibility for any risks, injuries, or damages that may occur during training activities.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
            <p className="leading-relaxed">To the fullest extent permitted by law, CombatCraft and its creators shall not be liable for any injury, loss, or damage arising from the use of the platform or participation in training activities.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">9. Age Requirement</h2>
            <p className="mb-4 leading-relaxed">CombatCraft is intended for users aged 16 years or older.</p>
            <p className="leading-relaxed">Users under the age of 18 must obtain parental or guardian consent before using the platform.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">10. Agreement</h2>
            <p className="mb-4 leading-relaxed">By creating an account or using the CombatCraft platform, you confirm that:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>you have read this Training Risk Disclaimer</li>
              <li>you understand the risks associated with martial arts training</li>
              <li>you accept full responsibility for your participation</li>
            </ul>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">11. Contact</h2>
            <p className="mb-4 leading-relaxed">If you have questions regarding this disclaimer, please contact:</p>
            <p className="leading-relaxed font-semibold">support@combatcraft.co.uk</p>
          </section>
        </div>
      </div>
    </div>
  );
}
