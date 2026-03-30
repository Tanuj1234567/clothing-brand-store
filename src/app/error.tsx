"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-red-300 p-6 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-zinc-600">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded-full bg-black px-5 py-2 text-white">
        Try again
      </button>
    </div>
  );
}
