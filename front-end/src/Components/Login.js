import React from "react";
import Axios from "../Axios";
import { useHistory, withRouter } from "react-router-dom";
import $ from "jquery";

function Login() {

  const history = useHistory();

  const handleLogin = () => {

    Axios.post("/login", {
      email: $(".signup-user").val(),
      password: $(".signup-password").val(),
    }).then((res) => {
      if (res.data == "Login") {
        sessionStorage.setItem("email", $(".signup-user").val());
        var d = new Date();
        d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = $(".signup-user").val();
        history.push("/home");
        console.log("object");
      } else if (res.data == "Wrong Pwd") {
        console.log(res);
      } else if (res.data == "SignUp") {
        history.push("/signUp");
      }
    });
  };

  return (
    <div className="full-signUp">
      <div className="connect">
        <h1>CONNECT</h1>
        <h4>Login</h4>
        <div className="input-container">
          <input type="email" placeholder="Email Address" className="signup-user" />{" "}
          <input type="text" placeholder="Password" className="signup-password" />
          <button onClick={handleLogin}>Submit</button>
        </div>
        <div>
          <p>If not a user already, then</p>
          <p className="login-signUp" onClick={() => history.push("/signUp")}>Sign Up</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
