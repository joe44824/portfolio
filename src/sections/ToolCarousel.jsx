import React from "react";

const ToolCarousel = () => {
  const tools = [
    {
      image: "argocd.png",
      name: "ArgoCD",
    },
    {
      image: "kubernetes.png",
      name: "Kubernetes",
    },
    {
      image: "docker.png",
      name: "Docker",
    },
    {
      image: "gitlab.png",
      name: "GitLab",
    },
    {
      image: "prometheus.png",
      name: "Prometheus",
    },
    {
      image: "grafana.png",
      name: "Grafana",
    },
    {
      image: "jenkins.png",
      name: "Jenkins",
    },
    {
      image: "linux.png",
      name: "Linux",
    },
  ];

  // Duplicate the tools array to create seamless infinite loop
  const duplicatedTools = [...tools, ...tools];

  return (
    <div className="w-full py-4 md:py-8 lg:py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden group">
          {/* First Carousel */}
          <div className="absolute flex items-center h-full animate-[slide_20s_linear_infinite] whitespace-nowrap">
            {duplicatedTools.map(({ image, name, color }, index) => (
              <div
                key={`first-${index}`}
                className={`flex flex-col items-center justify-center mx-3 sm:mx-4 p-4 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${color} min-w-[90px] sm:min-w-[100px] md:min-w-[110px] h-[120px] sm:h-[140px] md:h-[160px]`}
              >
                <img
                  src={image}
                  alt={name}
                  className="object-contain h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 mb-2 sm:mb-3"
                />
                <p className="text-xs sm:text-sm font-medium text-gray-300 text-center">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default ToolCarousel;
