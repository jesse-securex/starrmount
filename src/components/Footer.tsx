export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer on-navy">
      <div className="container site-footer__inner">
        <p className="wordmark">
          STARRMOUNT <span className="wordmark__accent">SOLUTIONS</span> FZ-LLC
        </p>
        <p className="site-footer__copy">&copy; {year} Starrmount Solutions FZ-LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}
