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
    <div className="space-y-14">
      <section className="grid items-center gap-8 rounded-3xl bg-black p-10 text-white md:grid-cols-2">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-widest text-brand-accent">New Collection 2026</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Premium essentials for everyday icons.</h1>
          <p className="text-zinc-300">Minimal, bold, and designed to stand out without saying too much.</p>
          <Link href="/products" className="inline-block rounded-full bg-brand-accent px-6 py-3 font-medium text-black">
            Shop Now
          </Link>
        </div>
        <div className="rounded-2xl border border-zinc-700 p-8">
          <p className="text-2xl font-medium">NOIRVAULT</p>
          <p className="mt-2 text-zinc-400">The luxury baseline for Gen Z wardrobes.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">Featured Products</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category} href={`/products?category=${category}`} className="rounded-xl border border-zinc-300 p-5 text-lg dark:border-zinc-700">
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
        <h3 className="text-xl font-semibold">Join the NOIRVAULT list</h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Get early access to drops and member-only offers.</p>
        <form className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input type="email" required placeholder="you@example.com" className="w-full rounded-full border border-zinc-300 px-4 py-2 outline-none dark:border-zinc-700 dark:bg-zinc-900" />
          <button className="rounded-full bg-brand-black px-5 py-2 text-white dark:bg-brand-accent dark:text-black">Subscribe</button>
        </form>
      </section>
    </div>
  );
}
