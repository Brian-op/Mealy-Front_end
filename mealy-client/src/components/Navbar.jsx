import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
       <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
    </div>
   
  );
}

export default Navbar;
