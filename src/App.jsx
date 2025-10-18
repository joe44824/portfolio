import Experience from "./sections/WorkExperience";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Certificates from "./sections/Certificate";
import Contact from "./sections/Contact";
import Test from "./sections/ArticleSteps";
import ArticleHeader from "./sections/ArticleHeader";


const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Experience />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
