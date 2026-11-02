"use client"

import Link from "next/link"
import { SiteNav } from "@/components/site/SiteNav"
import { SiteFooter } from "@/components/site/SiteFooter"

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteNav />

      {/* Header */}
      <section className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16 lg:pt-20">
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">
          Legal
        </p>
        <h1 className="font-display text-[36px] sm:text-[52px] lg:text-[60px] leading-[1.08] tracking-tight text-t1">
          Terms of Use
        </h1>
        <p className="mt-4 text-[14px] text-t3">Last updated: November 2, 2026</p>
      </section>

      {/* Body content */}
      <section className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
        <div className="policy-content space-y-5 text-[16px] leading-relaxed text-nav-text">
          <p>
            These Terms of Use govern your use of Reign and the other Reignara products (the
            &ldquo;Service&rdquo;). The Service is operated by Reignara LLC (&ldquo;Reignara,&rdquo;
            &ldquo;we,&rdquo; or &ldquo;us&rdquo;). By creating an account, signing in, or tapping
            &ldquo;I Agree&rdquo; in the app, you agree to these Terms and to our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <h2>Who can use the Service</h2>
          <p>
            You must be at least 16 years old to use the Service. If you are under 18, you confirm
            that a parent or guardian knows you are using it. Reign is a private, invitation-based
            community: accounts are provided through pageant organizations that use the Service,
            and those organizations decide who belongs to them.
          </p>

          <h2>Your account</h2>
          <p>
            You are responsible for keeping your sign-in details secure and for what happens under
            your account. Provide accurate information, and do not use another person&rsquo;s
            account. Tell us right away at{" "}
            <a href="mailto:support@reignara.com">support@reignara.com</a> if you think your account
            has been compromised.
          </p>

          <h2>Community rules: zero tolerance for objectionable content</h2>
          <p>
            We do not tolerate objectionable content or abusive behavior. You agree not to post,
            send, or share content that is:
          </p>
          <ul>
            <li>harassing, bullying, or intimidating;</li>
            <li>abusive, threatening, or violent;</li>
            <li>sexual, sexually suggestive, or exploitative;</li>
            <li>hateful or discriminatory toward any person or group;</li>
            <li>illegal, or an infringement of someone else&rsquo;s rights; or</li>
            <li>otherwise harmful to members of the community.</li>
          </ul>
          <p>
            There is no warning tier for this content. We may remove it and may suspend or remove
            the accounts of people who post it. Content or conduct that would harm a minor is
            treated with the highest priority.
          </p>

          <h2>Reporting and blocking</h2>
          <p>
            You can report any message from another member in the app, and you can block a member
            so you no longer see their messages. You can also email{" "}
            <a href="mailto:support@reignara.com">support@reignara.com</a>. Reports are reviewed and
            acted upon, which can include removing content and accounts. We aim to respond to
            reports within 24 hours.
          </p>

          <h2>Your content</h2>
          <p>
            You keep ownership of the content you submit, including messages, posts, photos, and
            application materials. You give Reignara a non-exclusive, worldwide, royalty-free license
            to host, store, copy, process, and display that content as needed to operate the Service.
            Content you share is also available to the organization you belong to and to the other
            members it is shared with, under that organization&rsquo;s own rules. You confirm you have
            the right to share what you submit.
          </p>

          <h2>Pageant organizations</h2>
          <p>
            Each pageant organization is responsible for its own competitions, rules, eligibility,
            fees, judging, and results. Reignara provides the software and is not a party to the
            relationship between you and an organization. Questions about a competition should go to
            the organization that runs it.
          </p>

          <h2>Acceptable use</h2>
          <p>
            Do not misuse the Service. That includes trying to access accounts or data that are not
            yours, interfering with the Service, scraping it, reverse engineering it, or using it to
            send spam or break the law.
          </p>

          <h2>Ending your account</h2>
          <p>
            You can stop using the Service at any time. You can delete your account in the Reign app
            under Account, then Privacy &amp; Security, then Delete Account, or by emailing{" "}
            <a href="mailto:support@reignara.com">support@reignara.com</a> from the address on your
            account. Our <Link href="/privacy">Privacy Policy</Link> explains what we keep and for how
            long. We may suspend or end your access if you break these Terms or if we need to in order
            to protect members or the Service.
          </p>

          <h2>App stores</h2>
          <p>
            If you downloaded Reign from an app store, that store&rsquo;s terms also apply to the
            download. Reignara, not the app store, is responsible for the app and its content. Apple
            and its subsidiaries are third-party beneficiaries of these Terms for iOS users.
          </p>

          <h2>Disclaimers and limits on liability</h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
            warranties of any kind, to the fullest extent the law allows. We do not guarantee that it
            will be uninterrupted or error free, and we are not responsible for content posted by
            members or for the conduct of organizations or members. To the fullest extent the law
            allows, Reignara is not liable for indirect, incidental, special, or consequential damages,
            and our total liability for any claim is limited to the greater of the amount you paid
            Reignara in the 12 months before the claim or US $100.
          </p>

          <h2>Changes to these Terms</h2>
          <p>
            We may update these Terms. If a change is significant, we will tell you in the app or by
            email, and you may be asked to accept the new Terms. If you keep using the Service after a
            change takes effect, you accept the updated Terms.
          </p>

          <h2>Governing law</h2>
          <p>
            These Terms are governed by the laws of the State of Idaho, without regard to its conflict
            of laws rules, except where the law of your home jurisdiction requires otherwise.
          </p>

          <h2>Contact</h2>
          <p>
            Reignara LLC, 5429 N Red Hills Ave, Idaho, United States.
            <br />
            <a href="mailto:support@reignara.com">support@reignara.com</a>
          </p>
        </div>
      </section>

      <SiteFooter />

      <style jsx global>{`
        .policy-content h2 {
          font-family: var(--font-display), 'Bavex', 'Georgia', serif;
          font-size: 28px;
          line-height: 1.2;
          color: var(--t1);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        @media (min-width: 640px) {
          .policy-content h2 {
            font-size: 32px;
            margin-top: 3rem;
          }
        }
        .policy-content h3 {
          font-family: var(--font-display), 'Bavex', 'Georgia', serif;
          font-size: 22px;
          line-height: 1.25;
          color: var(--t1);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        @media (min-width: 640px) {
          .policy-content h3 {
            font-size: 24px;
          }
        }
        .policy-content h4 {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--sage);
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .policy-content p {
          margin: 0;
        }
        .policy-content ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .policy-content ul ul {
          margin-top: 0.5rem;
          margin-left: 1.25rem;
        }
        .policy-content li {
          position: relative;
          padding-left: 1.25rem;
        }
        .policy-content li::before {
          content: '◆';
          position: absolute;
          left: 0;
          top: 0.1em;
          color: var(--sage);
          font-size: 0.7em;
        }
        .policy-content li > p + p {
          margin-top: 0.5rem;
        }
        .policy-content strong {
          color: var(--t1);
          font-weight: 600;
        }
        .policy-content a {
          color: var(--sage);
        }
        .policy-content a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
