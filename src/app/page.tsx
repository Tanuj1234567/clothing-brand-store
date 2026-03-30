import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { sampleProducts, categories } from "@/lib/sample-data";
import ProductCard from "@/components/ProductCard";

async function getFeaturedProducts() {
  if (!process.env.MONGODB_URI) {
    return sampleProducts.map((p, idx) => ({ ...p, _id: `sample-${idx}` }));
  }

  await connectDB();
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(sampleProducts);
    }
    const items = await Product.find().limit(6).lean();
    return JSON.parse(JSON.stringify(items));
  } catch {
    return sampleProducts.map((p, idx) => ({ ...p, _id: `sample-${idx}` }));
  }
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <div className="space-y-20">
      <section className="grid items-center gap-10 rounded-[2rem] bg-black p-8 text-white sm:p-10 lg:grid-cols-2 lg:p-14">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-accent">New Collection 2026</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Premium essentials for everyday icons.</h1>
          <p className="max-w-lg text-zinc-300">Minimal, bold, and designed to stand out without saying too much.</p>
          <Link href="/products" className="btn-primary inline-block">
            Shop Now
          </Link>
        </div>
        <div className="rounded-3xl border border-zinc-700 p-8">
          <p className="text-xl font-medium tracking-[0.15em]">NOIRVAULT</p>
          <p className="mt-3 text-zinc-400">The luxury baseline for Gen Z wardrobes.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">Featured Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category} href={`/products?category=${category}`} className="rounded-2xl border border-zinc-300 p-6 text-lg transition duration-300 hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-lg dark:border-zinc-700 dark:hover:border-zinc-500">
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="card-surface rounded-3xl p-8 sm:p-10">
        <h3 className="text-xl font-semibold">Join the NOIRVAULT list</h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Get early access to drops and member-only offers.</p>
        <form className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input type="email" required placeholder="you@example.com" className="w-full rounded-full border border-zinc-300 px-5 py-2.5 text-sm outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-500" />
          <button className="btn-primary">Subscribe</button>
        </form>
      </section>
    </div>
  );
}
