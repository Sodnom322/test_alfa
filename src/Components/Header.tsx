import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-300">
      <ul className="flex gap-7">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/products"}>
          <li>Products</li>
        </Link>
        <Link to={"/create-product"}>
          <li>Create</li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
