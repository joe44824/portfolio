import React, { useState, useRef, useCallback } from "react";

const JenkinsInfoTemplate = () => {
  const [expanded, setExpanded] = useState({});
  const [copied, setCopied] = useState(null);
  const codeRefs = useRef([]);

  const steps = [
    {
      title: "Install Jenkins",
      desc: "Install Jenkins and start the service.",
      code: `sudo apt update
sudo apt install jenkins -y
sudo systemctl enable --now jenkins`,
    },
    {
      title: "Create Pipeline",
      desc: "Define a simple build and test pipeline.",
      code: `pipeline {
  agent any
  stages {
    stage('Build'){ steps{ sh 'npm install' } }
    stage('Test'){ steps{ sh 'npm test' } }
  }
}`,
    },
  ];

  const copyCode = useCallback(async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(index);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, []);

  const toggleStep = useCallback((index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));

    setTimeout(() => {
      codeRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  }, []);

  const setCodeRef = useCallback(
    (index) => (el) => {
      codeRefs.current[index] = el;
    },
    []
  );

  const backgroundElements = [
    { position: "top-0 left-0", color: "red", size: "w-72 h-72" },
    { position: "top-1/3 right-0", color: "teal", size: "w-96 h-96" },
    { position: "bottom-0 left-1/4", color: "yellow", size: "w-80 h-80" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-16">
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
      <div className="max-w-4xl w-full space-y-16">
        {/* Steps */}
        <div className="space-y-10">
          {steps.map((step, index) => (
            <div
              key={step.title}
              ref={setCodeRef(index)}
              className="space-y-4 p-6 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 bg-teal-500 text-black rounded-full text-sm font-bold">
                      {index + 1}
                    </span>
                    <h2 className="text-2xl font-semibold">{step.title}</h2>
                  </div>
                  <p className="text-gray-400 ml-11">{step.desc}</p>
                </div>
              </div>

              <button
                onClick={() => toggleStep(index)}
                className="text-teal-400 hover:text-teal-300 text-sm flex items-center gap-1 ml-11 transition-colors"
              >
                {expanded[index] ? "Hide Code ▲" : "Show Code ▼"}
              </button>

              <div
                className={`transition-all duration-500 overflow-hidden ${
                  expanded[index]
                    ? "max-h-[1000px] opacity-100 mt-3"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="relative bg-gray-800 p-4 rounded-lg border border-gray-700 ml-11">
                  <button
                    onClick={() => copyCode(step.code, index)}
                    className="absolute top-3 right-3 text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded border border-gray-600 transition-colors"
                  >
                    {copied === index ? "✓ Copied" : "Copy"}
                  </button>
                  <pre className="text-gray-100 text-sm overflow-x-auto pt-1">
                    <code className="font-mono">{step.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          Need help? Check the{" "}
          <a
            href="https://www.jenkins.io/doc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300 underline"
          >
            Jenkins Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default JenkinsInfoTemplate;
