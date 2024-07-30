import { ReactNode, useState, MouseEventHandler, MouseEvent } from "react";
import "./Navbar.css";

// Main component

interface NavbarProps {
  children?: ReactNode;
  className?: string;
  type?: "collapse" | "default";
  onNavToggleClick?: MouseEventHandler<HTMLButtonElement>;
}
function Navbar(props: NavbarProps) {
  const { children, className, type = "default", onNavToggleClick } = props;
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  function handleOnNavMenuClick() {
    setIsNavMenuOpen(false);
  }

  function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
    setIsNavMenuOpen((prevState) => !prevState);
    onNavToggleClick && onNavToggleClick(e);
  }

  const navbarMenu = (
    <>
      <button
        className={`navbar__menu-toggle ${
          isNavMenuOpen ? "menu-toggle-active" : ""
        }`}
        aria-label="navigation menu button"
        aria-controls="navbar-menu"
        aria-expanded={isNavMenuOpen}
        aria-roledescription="opens the main navigation menu of the website"
        onClick={handleOnClick}
      ></button>
      <div
        id="navbar-menu"
        className={`navbar__menu box ${isNavMenuOpen ? "menu-open" : ""}`}
        onClick={handleOnNavMenuClick}
      >
        {children}
      </div>
    </>
  );

  return (
    <nav
      className={`navbar box ${className || ""} ${type === "collapse" ? "collapse" : ""}`}
    >
      <div className="navbar-container">
        {type === "collapse" ? navbarMenu : children}
      </div>
    </nav>
  );
}

export default Navbar;
