export function ProductSkeleton() {
  return (
    <div className="card-surface animate-pulse space-y-4 p-5">
      <div className="aspect-[4/5] rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-3 w-1/3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-2/3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}
