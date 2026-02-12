import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005e54] via-[#007a6e] to-[#005e54]">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white mb-6 hover:text-gray-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 mb-8">Last updated: January 2026</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using mybenefithelpline.org (the "Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Official Website</h2>
              <p className="text-gray-700 mb-4">
                This is the only official website to claim your Auto Insurance Subsidy. The official domain name is <strong>mybenefithelpline.org</strong>. We have no affiliation with any other websites that may look similar or claim to offer similar services.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Warning:</strong> Beware of other fraudulent and similar-looking websites. We are not responsible for any services, information, or transactions conducted on any website other than mybenefithelpline.org.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Service Description</h2>
              <p className="text-gray-700 mb-4">
                Auto Benefit Helpline provides information and assistance services to help individuals determine their eligibility for auto insurance rate reductions and subsidies. Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Eligibility assessment questionnaires</li>
                <li>Information about auto insurance subsidies</li>
                <li>Connection to licensed insurance agents</li>
                <li>Educational resources about auto insurance benefits</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Eligibility and Qualifications</h2>
              <p className="text-gray-700 mb-4">
                Eligibility for auto insurance subsidies and rate reductions is determined by various factors including but not limited to age, current insurance status, and payment history. Our website provides preliminary assessments only. Final eligibility determination is made by licensed insurance agents during the qualification process.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. No Government Affiliation</h2>
              <p className="text-gray-700 mb-4">
                Auto Benefit Helpline is not affiliated with, endorsed by, or connected to any government agency. We are a private service provider offering information and connection services to licensed insurance professionals.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Provide accurate and truthful information when using our services</li>
                <li>Use the Website only for lawful purposes</li>
                <li>Not attempt to gain unauthorized access to any portion of the Website</li>
                <li>Not use the Website in any manner that could damage, disable, or impair the Website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                Auto Benefit Helpline provides information and connection services "as is" without warranties of any kind. We do not guarantee:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>That you will qualify for any insurance subsidy or rate reduction</li>
                <li>The accuracy of preliminary eligibility assessments</li>
                <li>Any specific outcomes from using our services</li>
                <li>That the Website will be available at all times or error-free</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To the fullest extent permitted by law, Auto Benefit Helpline shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                Our Website may connect you with third-party licensed insurance agents. We are not responsible for the services, advice, or actions of these third parties. Any agreements or transactions you enter into with third parties are solely between you and those parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on this Website, including text, graphics, logos, images, and software, is the property of Auto Benefit Helpline or its content suppliers and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website after changes are posted constitutes your acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms & Conditions, please contact us through the official website at mybenefithelpline.org.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms & Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which Auto Benefit Helpline operates, without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
