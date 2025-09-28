import React, { useEffect, useState, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiBriefcase, FiAward, FiCode } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const navbarRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Animation variants
  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20 },
  };

  const hoverEffect = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(31, 41, 55, 0.7)",
      transition: { duration: 0.2 },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setNav(false);
    };

    const handleClickOutside = (event) => {
      if (
        nav &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        if (
          menuButtonRef.current &&
          !menuButtonRef.current.contains(event.target)
        ) {
          setNav(false);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [nav]);

  const handleNav = () => setNav(!nav);

  return (
    <div className="flex justify-between items-center p-4 max-w-[1240px] mx-auto relative">
      <motion.div
        className="w-full md:w-auto"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <h1 className="text-3xl font-bold text-[#00df9a] cursor-pointer">
          {"</>"}
        </h1>
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <ul className="flex text-white space-x-6">
          {[
            { label: "Experiences", target: "experience" },
            { label: "Certificates", target: "certificates" },
          ].map((item, index) => (
            <motion.li
              key={item.label}
              className="p-2 relative cursor-pointer"
              whileHover={{ color: "#00df9a", y: -2 }}
              onHoverStart={() => setIsHovering(index)}
              onHoverEnd={() => setIsHovering(null)}
            >
              <a href={`#${item.target}`} className="block">
                {item.label}
              </a>
              {isHovering === index && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#00df9a] w-full"
                  layoutId="underline"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </motion.li>
          ))}
        </ul>

        {/* Let's Chat Button - Desktop */}
        {/* <motion.div
          className="ml-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="flex items-center bg-[#00df9a] text-black font-bold px-4 py-2 rounded-md hover:bg-[#00c78a] transition-colors">
            <FaTelegramPlane className="mr-2" />
            Let's Chat
          </button>
        </motion.div> */}
      </div>

      {/* Mobile Menu Button */}
      <motion.div
        onClick={handleNav}
        className="block md:hidden z-50"
        ref={menuButtonRef}
        whileTap={{ scale: 0.9 }}
      >
        {nav ? (
          <AiOutlineClose size={24} className="text-white" />
        ) : (
          <AiOutlineMenu size={24} className="text-white" />
        )}
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {nav && (
          <motion.div
            ref={navbarRef}
            className="fixed left-0 top-0 w-[75%] sm:w-[60%] h-full bg-[#000300] z-40 shadow-2xl"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div
              className="absolute left-4 top-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-[#00df9a]">{"</>"}</h1>
            </motion.div>

            <ul className="uppercase p-4 pt-20 space-y-6">
              {[
                {
                  icon: <FiBriefcase className="mr-3 text-[#00df9a] text-xl" />,
                  text: "Experiences",
                  target: "experience",
                },
                {
                  icon: <FiAward className="mr-3 text-[#00df9a] text-xl" />,
                  text: "Certificates",
                  target: "certificates",
                },
                // {
                //   icon: <FiCode className="mr-3 text-[#00df9a] text-xl" />,
                //   text: "Projects",
                //   target: "projects",
                // },
                // {
                //   icon: (
                //     <FaTelegramPlane className="mr-3 text-[#00df9a] text-xl" />
                //   ),
                //   text: "Contact",
                //   target: "contact",
                // },
              ].map((item, index) => (
                <motion.li
                  key={item.text}
                  className="flex items-center p-4 border-b border-gray-600 text-white cursor-pointer rounded-md"
                  variants={itemVariants}
                  whileHover={hoverEffect.hover}
                  onClick={() => {
                    // smooth scroll
                    document.getElementById(item.target)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    // close menu after click
                    setNav(false);
                  }}
                >
                  {item.icon}
                  <span className="inline-block">
                    {item.text}
                    <motion.span
                      className="block h-0.5 bg-[#00df9a] origin-left mt-1"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
