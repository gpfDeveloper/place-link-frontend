import Logo from "../components/Logo";
import NavLinks from "../components/NavLinks";
import Toggle from "../components/Toggle";

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
