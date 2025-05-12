
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import AIChat from "../components/AIChat";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Index = () => {
  // Memperbaiki scroll fade-in animation effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="opacity-0">
        <Hero />
      </section>
      
      <section className="opacity-0">
        <Features />
      </section>
      
      <section className="opacity-0 bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Experience Our AI Tax Assistant</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Try a demo of our conversational AI that makes taxes simple and stress-free.
            </p>
          </div>
          <AIChat />
        </div>
      </section>
      
      <section className="opacity-0">
        <Process />
      </section>
      
      <section className="opacity-0">
        <FAQ />
      </section>
      
      <section className="opacity-0">
        <CTA />
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
