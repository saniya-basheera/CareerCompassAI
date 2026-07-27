import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import Features from "../../components/Features/Features";
import HowItWorks from "../../components/HowItWorks/HowItWorks";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <Features />
      <HowItWorks />
    </>
  );
}

export default Home;