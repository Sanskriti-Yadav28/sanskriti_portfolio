import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot/Chatbot";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home">
          <Hero />
          <About />
        </section>
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Chatbot />
    </>
  );
}