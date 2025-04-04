export default function Navbar() {
  return (
    <header>
      {/* Primera Franja: Logo + Login/Register */}
      <nav className="container navbar navbar-expand-lg py-2 w-100">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo */}
          <RouterLink className="navbar-brand" to="/">
            <img
              src="/images/logo-h-teshuva.png"
              alt="Logo del hotel Teshuva"
              height={80}
              width={80}
            />
          </RouterLink>
        </div>
      </nav>
    </header>
  );
}
