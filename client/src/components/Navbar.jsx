import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import "../style/Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold text-white" to="/">🛒 E-Shop</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          {/* Show cart only if user is not admin */}
          {(!userInfo || userInfo.role !== "admin") && (
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart {cartItems.length > 0 && `(${cartItems.length})`}
              </Link>
            </li>
          )}

          {/* Admin links */}
          {userInfo?.role === "admin" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/products">Products</Link>
              </li>
            </>
          )}

          {/* User/Seller links */}
          {userInfo && userInfo.role !== "admin" && (
            <li className="nav-item">
              <Link className="nav-link" to="/profile">{userInfo.name}</Link>
            </li>
          )}

          {/* Auth buttons */}
          {userInfo ? (
            <li className="nav-item">
              <button
                className="btn btn-sm btn-outline-light ms-2"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
