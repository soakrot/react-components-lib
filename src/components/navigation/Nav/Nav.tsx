import "./Nav.css";

type navItem = JSX.Element;
interface NavProps {
  items: navItem[];
}

function Nav({ items }: NavProps) {
  return (
    <ul className="nav-list flex">
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}

export default Nav;
