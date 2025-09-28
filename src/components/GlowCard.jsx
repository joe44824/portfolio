import { useRef, useState, useEffect } from "react";

const GlowCard = ({ card, index, children }) => {
  // refs for all the cards
  const cardRefs = useRef([]);
  const dropdownRef = useRef(null);

  // State for dropdown functionality
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTool, setHoveredTool] = useState(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHoveredTool(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll on mobile to close dropdown
  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
      setHoveredTool(null);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToolClick = (tool, toolIndex, e) => {
    e.stopPropagation(); // Prevent card click events
    setHoveredTool(toolIndex);
    setIsOpen(true);
  };

  const handleToolHover = (toolIndex) => {
    setHoveredTool(toolIndex);
    setIsOpen(true);
  };

  const handleToolMouseLeave = () => {
    // Close dropdown when mouse leaves the tool area
    setTimeout(() => {
      setIsOpen(false);
      setHoveredTool(null);
    }, 150); // Small delay to prevent flickering when moving between tools
  };

  // Get tool details from card data
  const getToolDetails = (toolPath, toolIndex) => {
    // Extract tool name from path
    const getToolName = (path) => {
      // Remove file extension and convert to proper case
      const name = path
        .replace(".png", "")
        .replace(".jpg", "")
        .replace(".svg", "");

      // Handle special cases
      if (name === "nodejs") return "Node.js";
      if (name === "javascript") return "JavaScript";
      if (name === "typescript") return "TypeScript";
      if (name === "raspberrypi") return "Raspberry Pi";
      if (name === "r_language") return "R Language";
      if (name === "rapidMiner") return "RapidMiner";

      // Capitalize first letter for others
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    return {
      name: getToolName(toolPath),
      description:
        card?.toolDescriptions?.[toolIndex] ||
        "Technology used in this project",
    };
  };

  // when mouse moves over a card, rotate the glow effect
  const handleMouseMove = (index) => (e) => {
    // get the current card
    const card = cardRefs.current[index];
    if (!card) return;

    // get the mouse position relative to the card
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // calculate the angle from the center of the card to the mouse
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

    // adjust the angle so that it's between 0 and 360
    angle = (angle + 360) % 360;

    // set the angle as a CSS variable
    card.style.setProperty("--start", angle + 60);
  };

  // return the card component with the mouse move event
  return (
    <div className="relative">
      <div
        ref={(el) => (cardRefs.current[index] = el)}
        onMouseMove={handleMouseMove(index)}
        className="card card-border timeline-card
        /* Mobile (default) - smallest size */
        rounded-md p-2 mb-2 w-full
        /* Tablet - medium size */
        md:rounded-lg md:p-3 md:mb-3 md:w-4/5
        /* Desktop - larger size */
        lg:rounded-xl lg:p-4 lg:mb-4 lg:w-3/4
        /* Extra large - largest size */
        xl:rounded-xl xl:p-5 xl:mb-5 xl:w-full
        /* 2XL - premium spacing */
        2xl:p-6 2xl:mb-6
        break-inside-avoid-column"
      >
        <div className="glow"></div>

        {/* Enhanced children with tool interaction */}
        <div>
          {/* Render other children content first */}
          {children}

          {/* Only render tool interactions if toolImagesPaths exists */}
          {card?.toolImagesPaths && (
            <div
              className="flex justify-around items-center py-3"
              onMouseLeave={handleToolMouseLeave}
            >
              {card.toolImagesPaths.map((logo, toolIndex) => (
                <div
                  key={logo}
                  className="relative cursor-pointer transform transition-all duration-200 hover:scale-110"
                  onClick={(e) => handleToolClick(logo, toolIndex, e)}
                  onMouseEnter={() => handleToolHover(toolIndex)}
                >
                  <img
                    src={logo}
                    className={`h-12 w-12 object-contain p-1 rounded-lg transition-all duration-200 ${
                      hoveredTool === toolIndex
                        ? "bg-blue-100 shadow-md border-2 border-blue-300"
                        : "hover:bg-gray-50"
                    }`}
                    alt="Technology logo"
                  />

                  {/* Hover indicator */}
                  {hoveredTool === toolIndex && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {isOpen &&
        hoveredTool !== null &&
        card?.toolImagesPaths?.[hoveredTool] && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-in slide-in-from-top-2 duration-200"
            style={{ minWidth: "280px" }}
          >
            <div className="p-4">
              {(() => {
                const toolDetails = getToolDetails(
                  card.toolImagesPaths[hoveredTool],
                  hoveredTool
                );
                return (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={card.toolImagesPaths[hoveredTool]}
                        className="h-8 w-8 object-contain"
                        alt="Technology logo"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {toolDetails.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm">
                      {toolDetails.description}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
    </div>
  );
};

export default GlowCard;
