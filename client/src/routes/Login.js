import useAuth from "@hooks/useAuth";
import getToken from "@utils/getToken";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const from = location.state.from.pathname || "/";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <p>You must log in</p>

      <form onSubmit={handleSubmit}>
        <label>
          E-mail:{" "}
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;