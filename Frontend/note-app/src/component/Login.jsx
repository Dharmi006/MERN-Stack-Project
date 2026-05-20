import { useState } from "react";
import "../auth.css";

function Login({
  setIsLoggedIn,
  setShowLogin,
  authMode,
  setAuthMode,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://mern-notes-api-ohev.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setShowLogin(false);
    } else {
      alert("Login failed");
    }
  };

  // SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://mern-notes-api-ohev.onrender.com/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setShowLogin(false);
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>{authMode === "login" ? "Login" : "Sign Up"}</h2>

        <form
          onSubmit={
            authMode === "login" ? handleLogin : handleSignup
          }
        >
          {authMode === "signup" && (
            <>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br /><br />
            </>
          )}

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br /><br />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br /><br />

          <button type="submit">
            {authMode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <br />

        <p>
          {authMode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setAuthMode("signup")}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setAuthMode("login")}
              >
                Login
              </span>
            </>
          )}
        </p>

      </div>
    </div>
  );
}

export default Login;