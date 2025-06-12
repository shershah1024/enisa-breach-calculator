import Link from "next/link"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="relative">
        <div className="flex justify-between items-center px-4 md:px-12 py-6 md:py-8 border-b-4 border-black">
          <Link href="/" className="flex items-center space-x-2 md:space-x-4">
            <div className="text-2xl md:text-4xl font-black">INTGEN</div>
            <div className="text-2xl md:text-4xl font-light">AI</div>
            <div className="ml-2 md:ml-4 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-600 leading-tight">
              Compliance
              <br />
              Excellence
            </div>
          </Link>
          
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link
              href="/calculator"
              className="text-sm uppercase tracking-[0.2em] text-gray-700 hover:text-black transition-colors font-medium border-b-2 border-transparent hover:border-black pb-1"
            >
              Compliance Tools
            </Link>
            <Link
              href="/"
              className="bg-black text-white px-6 md:px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-gray-800 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="px-4 md:px-12 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="border-b-4 border-black pb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight uppercase">
                Terms of Use
              </h1>
              <div className="flex items-center space-x-4">
                <div className="w-16 md:w-24 h-0.5 bg-black"></div>
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  INTGEN.AI • Last updated: June 11, 2025
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 text-gray-700 leading-relaxed">
                <div className="bg-gray-50 border-l-4 border-black p-6">
                  <p className="text-base">
                    Please read these terms of use ("Terms") carefully before accessing, utilizing, creating an account for, or subscribing to the platform. Your use of the platform indicates that you have read, accepted and agreed to these Terms and constitutes your consent thereto (regardless of your payment or subscription status).
                  </p>
                  <p className="text-base mt-4">
                    If you do not accept these Terms, please do not set up an account, subscribe or otherwise access or utilize the platform. If you have any questions about the platform, please send an email to <a href="mailto:contact@intgen.ai" className="text-black font-medium underline hover:text-gray-600">contact@intgen.ai</a> and a member of the team will get back to you without undue delay.
                  </p>
                </div>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    1. Terms of Use
                  </h2>
                  <p>
                    These Terms are between you and INTGEN.AI concerning your access to and use of the "platform"). We want you to understand exactly what you are agreeing to when you become an INTGEN.AI user.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    2. Definitions
                  </h2>
                  <p>The following terms are used throughout these Terms and have specific meanings. You should know what each of the terms means.</p>
                  <div className="space-y-4 ml-6">
                    <div><strong className="font-black">a. "Platform"</strong> means the website platform hosted by INTGEN.AI which operates as a portal for access to the INTGEN.AI database and web-based software, documentation and other information and materials provided on or in connection with the foregoing, including without limitation access to INTGEN.AI's forms and online community, user-generated content, third-party content, communication tools, document management and storage solutions, and payment services.</div>
                    <div><strong className="font-black">b. "Website"</strong> means INTGEN.AI's website located at https://www.intgen.ai/ all subpages and subdomains, and all content, services, and products available at or through the website.</div>
                    <div><strong className="font-black">c. "INTGEN.AI," "we," and "us"</strong> refer to INTGEN.AI, our affiliates, directors, subsidiaries, officers, and employees. Subscribing compliance professional users are not part of INTGEN.AI.</div>
                    <div><strong className="font-black">d. "Consumer user,"</strong> means a person or organization that is not a "subscribing compliance professional user" and has created an account on the website for access to the platform.</div>
                    <div><strong className="font-black">e. "User", "you" and "your"</strong> refer to the person or organization that has created an account on the website for access to the platform and includes both consumer users and subscribing compliance professional users.</div>
                    <div><strong className="font-black">f. "Subscribing compliance professional user"</strong> means a practicing compliance professional who subscribes to INTGEN.AI and is included in the INTGEN.AI database, may receive consumer user inquiries and may communicate with and provide contracting or consulting work to consumer users or fellow subscribing compliance professional users via the platform. Subscribing compliance professional users are not employees or agents of INTGEN.AI.</div>
                    <div><strong className="font-black">g. "Proposal"</strong> means a communication from a subscribing compliance professional user to a consumer user in response to the consumer user's post of a compliance question or seeking compliance counsel.</div>
                    <div><strong className="font-black">h. "Content"</strong> refers to content featured or displayed through the platform, including without limitation text, documents, information, data, articles, opinions, images, photographs, graphics, software, applications, video recordings, audio recordings, sounds, designs, features, and other materials that are available on the website. Content includes, without limitation, user-generated content and third-party content.</div>
                  </div>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    3. Read Our Privacy Policy
                  </h2>
                  <p>
                    Please see our privacy policy to understand our practices, located at <a href="https://www.intgen.ai/privacy" className="text-black font-medium underline hover:text-gray-600">https://www.intgen.ai/privacy</a>. By using the platform, you understand how INTGEN.AI collects, stores and uses your account data in accordance with INTGEN.AI's privacy policy. We encourage you to review the privacy policy frequently. Each party shall comply with its respective obligations under applicable data protection laws ("DPL").
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    4. Acceptance of the Terms
                  </h2>
                  <p>
                    These Terms are accepted when you access or start to use, create an account for or subscribe to the platform or otherwise attempt to access the website. By using the platform, you may not use the platform if you are a: (a) person who is not of compliance age or otherwise not entitled to form a binding contract with INTGEN.AI, or (b) person who is prohibited from accessing the platform under the laws of any country including the country of which you are a resident or from which you are using the platform. If you are an individual accessing or using the platform on behalf of, or for the benefit of, any corporation, partnership or other entity with which you are associated ("organization"), then you are agreeing to these Terms on behalf of yourself and such organization, and you represent and warrant that you have the compliance authority to bind such organization to these Terms. References to "you" in these Terms will refer to both the individual using the platform and to any such organization for which the individual is acting.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    5. Changes to the Terms
                  </h2>
                  <p>
                    INTGEN.AI may, at any time and in its sole discretion, without warning or notice, update or otherwise change these Terms. Each such modification will take immediate effect upon publication to the website, and the latest publication revision date will be updated. INTGEN.AI may provide you with notices, including those regarding changes to these Terms, by email, text message, postings or other reasonable means now known or hereinafter developed. A notice may be shown when you enter the website for the platform notifying you of the "updated terms" for a reasonable amount of time. Your continued use of the platform following any such notifications, whether or not you have actual knowledge of or review the updated terms, constitutes your acceptance of such modifications and your agreement to be bound thereby. If you do not agree to any modification of these Terms, your sole remedy is to discontinue use of the platform and/or cancel your subscription for platform in accordance herewith. Any updated terms will supersede previous versions.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    6. About the Platform
                  </h2>
                  <p>
                    The platform is intended for collaboration and communication between compliance professionals and those seeking compliance assistance by providing access to a virtual community of consumer users and subscribing compliance professional users, communication management tools, document management and storage, and simple, secure payment and invoicing tools.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    7. User Accounts
                  </h2>
                  <p>
                    Access to the platform requires that a user create an online account by providing your full name, a valid email address, and a strong password ("account data"). You are responsible for all activity that occurs in association with your account. You will keep your account data safe and secure and prevent unauthorized access to your account data and your account by third-parties, in particular by: (i) by changing your password regularly, (ii) by ensuring that you do not disclose your password(s) or grant any other user or third-party access to your account data or platform, and (iii) by ensuring that you exit from your account at the end of each session. You agree that INTGEN.AI may store and use the account data you provide for use in maintaining your account and as otherwise provided herein. Should you detect any unusual activity on your account, you must notify us promptly (unauthorized use or security breach). INTGEN.AI is not liable for any loss or damages caused by your failure to maintain the confidentiality of your account credentials. Please contact INTGEN.AI via email at dataprotection@intgen.ai if you discover or suspect any security breach related to the platform or your account.
                  </p>
                  <p>
                    INTGEN.AI will not be responsible for any liabilities, losses, or damages arising out of the unauthorized use of your computer, mobile device, any such other computing device, and/or your account.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    8. What INTGEN is Not; Disclaimers
                  </h2>
                  <div className="space-y-3">
                    <p>• Use of the platform does not create a compliance professional-client relationship between you and INTGEN.AI and/or any subscribing compliance professional user.</p>
                    <p>• INTGEN.AI is not a law firm, and does not provide compliance review, advice, opinions, recommendations, representation or counseling.</p>
                    <p>• Subscribing compliance professional users are not employees or agents of INTGEN.AI.</p>
                    <p>• INTGEN.AI is not involved in agreements between users and subscribing compliance professional users.</p>
                    <p>• INTGEN.AI is not an employment agency.</p>
                    <p>• INTGEN.AI does not select, endorse or vouch for any subscribing compliance professional user to service a consumer user.</p>
                    <p>• INTGEN.AI uses commercially reasonable efforts to confirm that subscribing compliance professional users are licensed compliance professionals by requiring the compliance professionals to self-attest to such fact. INTGEN.AI relies on such subscribing compliance professional user's professional and ethical duties in making such statements and does not make independent inquiry, or warranty, guarantee or representation regarding the same.</p>
                    <p>• INTGEN.AI does not make any warranty, guarantee, or representation as to the compliance ability, competence, quality, or qualifications of any subscribing compliance professional user.</p>
                    <p>• INTGEN.AI does not warrant or guarantee that subscribing compliance professional users are covered by professional liability insurance. INTGEN.AI encourages all subscribing compliance professional users to maintain and hold professional liability insurance but allows subscribing compliance professional users to make such decisions at their sole discretion, where legally permitted.</p>
                    <p>• INTGEN.AI encourages consumer users to research any subscribing compliance professional users before engaging and accepting professional advice. INTGEN.AI simply provides a platform on which those seeking compliance assistance may communicate and transact with compliance professionals.</p>
                    <p>• At no point may INTGEN.AI be held liable for the actions or omissions of any subscribing compliance professional user performing services for you.</p>
                    <p>• INTGEN.AI does not predict, warranty or guarantee results or the outcome of any matter.</p>
                    <p>• INTGEN.AI does not review or endorse information or content posted by users or third-parties ("user-generated content"), including but not limited to responses to blog posts, compliance questions posted on the platform, information posted publicly on the platform, information sent in an unsolicited message to a user, forms, guides and documents posted on the platform, blog posts written by third-parties, links to third-party websites, integration with third-party services, and/or advertisements from third-parties.</p>
                    <p>• INTGEN.AI will have no responsibility or liability of any kind for any user-generated content or compliance advice you encounter on or through the website, and any use or reliance on user-generated content or compliance advice is solely at your own risk.</p>
                    <p>• User-generated content is not a substitute for professional compliance advice or a solicitation to offer compliance advice regarding specific facts. You should not delay or forego seeking compliance advice or disregard professional compliance advice based on user-generated content. Delay in seeking such compliance advice could result in waiver of any claims you may have, depending on the applicable statute(s) of limitation. User-generated content is not regulated by any state or national bar association.</p>
                  </div>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    9. Engagement of Subscribing Compliance Professional User
                  </h2>
                  <p>
                    Receipt of a proposal from a subscribing compliance professional user is not a substitute for a consultation with a licensed compliance professional regarding a consumer user's specific issue, and you should not rely upon information contained in a proposal as compliance advice. A consumer user may receive proposals, exchange correspondences and/or have a phone conversation/consultation with a subscribing compliance professional user prior to engaging, without obligation to engage, the subscribing compliance professional user as counsel. The selection of a subscribing compliance professional user for compliance representation is the sole responsibility of the consumer user. If a consumer user hires a subscribing compliance professional user, the consumer user and the subscribing compliance professional user must agree to the scope of the matter, the fee for such work and formalize their agreement regarding the limitations and conditions of the representation in a signed writing ("engagement agreement"). The only way a compliance professional-client relationship is created is if you and a subscribing compliance professional user agree to such and memorialize such agreement with an engagement agreement.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    10. Fees
                  </h2>
                  <p>
                    Access to the platform is free unless and until (a) you hire a subscribing compliance professional user to perform compliance work for you, (b) an engagement agreement is signed by both the consumer user, (c) and the subscribing compliance professional user, and the subscribing compliance professional user performs billable work for the consumer user. The fee payable for compliance services to the subscribing compliance professional is set by the consumer user and the subscribing compliance professional user in advance of the representation and is included in the engagement agreement; compliance fees may be hourly, flat-fee, sliding scale, discounted, or the like. All payments by a consumer user for compliance services rendered pursuant to an engagement agreement, whether billed monthly or upon completion, by a subscribing compliance professional user must be made through the platform.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    11. Obligations of the User
                  </h2>
                  <p>User represents, warrants and agrees to the following:</p>
                  <div className="ml-6 space-y-2 mt-3">
                    <p>a. You have the authority and capacity, and are of compliance age in your jurisdiction, to bind yourself to these Terms;</p>
                    <p>b. All information you submit is true, accurate, current, and complete and you will promptly update such information as may become necessary for accuracy and completeness;</p>
                    <p>c. Your use of the platform will be solely for purposes that are permitted by these Terms;</p>
                    <p>d. Your use of the platform will not infringe or misappropriate the intellectual property rights of any third-party;</p>
                    <p>e. Your use of the platform will comply with all country and EU laws, rules, and regulations, and with all other INTGEN.AI policies;</p>
                    <p>f. You will not access the platform through automated or non-human means, whether through a bot, script or otherwise;</p>
                  </div>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    12. Compliance Professional Subscriber Users
                  </h2>
                  <p>
                    Licensed compliance professionals wishing to be a member of the INTGEN.AI compliance professional database as a compliance professional subscriber user must inquire with INTGEN.AI with respect thereto. If accepted for subscription, a compliance professional subscriber user must agree to (a) these Terms and (b) an addendum to these Terms detailing enrollment, usage, payment and other terms and conditions associated with such membership subscription ("compliance professional addendum"). The accounts of compliance professional subscriber users may be subject to protocols and requirements that differ from accounts of consumer users, in INTGEN.AI's discretion, including requiring additional authentication or security measures. Any compliance professional-client relationship between a consumer user and a subscribing compliance professional user must be via a written engagement letter, and INTGEN.AI is not a party thereto.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    13. Ownership of and License to Platform and Content
                  </h2>
                  <p>
                    INTGEN.AI owns all rights, title and interest in and to the platform, including without limitation all applicable intellectual property rights and other proprietary rights in the platform. Except for the rights expressly granted to you in these Terms, INTGEN.AI retains all rights in or to the platform.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    14. Disclaimers & Limitations of Liability
                  </h2>
                  <p>
                    You expressly agree that use of the platform is at your own risk and is provided on an "as is" and as-available basis. To the fullest extent permitted by law, we disclaim all warranties of any kind, either express or implied, including, without limitation, warranties of title or implied warranties of non-infringement, merchantability or fitness for a particular purpose.
                  </p>
                  <p>
                    We will assume no liability or responsibility for any (1) errors, mistakes, or inaccuracies of content and materials, (2) personal injury or property damage, of any nature whatsoever, resulting from your access to and use of the platform, (3) any unauthorized access to or use of the platform and/or any and all personal information and/or financial information stored therein, (4) any interruption or cessation of transmission to or from the platform, (5) any bugs, viruses, trojan horses, or the like which may be transmitted to or through the platform, and/or (6) any errors or omissions in any content and materials or for any loss or damage of any kind incurred as a result of the use of any content posted, transmitted, or otherwise made available via the platform.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-[0.05em] text-black border-b-2 border-black pb-2">
                    15. Governing Law and Venue
                  </h2>
                  <p>
                    The Terms, your use of the platform, all aspects of the platform, will be governed by and construed in accordance with the local laws of Luxembourg.
                  </p>
                </section>

                <div className="border-t-4 border-black pt-8 mt-12">
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-[0.1em]">[End of Terms]</p>
                  <div className="mt-6">
                    <Link
                      href="/"
                      className="inline-flex items-center text-black font-medium text-sm uppercase tracking-[0.15em] border-b-2 border-black pb-2 hover:border-gray-400 transition-colors"
                    >
                      <svg
                        className="mr-3 w-4 h-4 rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}