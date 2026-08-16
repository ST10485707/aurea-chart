import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import NewArrivals from "./components/NewArrivals";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex-1">
        <Hero />
      </main>
      <Categories />
      <NewArrivals />
      <Footer />
    </div>
    
  );
}