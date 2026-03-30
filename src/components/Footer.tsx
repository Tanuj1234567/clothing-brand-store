export default function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-200 py-14 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      <div className="container-max grid gap-8 sm:grid-cols-3">
        <div>
          <p className="text-base font-semibold tracking-[0.2em] text-black dark:text-white">NOIRVAULT</p>
          <p className="mt-2 max-w-xs text-zinc-500">Premium essentials for the next generation.</p>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-black dark:text-white">Explore</p>
          <p>Shop</p>
          <p>New Arrivals</p>
          <p>Wishlist</p>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-black dark:text-white">Follow</p>
          <div className="flex gap-3">
            <a href="#" className="transition hover:text-black dark:hover:text-white">Instagram</a>
            <a href="#" className="transition hover:text-black dark:hover:text-white">X</a>
            <a href="#" className="transition hover:text-black dark:hover:text-white">Pinterest</a>
          </div>
          <p className="pt-2 text-xs">© {new Date().getFullYear()} NOIRVAULT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
