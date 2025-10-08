import { useState } from "react";

const JenkinsInfoTemplate = ({
  topicBadge = "Continuous Integration & Deployment",
  mainTitle = "Jenkins:",
  highlightedText = "CI/CD",
  subtitle = "What is Jenkins, why do we use it and what are its disadvantages?",
  readingTime = "10 min read",
  publishDate = "October 6 2025",
  tools = [
    {
      name: "Jenkins",
      image: "jenkins.png",
      description:
        "Open source automation server for building, testing, and deploying code",
    },
    {
      name: "Git",
      image: "git.png",
      description:
        "Distributed version control system for tracking changes in source code",
    },
    {
      name: "NodeJS",
      image: "nodejs.png",
      description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
    },
    {
      name: "Kubernetes",
      image: "kubernetes.png",
      description:
        "Container orchestration system for automating deployment and management",
    },
    {
      name: "Docker",
      image: "docker.png",
      description:
        "Platform for developing, shipping, and running applications in containers",
    },
  ],
}) => {
  const backgroundElements = [
    { position: "top-0 left-0", color: "red", size: "w-72 h-72" },
    { position: "top-1/3 right-0", color: "teal", size: "w-96 h-96" },
    { position: "bottom-0 left-1/4", color: "yellow", size: "w-80 h-80" },
  ];

  const gradientColors = "from-red-400 via-teal-400 to-yellow-400";
  const textAlignment = "center lg:text-left";
  const toolsAlignment = "justify-center lg:justify-start";

  const [activeTool, setActiveTool] = useState(null);

  // Function to calculate tooltip position
  const getTooltipPosition = (index) => {
    if (typeof window === "undefined") return "bottom";

    const isMobile = window.innerWidth < 1024; // lg breakpoint
    if (!isMobile) return "bottom";

    // For mobile, position tooltips above for last 2 items to prevent cutoff
    return index >= tools.length - 2 ? "top" : "bottom";
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {backgroundElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.position} ${element.size} bg-${
              element.color
            }-500/10 rounded-full blur-3xl animate-pulse ${
              index === 1 ? "delay-1000" : index === 2 ? "delay-2000" : ""
            }`}
          ></div>
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left content - Main text */}
            <div
              className={`lg:col-span-7 space-y-6 sm:space-y-8 ${textAlignment}`}
            >
              {/* Topic badge */}
              <div className="inline-flex items-center justify-center lg:justify-start">
                <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                  <p className="text-gray-400 text-xs sm:text-sm tracking-widest uppercase font-medium">
                    {topicBadge}
                  </p>
                </div>
              </div>

              {/* Main heading */}
              <div className="space-y-2 sm:space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-none">
                  <span className="font-extralight">{mainTitle}</span>{" "}
                  <span
                    className={`bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent font-medium`}
                  >
                    {highlightedText}
                  </span>
                </h1>
                <h3 className="text-xl sm:text-2xl text-gray-300 font-light">
                  {subtitle}
                </h3>
              </div>

              {/* Reading time */}
              <div className="flex items-center text-gray-500 justify-center lg:justify-start">
                <span className="mr-4 text-sm">{readingTime}</span>
                <span className="text-sm">{publishDate}</span>
              </div>

              {/* Tools Section */}
              <div className="pt-6">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">
                  Tools:
                </h2>
                <div className={`flex flex-wrap gap-3 ${toolsAlignment}`}>
                  {tools.map((tool, index) => {
                    const tooltipPosition = getTooltipPosition(index);

                    return (
                      <div
                        key={index}
                        className="relative"
                        onMouseEnter={() => setActiveTool(tool.name)}
                        onMouseLeave={() => setActiveTool(null)}
                        onClick={() =>
                          setActiveTool(
                            activeTool === tool.name ? null : tool.name
                          )
                        }
                      >
                        <button className="group px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 rounded-full font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                          {/* Tool Icon */}
                          <div className="w-5 h-5 flex items-center justify-center">
                            <img
                              src={tool.image}
                              alt={tool.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="relative z-10">{tool.name}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-full"></div>
                        </button>

                        {/* Responsive Tooltip */}
                        {activeTool === tool.name && (
                          <div
                            className={`
                            absolute z-50 w-64 p-3 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white text-sm rounded-xl shadow-2xl
                            ${
                              tooltipPosition === "top"
                                ? "bottom-full mb-2"
                                : "top-full mt-2"
                            }
                            ${index === 0 ? "left-0" : ""}
                            ${index === tools.length - 1 ? "right-0" : ""}
                            ${
                              index > 0 && index < tools.length - 1
                                ? "left-1/2 transform -translate-x-1/2"
                                : ""
                            }
                          `}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 flex items-center justify-center">
                                <img
                                  src={tool.image}
                                  alt={tool.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <h4 className="font-semibold text-gray-200 text-base">
                                {tool.name}
                              </h4>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {tool.description}
                            </p>

                            {/* Tooltip arrow */}
                            <div
                              className={`
                              absolute w-3 h-3 bg-gray-900 border-l border-t border-gray-700/50 transform rotate-45
                              ${
                                tooltipPosition === "top"
                                  ? "top-full -mt-1 left-4 border-b border-r border-l-0 border-t-0"
                                  : "bottom-full -mb-1 left-4 border-r border-b border-t-0 border-l-0"
                              }
                              ${
                                index === tools.length - 1
                                  ? "right-4 left-auto"
                                  : ""
                              }
                              ${
                                index > 0 && index < tools.length - 1
                                  ? "left-1/2 -translate-x-1/2"
                                  : ""
                              }
                            `}
                            ></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JenkinsInfoTemplate;
