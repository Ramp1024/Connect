import React, { useEffect } from "react";
import Axios from "../Axios";
import { useHistory, withRouter, useLocation } from "react-router-dom";
import $ from "jquery";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

function Form() {
  const email = sessionStorage.getItem("email");
  const history = useHistory();
  const location = useLocation();


  useEffect(() => {
    if (email == null) {
      history.push("/signup");
    }
  }, []);

  useEffect(() => {
    if (location.pathname = "/form") {
      $(".form-stepper").css("transform", "scale(1.5,1.5)")
    }
  }, [])

  const handlePassword = () => {
    Axios.post("/signup", {
      email: email,
      password: $(".signup-password").val(),
      username: $(".username").val(),
    }).then((res) => {
      if (res.status == 200) {
        history.push("/pref");
      } else {
        alert("Error");
      }
    });
    document.cookie = email;
  };

  return (
    <div className="full-signUp">
      <div className="stepper-div">
        <div className="signup-stepper">
          <Stepper alternativeLabel>
            <Step>
              <StepLabel>Sign Up</StepLabel>
            </Step>
          </Stepper>
        </div>
        <p>------</p>
        <div className="otp-stepper">
          <Stepper alternativeLabel>
            <Step>
              <StepLabel>OTP Verification</StepLabel>
            </Step>
          </Stepper>
        </div>
        <p>------</p>
        <div className="form-stepper">
          <Stepper alternativeLabel>
            <Step>
              <StepLabel>Set Username <br /> & Password</StepLabel>
            </Step>
          </Stepper>
        </div>
        <p>------</p>
        <div className="pref-stepper">
          <Stepper alternativeLabel>
            <Step>
              <StepLabel>Select Preferences</StepLabel>
            </Step>
          </Stepper>
        </div>
      </div>
      <div className="connect">
        <h1>CONNECT</h1>
        <div className="input-formFields">
          <input type="text" value={email} className="email" />
          <input type="text" className="username" />
          <input type="password" placeholder="Password" className="signup-password" />
          <button onClick={handlePassword}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Form);
