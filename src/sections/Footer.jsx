import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function PortfolioFooter() {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:your@email.com", label: "Email" },
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-800 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Social links */}
        <div className="flex justify-center space-x-8 mb-8">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          © 2025 Joe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
