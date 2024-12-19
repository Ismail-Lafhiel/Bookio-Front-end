// components/layouts/DashboardFooter.tsx
import { FC } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import {
  HiOutlineSupport,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";

const DashboardFooter: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-sm mt-8 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Top Section with Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b dark:border-gray-700">
          {/* Help & Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Help & Support
            </h3>
            <ul className="space-y-3">
              <FooterLink
                icon={<HiOutlineSupport />}
                text="Support Center"
                href="/dashboard/support"
              />
              <FooterLink
                icon={<HiOutlineDocumentText />}
                text="Documentation"
                href="/dashboard/docs"
              />
              <FooterLink
                icon={<HiOutlineQuestionMarkCircle />}
                text="FAQ"
                href="/dashboard/faq"
              />
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard/settings"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/profile"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500"
                >
                  Your Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/privacy"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p>Email: support@bookio.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Hours: Mon-Fri 9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} BookIO. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <SocialLink
              href="https://github.com"
              icon={<FaGithub />}
              label="GitHub"
            />
            <SocialLink
              href="https://twitter.com"
              icon={<FaTwitter />}
              label="Twitter"
            />
            <SocialLink
              href="https://linkedin.com"
              icon={<FaLinkedinIn />}
              label="LinkedIn"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
interface FooterLinkProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

const FooterLink: FC<FooterLinkProps> = ({ icon, text, href }) => {
  return (
    <li>
      <Link
        to={href}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500"
      >
        <span className="mr-2 text-lg">{icon}</span>
        <span className="text-sm">{text}</span>
      </Link>
    </li>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: FC<SocialLinkProps> = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
      aria-label={label}
    >
      <span className="text-xl">{icon}</span>
    </a>
  );
};

export default DashboardFooter;
