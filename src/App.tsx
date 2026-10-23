import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Partners from './components/Partners';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useScrollReveal } from './lib/motion';

export default function App() {
  useScrollReveal();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Products />
        <About />
        <Contact />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
