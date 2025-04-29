import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux state
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  // Redirect user based on role
  useEffect(() => {
    console.log("userInfo after login:", userInfo); // 👈 add this
    if (userInfo) {
      if (userInfo.role === "admin") {
        navigate("/admin/dashboard");
      } else if (userInfo.role === "seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="container mt-5 login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Login to Your Account</h2>

            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
