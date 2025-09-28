import React, { useEffect, useState } from "react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const sentences = [
    "DevOps Engineer with a strong passion for Kubernetes and container orchestration",
    "Certified CKA (Certified Kubernetes Administrator) with hands-on experience managing production-grade clusters",
    "Enthusiastic about system design and architecture, especially building scalable and resilient infrastructures",
    "Thrive on solving complex technical challenges and optimizing deployment pipelines",
    "Experienced in CI/CD, infrastructure as code (IaC), and cloud-native tooling",
    "Adept at troubleshooting, performance tuning, and implementing automation to reduce manual overhead",
    "Love staying on the cutting edge of DevOps practices, experimenting with new tools, and sharing knowledge",
  ];

  // Typewriter effect
  useEffect(() => {
    if (currentSentence >= sentences.length) {
      setCurrentSentence(0);
      setCurrentIndex(0);
      setIsDeleting(false);
      setDisplayText("");
      return;
    }

    const sentence = sentences[currentSentence];
    let timeout;

    if (!isDeleting && currentIndex < sentence.length) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + sentence[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 60);
    } else if (!isDeleting && currentIndex === sentence.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, 30);
    } else if (isDeleting && displayText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentSentence((prev) => prev + 1);
        setCurrentIndex(0);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, currentSentence, isDeleting, displayText]);

  const handleDownload = (format) => {
    // Path to your files (assuming they're in public/documents/)
    const filePaths = {
      pdf: "/documents/zaw_wana_resume.pdf",
      docx: "/documents/zaw_wana_resume.docx",
    };

    const link = document.createElement("a");
    link.href = filePaths[format];
    link.download = `zaw_wana_(joe)_resume.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowDropdown(false);
  };

  // Close dropdown on any interaction
  useEffect(() => {
    const handleInteraction = (event) => {
      if (showDropdown && !event.target.closest(".dropdown-container")) {
        setShowDropdown(false);
      }
    };

    const handleScroll = () => {
      if (showDropdown) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleInteraction);
      document.addEventListener("touchstart", handleInteraction);
      document.addEventListener("scroll", handleScroll, true);
      document.addEventListener("wheel", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("wheel", handleScroll);
    };
  }, [showDropdown]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left content - Main text */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Role badge */}
              <div className="inline-flex items-center justify-center lg:justify-start">
                <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                  <p className="text-gray-400 text-xs sm:text-sm tracking-widest uppercase font-medium">
                    DevOps Engineer & Full-Stack Developer
                  </p>
                </div>
              </div>

              {/* Main heading */}
              <div className="space-y-2 sm:space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-none">
                  <span className="font-extralight">Hi, I'm</span>{" "}
                  <span className="bg-gradient-to-r from-red-400 via-teal-400 to-yellow-400 bg-clip-text text-transparent font-medium">
                    Joe
                  </span>
                </h1>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-4">
                {/* Portfolio button with dropdown */}
                <div className="relative dropdown-container w-full sm:w-auto">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="group relative w-full px-6 py-2.5 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative z-10 tracking-wide">
                      VIEW PORTFOLIO
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-full sm:w-56 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50 overflow-hidden transition-all duration-300 origin-top ${
                      showDropdown
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-[-8px] pointer-events-none"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-blue-500/3"></div>

                    <div className="p-1.5">
                      <button
                        onClick={() => handleDownload("pdf")}
                        className="w-full px-3 py-2.5 text-left text-gray-300 hover:bg-gradient-to-r hover:from-red-500/8 hover:to-red-400/4 hover:text-white transition-all duration-300 flex items-center group/item relative overflow-hidden rounded-lg text-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/15 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        <div className="flex items-center relative z-10 w-full">
                          <div className="relative">
                            <svg
                              className="w-4 h-4 mr-3 text-red-400 group-hover/item:text-red-300 transition-all duration-300 group-hover/item:scale-105"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                            <div className="absolute inset-0 bg-red-400/20 rounded-full blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="flex-1">
                            <span className="font-medium group-hover/item:translate-x-0.5 transition-transform duration-300 block">
                              Download as PDF
                            </span>
                            <span className="text-xs text-gray-500 group-hover/item:text-gray-400 mt-0.5">
                              Portable format
                            </span>
                          </div>
                        </div>
                      </button>

                      <div className="h-px bg-gradient-to-r from-transparent via-gray-700/30 to-transparent my-1"></div>

                      <button
                        onClick={() => handleDownload("docx")}
                        className="w-full px-3 py-2.5 text-left text-gray-300 hover:bg-gradient-to-r hover:from-blue-500/8 hover:to-blue-400/4 hover:text-white transition-all duration-300 flex items-center group/item relative overflow-hidden rounded-lg text-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        <div className="flex items-center relative z-10 w-full">
                          <div className="relative">
                            <svg
                              className="w-4 h-4 mr-3 text-blue-400 group-hover/item:text-blue-300 transition-all duration-300 group-hover/item:scale-105"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="flex-1">
                            <span className="font-medium group-hover/item:translate-x-0.5 transition-transform duration-300 block">
                              Download as Word
                            </span>
                            <span className="text-xs text-gray-500 group-hover/item:text-gray-400 mt-0.5">
                              Editable format
                            </span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <a
                  href="https://calendly.com/zaw-z8n/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 border border-gray-500 text-gray-300 text-sm font-medium hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300 hover:scale-[1.02] tracking-wide"
                >
                  CONTACT ME
                </a>
              </div>
            </div>

            {/* Right content - Terminal window */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-lg">
                <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Terminal header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/50 bg-gray-800/50">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                    </div>
                    <div className="text-gray-400 text-sm font-mono">
                      joe@terminal
                    </div>
                  </div>

                  {/* Terminal content */}
                  <div className="p-6 h-32 sm:h-40 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50"></div>
                    <div className="relative z-10 h-full flex items-start">
                      <div className="text-gray-300 leading-relaxed">
                        <span className="text-green-400 font-mono text-sm">
                          ${" "}
                        </span>
                        <span className="font-mono text-sm sm:text-base">
                          {displayText}
                          <span className="animate-pulse text-green-400 ml-1">
                            ▋
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
