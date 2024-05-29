import {
  ReactNode,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  MouseEventHandler,
  MouseEvent,
} from "react";
import "./Navbar.css";

// Navbar state context
type NavbarContextType = {
  isNavMenuOpen: boolean;
  setIsNavMenuOpen: Dispatch<SetStateAction<boolean>>;
};
const NavbarContext = createContext<NavbarContextType | null>(null);
function useNavbar() {
  const ctx = useContext(NavbarContext);
  if (!ctx) {
    throw new Error("Navbar compound components must be used inside <Navbar/>");
  }
  return ctx;
}

// Main component
interface NavbarProps {
  children?: ReactNode;
  className?: string;
  isCollapsible?: boolean;
}
function Navbar({ children, className }: NavbarProps) {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const ctxValue: NavbarContextType = {
    isNavMenuOpen,
    setIsNavMenuOpen,
  };
  return (
    <NavbarContext.Provider value={ctxValue}>
      <nav className={`navbar ${className || ""}`}>
        <div className="navbar-container">{children}</div>
      </nav>
    </NavbarContext.Provider>
  );
}

// Navbar meun component
interface MenuProps {
  children?: ReactNode;
  onClick?: MouseEventHandler;
}
function Menu({ children }: MenuProps) {
  const { isNavMenuOpen, setIsNavMenuOpen } = useNavbar();
  function handleOnNavMenuClick() {
    setIsNavMenuOpen(false);
  }
  return (
    <div
      id="navbar-menu"
      className={`navbar__menu ${isNavMenuOpen ? "menu-open" : ""}`}
      onClick={handleOnNavMenuClick}
    >
      {children}
    </div>
  );
}

interface MenuToggleProps {
  onNavToggleClick?: MouseEventHandler<HTMLButtonElement>;
}
function MenuToggle({ onNavToggleClick }: MenuToggleProps) {
  const { isNavMenuOpen, setIsNavMenuOpen } = useNavbar();

  function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
    setIsNavMenuOpen((prevState) => !prevState);
    onNavToggleClick && onNavToggleClick(e);
  }

  return (
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
  );
}

Navbar.MenuToggle = MenuToggle;
Navbar.Menu = Menu;
export default Navbar;
