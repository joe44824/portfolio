import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

const cardVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const avatarVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const lineVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const avatarBgColors = [
  "bg-gradient-to-br from-blue-400/30 to-blue-600/30",
  "bg-white",
  "bg-white",
  "bg-white",
  "bg-white",
];

const middleRingColors = [
  "bg-gradient-to-br from-blue-300/20 to-blue-400/20",
  "bg-gradient-to-br from-purple-300/20 to-purple-400/20",
  "bg-gradient-to-br from-emerald-300/20 to-emerald-400/20",
  "bg-gradient-to-br from-amber-300/20 to-amber-400/20",
  "bg-gradient-to-br from-rose-300/20 to-rose-400/20",
];

const outerRingColors = [
  "border-blue-300/30",
  "border-purple-300/30",
  "border-emerald-300/30",
  "border-amber-300/30",
  "border-rose-300/30",
];

const glowColors = [
  "shadow-blue-500/20",
  "shadow-purple-500/20",
  "shadow-emerald-500/20",
  "shadow-amber-500/20",
  "shadow-rose-500/20",
];

const lineColors = [
  "from-blue-400/60 to-purple-400/60",
  "from-purple-400/60 to-emerald-400/60",
  "from-emerald-400/60 to-amber-400/60",
  "from-amber-400/60 to-rose-400/60",
];

const AnimatedCard = ({
  logo,
  title,
  date,
  responsibilities,
  index,
  isLast,
}) => {
  const [cardRef, cardInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [lineRef, lineInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={cardRef} className="relative mb-20 flex items-start gap-8">
      {/* Avatar on the left */}
      <motion.div
        initial="hidden"
        animate={cardInView ? "visible" : "hidden"}
        variants={avatarVariants}
        transition={{ delay: index * 0.2 }}
        className="relative z-10 flex-shrink-0"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className={`relative w-28 h-28 rounded-full ${outerRingColors[index]} border-2 flex items-center justify-center ${glowColors[index]} shadow-2xl hover:shadow-3xl transition-shadow duration-500`}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
          />
          <div
            className={`absolute w-24 h-24 rounded-full  flex items-center justify-center backdrop-blur-sm`}
          >
            <div
              className={`w-20 h-20 rounded-full ${avatarBgColors[index]} flex items-center justify-center p-3 backdrop-blur-sm`}
            >
              <img
                src={logo}
                alt={title}
                className="w-12 h-12 object-contain drop-shadow-lg"
                style={{ filter: "contrast(1.2) brightness(1.2)" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Card content */}
      <motion.div
        initial="hidden"
        animate={cardInView ? "visible" : "hidden"}
        variants={cardVariants}
        transition={{ delay: index * 0.2 + 0.1 }}
        className="flex-1 px-8 py-8 rounded-2xl bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group"
      >
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 + 0.3 }}
          className="text-2xl md:text-3xl font-semibold text-white mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 + 0.4 }}
          className="text-xl text-gray-300 mb-8 font-medium"
        >
          {date}
        </motion.p>

        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 + 0.5 }}
          className="text-xl text-white font-semibold mb-6 flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          Key Responsibilities
        </motion.h4>
        <ul className="space-y-4 pl-2">
          {responsibilities.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 + 0.6 + i * 0.1 }}
              className="text-gray-300 text-lg leading-relaxed flex items-start group/item"
            >
              <div className="mr-4 mt-2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300"></div>
              <span className="group-hover/item:text-white transition-colors duration-300">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AnimatedCard;
