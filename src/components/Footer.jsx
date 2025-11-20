export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">© {year} The Blog Party -- All rights reserved.</div>
    </footer>
  );
}
