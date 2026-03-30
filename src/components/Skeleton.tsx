export function ProductSkeleton() {
  return (
    <div className="animate-pulse space-y-3 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="aspect-[4/5] rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-1/4 rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}
