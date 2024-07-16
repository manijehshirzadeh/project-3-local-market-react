import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Log In</h1>
      <p>{message}</p>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center"
      >
        <div className="mb-3">
          <label htmlFor="username-input" className="form-label">
            Username:
          </label>
          <input
            type="text"
            autoComplete="off"
            id="username-input"
            className="form-control"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password-input" className="form-label">
            Password:
          </label>
          <input
            type="password"
            autoComplete="off"
            id="password-input"
            className="form-control"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="d-flex gap-5">
          <div>
            <button className="btn px-3 py-2 btn-primary">Log In</button>
          </div>
          <div>
            <Link to="/">
              <button className="btn px-3 py-2 btn-primary">Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SigninForm;
