export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 px-6 pb-10 pt-6 text-xs text-white/60 md:flex-row md:justify-between md:px-12">
      <div className="flex gap-4">
        <a className="hover:text-dew-mint" href="#">
          Docs
        </a>
        <a className="hover:text-dew-mint" href="#">
          GitHub
        </a>
        <a className="hover:text-dew-mint" href="#">
          Privacy
        </a>
      </div>
      <span>© PixelDew Universe</span>
    </footer>
  );
}
