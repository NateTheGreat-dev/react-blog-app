export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">© {year} Nate's Blog Party -- All rights reserved.</div>
    </footer>
  );
}
