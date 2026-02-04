



import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === "candidate") {
      navigate("/candidate");
    } else if (role === "employer") {
      navigate("/employer");
    }
  };


  const registerLink =
    role === "candidate"
      ? "/register?role=candidate"
      : role === "employer"
      ? "/register?role=employer"
      : "/register";

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow mx-auto w-100" style={{ maxWidth: "550px" }}>
        <div className="card-body">
           <div className="inner-form-box">
          <h3 className="text-center mb-3" >Login</h3>

          {/* Role Selection */}
          {!role && (
            <>
              <h4 className="text-center mb-4">Choose login type</h4>

              <div className="role-wrapper">
                <div
                  className="role-card candidate text-center"
                  onClick={() => setRole("candidate")}
                >
                  <div className="icon mb-3">👤</div>
                  <h5>Candidate</h5>
                </div>

                <div
                  className="role-card employer text-center"
                  onClick={() => setRole("employer")}
                >
                  <div className="icon mb-3">💼</div>
                  <h5>Employer</h5>
                </div>
              </div>
            </>
          )}

          {/* Login Form */}
          {role && (
            <>
              <form className="login-form" onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    required
                  />
                </div>

           <a href="/forgot-password" className="forgot-link">
    Forgot password?
  </a>


          <div className="login-row">
  <button type="submit" className="btn-primary">
    Login
  </button>

 
</div>



              </form>
                {role && (
  <p className="text-center mt-3">
    {role === "candidate" && (
      <>
        Create your new Candidate profile{" "}
        <a href="\register" style={{ color: "#007bff" }}>
          Create Profile
        </a>
      </>
    )}

    {role === "employer" && (
      <>
        Create your new Employer profile{" "}
        <a href="\Employer" style={{ color: "#007bff" }}>
          Create Profile
        </a>
      </>
    )}
  </p>
)}

            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

