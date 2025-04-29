import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav>
      {/* Common Links */}
      {userInfo ? (
        <>
          <span>Hello, {userInfo.name}</span>
          <button onClick={handleLogout}>Logout</button>
          <a href="/profile">Profile</a>
          <a href="/orders">My Orders</a>
        </>
      ) : (
        <>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </>
      )}
    </nav>
  );
};
export default Header;
