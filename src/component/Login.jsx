import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //   GoogleAuthProvider
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="justify-center flex">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-200 shadow-2xl rounded-lg p-8 ">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          {/* email */}
          <div className=" flex flex-col items-start mb-6">
            <label className="block text-gray-800 font-medium mb-2 text-xl">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 bg-cardBg text-white border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-neonGreen"
              placeholder="you@example.com"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* password */}
          <div className="flex flex-col items-start mb-6">
            <label className="block text-gray-800 font-medium mb-2 text-xl">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 bg-cardBg text-black border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-neonGreen"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* login button */}
          <button
            type="submit"
            className="bg-white font-medium text-black w-full p-3 rounded-lg hover:scale-105 transition transform duration-200 shadow-lg"
          >
            Login
          </button>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="bg-blue-600 text-white w-full p-3 rounded-lg mt-4 hover:scale-105 transition transform duration-200 shadow-lg"
          >
            Login with Google
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-red-500 text-center text-lg font-semibold">
            {error}
          </p>
        )}

        <p className="mt-6 text-gray-400 text-center text-lg">
          Don't have an account?{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
