import React from "react";

export default AnimatedBackground = ({
  children,
  className = "",
  variant = "default",
  intensity = "normal",
}) => {
  // Different color variants for different pages/sections
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

  // Different intensity levels
  const intensityLevels = {
    subtle: "/5",
    normal: "/10",
    strong: "/20",
  };

  const selectedVariant = variants[variant] || variants.default;
  const opacityLevel = intensityLevels[intensity] || intensityLevels.normal;

  // Apply opacity to selected variant
  const adjustedVariant = {
    orb1: selectedVariant.orb1.replace("/10", opacityLevel),
    orb2: selectedVariant.orb2.replace("/10", opacityLevel),
    orb3: selectedVariant.orb3.replace("/10", opacityLevel),
  };

  return (
    <div className={`bg-black relative overflow-hidden ${className}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-0 left-0 w-72 h-72 ${adjustedVariant.orb1} rounded-full blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute top-1/3 right-0 w-96 h-96 ${adjustedVariant.orb2} rounded-full blur-3xl animate-pulse delay-1000`}
        ></div>
        <div
          className={`absolute bottom-0 left-1/4 w-80 h-80 ${adjustedVariant.orb3} rounded-full blur-3xl animate-pulse delay-2000`}
        ></div>
      </div>

      {/* Content with proper z-index */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
