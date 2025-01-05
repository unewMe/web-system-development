const Header = () => {
  return (
    <>
      <header
        style={{ padding: "10px", background: "#282c34", color: "white" }}
      >
        <h1>PLANER !!!!</h1>
        <nav>
          <ul style={{ display: "flex", listStyle: "none", gap: "10px" }}>
            <li>
              <a href="#" style={{ color: "white" }}>
                Home
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "white" }}>
                About
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "white" }}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
