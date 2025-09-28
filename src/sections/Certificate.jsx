import React from "react";
import { Award, Calendar, ExternalLink, CheckCircle } from "lucide-react";

// AnimatedBackground component
const AnimatedBackground = ({
  children,
  className = "",
  variant = "default",
  intensity = "normal",
}) => {
  const variants = {
    default: {
      orb1: "bg-red-500/10",
      orb2: "bg-teal-500/10",
      orb3: "bg-yellow-500/10",
    },
    blue: {
      orb1: "bg-blue-500/10",
      orb2: "bg-cyan-500/10",
      orb3: "bg-indigo-500/10",
    },
    green: {
      orb1: "bg-green-500/10",
      orb2: "bg-emerald-500/10",
      orb3: "bg-lime-500/10",
    },
    purple: {
      orb1: "bg-purple-500/10",
      orb2: "bg-violet-500/10",
      orb3: "bg-pink-500/10",
    },
    warm: {
      orb1: "bg-orange-500/10",
      orb2: "bg-red-500/10",
      orb3: "bg-amber-500/10",
    },
  };

  const intensityLevels = {
    subtle: "/5",
    normal: "/10",
    strong: "/20",
  };

  const selectedVariant = variants[variant] || variants.default;
  const opacityLevel = intensityLevels[intensity] || intensityLevels.normal;

  const adjustedVariant = {
    orb1: selectedVariant.orb1.replace("/10", opacityLevel),
    orb2: selectedVariant.orb2.replace("/10", opacityLevel),
    orb3: selectedVariant.orb3.replace("/10", opacityLevel),
  };

  return (
    <div className={`bg-black relative overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <div
          className={`absolute top-0 left-0 w-72 h-72 ${adjustedVariant.orb1} rounded-full blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute top-1/3 right-0 w-96 h-96 ${adjustedVariant.orb2} rounded-full blur-3xl animate-pulse`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute bottom-0 left-1/4 w-80 h-80 ${adjustedVariant.orb3} rounded-full blur-3xl animate-pulse`}
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      date: "2024",
      status: "Active",
      credentialId: "CKA-2024-001234",
      verifyUrl: "#",
      logo: "🚢",
      color: "from-cyan-400 via-blue-500 to-purple-600",
      skills: ["Kubernetes", "Container Orchestration", "Cluster Management"],
    },
    {
      id: 2,
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023",
      status: "Active",
      credentialId: "AWS-CP-001234",
      verifyUrl: "#",
      logo: "☁️",
      color: "from-orange-400 via-red-500 to-pink-600",
      skills: ["AWS", "Cloud Fundamentals", "Cloud Services"],
    },
  ];

  return (
    <section id="certificates">
      <AnimatedBackground
        className="min-h-screen"
        variant="blue"
        intensity="subtle"
      >
        <div className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-20">
              <div className="relative inline-block mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="relative">
                <h1
                  className="text-6xl md:text-7xl font-bold mb-6"
                  style={{
                    animation: "fadeInUp 0.8s ease-out forwards",
                  }}
                >
                  <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Professional
                  </span>
                  <br />
                  <span
                    className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                    style={{
                      backgroundSize: "200% auto",
                      animation: "shimmer 3s linear infinite",
                    }}
                  >
                    Certificates
                  </span>
                </h1>

                {/* Glowing underline */}
                <div
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
                  style={{
                    animation: "glow 2s ease-in-out infinite",
                  }}
                ></div>
              </div>

              <p
                className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mt-12 opacity-0"
                style={{
                  animation: "fadeInUp 0.8s ease-out 0.3s forwards",
                }}
              >
                Showcasing my commitment to continuous learning and professional
                development across
                <span className="text-cyan-400 font-semibold">
                  {" "}
                  cloud technologies
                </span>{" "}
                and
                <span className="text-blue-400 font-semibold">
                  {" "}
                  DevOps practices
                </span>
                .
              </p>

              <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-400">
                <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{certificates.length} Active Certifications</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span>Updated 2024</span>
                </div>
              </div>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="group relative bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden"
                >
                  {/* Gradient Header */}
                  <div
                    className={`h-36 bg-gradient-to-r ${cert.color} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>

                    {/* Logo */}
                    <div className="absolute top-6 right-6">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="text-3xl">{cert.logo}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute bottom-6 left-6">
                      <div className="flex items-center gap-2 text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {cert.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {cert.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{cert.issuer}</p>

                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span>{cert.date}</span>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 text-xs rounded-full font-medium border border-gray-600/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Credential Info */}
                    <div className="border-t border-gray-800 pt-4">
                      <p className="text-xs text-gray-500 mb-4">
                        Credential ID:{" "}
                        <span className="font-mono text-gray-400">
                          {cert.credentialId}
                        </span>
                      </p>
                      <a
                        href={cert.verifyUrl}
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Verify Certificate
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: -200% 0;
          }
          50% {
            background-position: 200% 0;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.8);
          }
        }
      `}</style>
      </AnimatedBackground>
    </section>
  );
};

export default Certificates;
