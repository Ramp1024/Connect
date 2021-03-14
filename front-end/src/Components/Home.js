import React, { useEffect, useState } from "react";
import "../css/Home.css";
import axios from "../Axios";
import { useStateValue } from "../StateProvider";
import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";
import CenterComponent from "./CenterComponent";
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://ancient-tor-83813.herokuapp.com";
function Home() {
  const [{ channels, user }, dispatch] = useStateValue();
  const [userData, setuserData] = useState("");
  var x = document.cookie;

  const [userChannels, setuserChannels] = useState([]);

  useEffect(() => {
    axios.post("/channels").then((res) => {
      console.log(res.data);
      dispatch({
        type: "CHANNELS",
        channels: res.data,
      });
    });
  }, [x]);

  useEffect(() => {
    axios
      .post("/chat", {
        email: x,
      })
      .then((res) => {
        dispatch({
          type: "USER",
          user: res.data,
        });
      });
  }, [x]);

  console.log(x);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    // <div className="fullHome">
    //   <div className="left-container">
    //     {/* {user?.channels?.map((channel) => (

    //     ))} */}
    //     <LeftComponent />
    //   </div>
    //   <div className="center-container">
    //     <CenterComponent />
    //   </div>
    //   <div className="right-container">
    //     <RightComponent user={user} />
    //   </div>
    // </div>

    <div className="fullHome">
      {(user == "" || user == null) && x != "" ? (
        <div>Fetching Details</div>
      ) : (
        <div>
          <div className="left-container">
            <LeftComponent />
          </div>
          <div className="center-container">
            <CenterComponent />
          </div>
          <div className="right-container">
            <RightComponent user={user} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
