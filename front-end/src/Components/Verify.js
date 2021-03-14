import React, { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import $ from "jquery";
import "../css/InsideCome.css";
import { useLocation } from "react-router-dom";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import axios from "../Axios";

function Verify() {
  const email = sessionStorage.getItem("email");
  const history = useHistory();
  const location = useLocation();


  useEffect(() => {
    if (email == null) {
      history.push("/signup");
    }
  }, []);

  const handleOTP = () => {
    console.log("clicked");
    console.log($(".otp_input").val());
    axios
      .post("/otp-verify", {
        email: email,
        otp: $(".otp_input").val(),
      })
      .then((res) =>
        res.status == 200 ? history.push("/form") : console.log("")
      );
    // if (otpStatus == 200) {
    //   history.push("/form");
    // } else {
    //   alert("An error occured, try again later");
    // }
  };

  useEffect(() => {
    if (location.pathname = "/verify") {
      $(".otp-stepper").css("transform", "scale(1.5,1.5)")
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
          <input type="text" placeholder="OTP" className="otp_input" />
          {/* <input type="text" placeholder="Password" name="password" /> */}
          <button onClick={handleOTP}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Verify;
