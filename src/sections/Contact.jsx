import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS send function
      const response = await window.emailjs.send(
        "zaw.z8n@gmail.com", // Your EmailJS service ID
        "template_spakx2c", // Your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "joe44824@gmail.com",
        },
        "YOS8tT3uhs1oNRTbH" // Your EmailJS public key
      );

      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Include EmailJS script */}
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
      ></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              emailjs.init({
                publicKey: "YOS8tT3uhs1oNRTbH", // Your actual public key
              });
            })();
          `,
        }}
      />

      <div className="w-full py-16 text-white px-4 bg-black relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-[1240px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
              Let's Work Together
            </h1>
            <p className="text-lg">
              Have a project in mind or want to collaborate? I'd love to hear
              from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-[#00df9a]">
                  Get In Touch
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Whether you have a question about my work, want to discuss a
                  potential project, or just want to say hello, feel free to
                  reach out. I'm always excited to connect with fellow
                  developers, designers, and innovators.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#00df9a] rounded-full"></div>
                  <span>Quick response time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#00df9a] rounded-full"></div>
                  <span>Open to new opportunities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#00df9a] rounded-full"></div>
                  <span>Available for freelance work</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg backdrop-blur-sm">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00df9a] text-black rounded-md font-medium py-3 px-6 hover:bg-[#00c589] transition-colors duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="bg-green-500/20 border border-green-500 text-green-200 p-3 rounded-md text-center">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-md text-center">
                    Failed to send message. Please try again or email me
                    directly.
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-400 mt-4 text-center">
                Your message will be sent directly to my inbox.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
