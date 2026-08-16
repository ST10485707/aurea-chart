import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex-1">
        <Hero />
      </main>
    </div>
  );
}