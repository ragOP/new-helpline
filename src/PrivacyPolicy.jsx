import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">Last updated: January 2026</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Auto Benefit Helpline ("we," "our," or "us") operates the website mybenefithelpline.org. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">2.1 Information You Provide</h3>
              <p className="text-gray-700 mb-4">
                We collect information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Complete our eligibility assessment questionnaire (e.g., age, insurance status, payment information)</li>
                <li>Contact us through our website</li>
                <li>Request information about our services</li>
                <li>Interact with our customer service representatives</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">2.2 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">
                When you visit our website, we may automatically collect certain information about your device and browsing behavior, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Device identifiers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>To assess your eligibility for auto insurance subsidies and rate reductions</li>
                <li>To connect you with licensed insurance agents</li>
                <li>To provide, maintain, and improve our services</li>
                <li>To communicate with you about your inquiries and our services</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To analyze website usage and trends</li>
                <li>To detect, prevent, and address technical issues and security threats</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We may share your information in the following circumstances:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">4.1 Licensed Insurance Agents</h3>
              <p className="text-gray-700 mb-4">
                We share your information with licensed insurance agents who can assist you with the qualification process for auto insurance subsidies. These agents are bound by professional confidentiality obligations.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">4.2 Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We may share your information with third-party service providers who perform services on our behalf, such as website hosting, data analysis, customer service, and marketing assistance. These service providers are contractually obligated to protect your information.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">4.3 Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, subpoenas).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">4.4 Business Transfers</h3>
              <p className="text-gray-700 mb-4">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser and stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links</h2>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to read the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to object to processing of your information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent (where processing is based on consent)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, please contact us through the official website at mybenefithelpline.org.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Official Website Notice</h2>
              <p className="text-gray-700 mb-4">
                This is the only official website for Auto Benefit Helpline with the domain name <strong>mybenefithelpline.org</strong>. We have no affiliation with any other websites that may look similar or claim to offer similar services. Please beware of fraudulent and similar-looking websites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us through the official website at mybenefithelpline.org.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
