import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer-simple">
        <p>&copy; 2026 ClueForge. Engineered for Excellence.</p>
      </footer>
    </div>
  );
};

export default Layout;
