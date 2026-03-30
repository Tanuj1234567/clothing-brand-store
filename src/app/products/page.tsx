import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import ProductCard from "@/components/ProductCard";
import { sampleProducts } from "@/lib/sample-data";
import Link from "next/link";

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string; sort?: string; min?: string; max?: string }>;
}) {
  const params = await searchParams;
  if (!process.env.MONGODB_URI) {
    const data = sampleProducts.map((p, idx) => ({ ...p, _id: `sample-${idx}` }));
    return (
      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        <aside className="card-surface h-fit p-5">
          <h2 className="text-lg font-semibold">Filters</h2>
          <p className="mt-3 text-sm text-zinc-500">Using sample catalog (no DB configured).</p>
        </aside>
        <section>
          <h1 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">All Products</h1>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {data.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  await connectDB();
  const query: any = {};
  if (params.category) query.category = params.category;
  if (params.min || params.max) {
    query.price = {};
    if (params.min) query.price.$gte = Number(params.min);
    if (params.max) query.price.$lte = Number(params.max);
  }

  const sort: any = params.sort === "price_asc" ? { price: 1 } : params.sort === "price_desc" ? { price: -1 } : { createdAt: -1 };
  let data: any[] = [];
  try {
    const products = await Product.find(query).sort(sort).lean();
    data = JSON.parse(JSON.stringify(products));
  } catch {
    data = sampleProducts.map((p, idx) => ({ ...p, _id: `sample-${idx}` }));
  }

  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]">
      <aside className="card-surface h-fit p-5">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="mt-4 space-y-3 text-sm">
          <Link href="/products?sort=price_asc" className="block rounded-lg px-3 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">Price: Low to High</Link>
          <Link href="/products?sort=price_desc" className="block rounded-lg px-3 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">Price: High to Low</Link>
          <Link href="/products?category=Men" className="block rounded-lg px-3 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">Men</Link>
          <Link href="/products?category=Women" className="block rounded-lg px-3 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">Women</Link>
          <Link href="/products?category=Streetwear" className="block rounded-lg px-3 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">Streetwear</Link>
        </div>
      </aside>
      <section>
        <h1 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">All Products</h1>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
