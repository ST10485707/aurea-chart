import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex-1">
        <p className="text-center py-20 text-[var(--color-coffee)]">
          Homepage sections coming soon.
        </p>
      </main>
    </div>
  );
}