import { ProductSkeleton } from "@/components/Skeleton";

export default function LoadingProducts() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </div>
  );
}
