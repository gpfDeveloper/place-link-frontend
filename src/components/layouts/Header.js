import Logo from "../UIs/Logo";
import NavLinks from "../UIs/NavLinks";
import Toggle from "../UIs/Toggle";

const Header = ({ onOpenSidebar }) => {
  return (
    <header className="header">
      <div className="container">
        <Logo />
        <Toggle onClick={onOpenSidebar} />
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
