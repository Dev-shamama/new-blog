import BlogSection from "@/components/BlogSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <BlogSection />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
