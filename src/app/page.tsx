import Searchbar from "@/components/Searchbar";
import ProductList from "@/components/ProductList";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gradient-to-b from-primary to-primary/90 px-4 py-12 md:px-6">
      <div className="max-w-md w-full space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
          Join our waitlist
        </h1>
        <p className="text-slate-400 md:text-lg">Be the first to know when we launch our new product.</p>
        <Searchbar />
        <UserButton/>
      </div>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          <ProductList />
        </div>
      </section>
    </div>
  );
}
