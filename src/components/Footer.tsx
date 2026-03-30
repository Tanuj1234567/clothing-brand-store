export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 py-10 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      <div className="container-max flex flex-col justify-between gap-3 sm:flex-row">
        <p>© {new Date().getFullYear()} NOIRVAULT. All rights reserved.</p>
        <p>Premium essentials for the next generation.</p>
      </div>
    </footer>
  );
}
