import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid py-5 d-flex align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #eef4ff, #f8fbff)",
      }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-lg-5 col-md-7 col-sm-10">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div
              className="text-center text-white py-3"
              style={{
                background: "linear-gradient(to right, #2563eb, #1e40af)",
              }}
            >
              <h3 className="fw-bold mb-1">Create Account</h3>
              <p className="mb-0 opacity-75" style={{ fontSize: "0.9rem" }}>
                Sign up for LeadFlow CRM
              </p>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: "0.95rem" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control rounded-3"
                    style={{ fontSize: "0.95rem", padding: "10px" }}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: "0.95rem" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control rounded-3"
                    style={{ fontSize: "0.95rem", padding: "10px" }}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: "0.95rem" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control rounded-3"
                    style={{ fontSize: "0.95rem", padding: "10px" }}
                    required
                    minLength={6}
                  />
                </div>

                {error && (
                  <div className="alert alert-danger rounded-3 py-2" style={{ fontSize: "0.9rem" }}>
                    {error}
                  </div>
                )}

                <div className="d-grid mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-3 fw-semibold py-2"
                    style={{ fontSize: "0.95rem" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Creating account...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </form>

              <p className="text-center mt-3 mb-0" style={{ fontSize: "0.9rem" }}>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>

          <p className="text-center text-muted mt-3" style={{ fontSize: "0.85rem" }}>
            LeadFlow CRM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;