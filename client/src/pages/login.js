import Login from "../assets/login/logo.png";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const navigate = useNavigate();

  const onSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    try {
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: decoded.email }),
      });

      if (response.ok) {
        const userData = await response.json();
        const {
          userID,
          token,
          role,
        } = userData;
        console.log("Login Success! User Email:", decoded.email);

        localStorage.setItem("email", decoded.email);
        localStorage.setItem("token", token);
        localStorage.setItem("userid", userID);
        localStorage.setItem("role", role);
        if (role === "1") {
          navigate("/home");
        } else if (role === "3") {
          navigate("/student-home");
        } else {
          navigate("/home");
        }
      } else {
        console.log("Failed to send email to the API.");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={Login}
            alt="Placement Portal"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Jane Doe"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="****************"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="w-full bg-[#6777EF] text-white py-2 rounded-lg hover:bg-[#6777EF]/90">
              Log in
            </button>
          </form>
          <hr className="my-8" />
          <div className="mt-6 flex flex-col space-y-2">
            <GoogleOAuthProvider clientId="793116523835-s7fjcnq0gc44pdojcenf6e8lkacsive5.apps.googleusercontent.com">
              <div className="flex justify-center">
                <GoogleLogin onSuccess={onSuccess} onError={onError} />
              </div>
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
