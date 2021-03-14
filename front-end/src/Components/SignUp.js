import React, { useEffect } from "react";
import Axios from "../Axios";
import $ from "jquery";
import { useHistory, withRouter, useLocation } from "react-router-dom";
import "../css/InsideCome.css";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

function SignUp() {

  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    console.log("Clicked");
    if (typeof Storage !== "undefined") {
      // Store
      sessionStorage.setItem("email", $(".signup-user").val());
    }
    Axios.post("/verify", {
      email: $(".signup-user").val(),
    }).then((res) => {
      if (res.status == 200) {
        history.push("/verify");
      } else {
        alert("Error");
      }
    });
  };

  useEffect(() => {
    if (location.pathname = "/signUp") {
      $(".signup-stepper").css("transform", "scale(1.5,1.5)")
    }
  }, [])

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
        <div className="input-container">
          <input type="email" placeholder="Email Address" className="signup-user" />
          {/* <input type="text" placeholder="Password" name="password" /> */}
          <button onClick={handleClick}>Submit</button>
        </div>
      </div>

    </div>
  );
}

export default withRouter(SignUp);
