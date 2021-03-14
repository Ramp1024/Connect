// import React, { useEffect, useState } from "react";
// import { useStateValue } from "../StateProvider";
// import Axios from "../Axios";
// import $ from "jquery";
// import "../css/Center.css";
// import socketIOClient from "socket.io-client";

// const ENDPOINT = "http://localhost:3001";
// function CenterComponent() {
//   const [{ user, clickedChannel, channels }, dispatch] = useStateValue();
//   const [channelInfo, setchannelInfo] = useState();
//   const [messageHolder, setmessageHolder] = useState(null);
//   const [request, setrequest] = useState([]);
//   var arr = [];
//   useEffect(() => {
//     const socket = socketIOClient(ENDPOINT);
//     socket.on("new-message", (data) => {
//       if (clickedChannel != null) {
//         setchannelInfo(data);
//         dispatch({
//           type: "CHANNELS",
//           channels: data,
//         });
//       }
//     });
//   }, [clickedChannel]);

//   useEffect(() => {
//     channels?.map((channel) =>
//       clickedChannel?._id === channel?._id
//         ? setmessageHolder(channel.channel_message)
//         : console.log("varamaaten")
//     );
//   }, [clickedChannel, channels]);

//   console.log(messageHolder);
//   console.log(clickedChannel);

//   const handleSend = () => {
//     var obj = {
//       message: $(".message").val(),
//       name: user?.name,
//       timestamp: Date.now,
//     };
//     setmessageHolder((prevState) => [...prevState, obj]);
//     Axios.post("/channel_newMessage", {
//       id: clickedChannel?._id,
//       name: user.name,
//       message: $(".message").val(),
//     }).then((res) => {
//       console.log(res.data);
//     });
//   };
//   console.log(user);
//   const handleJoin = async () => {
//     await Axios.post("/set-pref", {
//       pref: clickedChannel?.channel_name,
//       email: user?.email,
//     }).then((res) => console.log(res));

//     setTimeout(() => {
//       window.location.reload();
//     }, 5000);
//   };

//   console.log(clickedChannel?.channel_requests?.includes(user?._id));
//   console.log(arr);

//   const handleRequest = () => {
//     Axios.post("/handleRequest", {
//       user_id: user._id,
//       user_name: user.name,
//       user_email: user.email,
//       channel_id: clickedChannel._id,
//     }).then((res) => console.log(res));

//     $(".request-to-join").html("Pending");
//   };
//   console.log(arr.includes(user?._id, 0));

//   return (
//     <div className="center-full">
//       <div className="channel-header">
//         <div>{clickedChannel?._id}</div>
//         {clickedChannel?.channel_requests?.map((singleRequest) => {
//           /* setrequest((prevState) => [...prevState, singleRequest.id]); */

//           arr.push(singleRequest.id);
//           // console.log(singleRequest);
//           console.log(arr.includes(user?._id, 0));
//         })}
//         <div>{clickedChannel?.channel_name}</div>

//         <div>
//           {clickedChannel?.channel_desc}
//         </div>

//         {clickedChannel?.channel_users?.includes(user?._id) ? (
//           <div>None</div>
//         ) : clickedChannel?.private == true && !arr.includes(user?._id) ? (
//           <button className="request-to-join" onClick={handleRequest}>
//             Request to Join
//           </button>
//         ) : clickedChannel?.private == true && arr.includes(user?._id) ? (
//           <div>Pending</div>
//         ) : (
//           <button onClick={handleJoin}>Join</button>
//         )}
//       </div>
//       <div>
//         {channelInfo?.channel_users?.map((user) => (
//           <div>{user.name}</div>
//         ))}
//       </div>
//       <div className="messages-container">
//         {/* {channels?.map((channel) =>
//           clickedChannel?._id === channel?._id
//              ? channel?.channel_message?.map((singleMsg) =>
//                   singleMsg.name == user?.name ? (
//                     <div className="messages-width">
//                       <div className="my-messages">
//                         <div className="singleMsg-name">{singleMsg?.name}</div>
//                         <div className="singleMsg-message">
//                           {singleMsg?.message}
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="messages-width">
//                       <div className="other-messages">
//                         <div className="singleMsg-name">{singleMsg.name}</div>
//                         <div className="singleMsg-message">
//                           {singleMsg.message}
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 )
//               console.log(channel?.channel_message)
//               () => {
//                 console.log("Ulla dhaan iruke");

//                 setmessageHolder(channel.channel_message);
//               }
//             : ""
//         )} */}
//         {clickedChannel?.private &&
//           !clickedChannel?.channel_users?.includes(user?._id) ? (
//           <div>Oopssss...Channel Restricted by the User.</div>
//         ) : messageHolder != null ? (
//           messageHolder?.map((singleMsg) =>
//             singleMsg.name == user?.name ? (
//               <div className="messages-width">
//                 <div className="my-messages">
//                   <div className="singleMsg-name">{singleMsg?.name}</div>
//                   <div className="singleMsg-message">{singleMsg?.message}</div>
//                 </div>
//               </div>
//             ) : (
//               <div className="messages-width">
//                 <div className="other-messages">
//                   <div className="singleMsg-name">{singleMsg.name}</div>
//                   <div className="singleMsg-message">{singleMsg.message}</div>
//                 </div>
//               </div>
//             )
//           )
//         ) : (
//           ""
//         )}
//       </div>
//       <div className="send-field">
//         <input type="text" placeholder="New Message" className="message" />
//         {clickedChannel?.private &&
//           !(clickedChannel?.channel_users?.indexOf(user?._id) > -1) ? (
//           <button>Submit</button>
//         ) : (
//           <button onClick={handleSend}>Send</button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CenterComponent;


import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import Axios from "../Axios";
import $ from "jquery";
import { Howl } from "howler";
import "../css/Center.css";
import socketIOClient from "socket.io-client";
// import { useAudioPlayer } from "react-use-audio-player";
const ENDPOINT = "https://ancient-tor-83813.herokuapp.com";

function CenterComponent() {
  var x = document.cookie;
  console.log(x);
  const [{ user, clickedChannel, channels }, dispatch] = useStateValue();
  const [isPlaying, setIsPlaying] = useState(false);
  const [channelInfo, setchannelInfo] = useState();
  const [messageHolder, setmessageHolder] = useState(null);
  const [request, setrequest] = useState([]);
  // const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
  //   src: clickedChannel?.channel_theme,
  //   format: "mp3",
  //   autoplay: false,
  //   onend: () => console.log("sound has ended!"),
  // });
  var arr = [];
  // const sound = new Howl({
  //   src: clickedChannel?.channel_theme,
  //   html5: true,
  // });
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("new-message", (data) => {
      if (clickedChannel != null) {
        setchannelInfo(data);
        dispatch({
          type: "CHANNELS",
          channels: data,
        });
      }
    });
  }, [clickedChannel]);

  useEffect(() => {
    channels?.map((channel) =>
      clickedChannel?._id === channel?._id
        ? setmessageHolder(channel.channel_message)
        : console.log("varamaaten")
    );
  }, [clickedChannel, channels]);

  console.log(messageHolder);
  console.log(clickedChannel);

  const handleSend = () => {
    if (
      !(
        $(".message").val().includes("Murder") ||
        $(".message").val().includes("Blood") ||
        $(".message").val().includes("Fuck") ||
        $(".message").val().includes("Bitch")
      )
    ) {
      var obj = {
        message: $(".message").val(),
        name: user?.name,
        timestamp: Date.now,
      };
      setmessageHolder((prevState) => [...prevState, obj]);
      Axios.post("/channel_newMessage", {
        id: clickedChannel?._id,
        name: user?.name || "Anonymous",
        message: $(".message").val(),
      }).then((res) => {
        console.log(res.data);
      });
    } else {
      alert("Vulgar content observed");
    }
  };
  console.log(user);
  const handleJoin = async () => {
    await Axios.post("/set-channel", {
      pref: clickedChannel?._id,
      email: user?.email,
    })
      .then((res) => console.log(res))
      .then(() => window.location.reload());
  };

  console.log(clickedChannel?.channel_requests?.includes(user?._id));
  console.log(arr);

  const handleRequest = () => {
    Axios.post("/handleRequest", {
      user_id: user._id,
      user_name: user.name,
      user_email: user.email,
      channel_id: clickedChannel._id,
    }).then((res) => console.log(res));

    $(".request-to-join").html("Pending");
  };
  console.log(arr.includes(user?._id, 0));

  return (
    <div className="center-full">
      {/* <button onClick={() => soundPlay(clickedChannel?.channel_theme)}></button> */}
      {/* <button
        className="volume main-box dummy-abs"
        onClick={() => {
          // Toggles play / pause

          if (isPlaying) {
            sound.pause();
            setIsPlaying(false);
          } else {
            sound.play();
            setIsPlaying(true);
          }
          console.log("isPlaying", isPlaying);
        }}
      >
        {" "}
        Press Me
      </button> */}
      {/* <button onClick={togglePlayPause}>{playing ? "Pause" : "Play"}</button> */}
      {clickedChannel ? (
        <div>
          <div className="channel-header">
            {clickedChannel?.channel_requests?.map((singleRequest) => {
              /* setrequest((prevState) => [...prevState, singleRequest.id]); */

              arr.push(singleRequest.id);
              // console.log(singleRequest);
              console.log(arr.includes(user?._id, 0));
            })}
            <div className="image-andName">
              <img src={clickedChannel?.channel_images} width="75px" height="75px" />
              <div>
                <div className="center-channelId">{clickedChannel?._id}</div>
                <div className="center-channelName">{clickedChannel?.channel_name}</div>
              </div>
            </div>
            <div className="center-channelDesc">
              {clickedChannel?.channel_desc}
            </div>
            {/* {arr.includes(user?._id) ? (
          <div>Pending</div>
        ) : (
          <div className="request-to-join" onClick={handleRequest}>
            Request to Join
          </div>
        )} */}

            {clickedChannel?.channel_users?.includes(user?._id) ? (
              <div></div>
            ) : clickedChannel?.private == true &&
              !arr.includes(user?._id) &&
              x != "" ? (
              <button className="request-to-join" onClick={handleRequest}>
                Request to Join
              </button>
            ) : clickedChannel?.private == true && arr.includes(user?._id) ? (
              <div className="pending">Pending</div>
            ) : clickedChannel?.private == true && x == "" ? (
              <button className="signUp-toJoin" onClick={handleJoin}>SignUp to Join</button>
            ) : clickedChannel?.private == false && x == "" ? (
              <div></div>
            ) : (
              <button className="join" onClick={handleJoin}>Join</button>
            )}
          </div>
          <div>
            {channelInfo?.channel_users?.map((user) => (
              <div>{user.name}</div>
            ))}
          </div>
          <div className="messages-container">
            {clickedChannel?.private &&
              !clickedChannel?.channel_users?.includes(user?._id) ? (
              <div>Oopssss...Channel Restricted by the User.</div>
            ) : messageHolder != null ? (
              messageHolder?.map((singleMsg) =>
                singleMsg.name == user?.name ? (
                  <div className="messages-width">
                    <div className="my-messages">
                      <div className="singleMsg-name">{singleMsg?.name}</div>
                      <div className="singleMsg-message">
                        {singleMsg?.message}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="messages-width">
                    <div className="other-messages">
                      <div className="singleMsg-name">{singleMsg.name}</div>
                      <div className="singleMsg-message">
                        {singleMsg.message}
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              ""
            )}
          </div>
          <div className="send-field">
            <input type="text" placeholder="New Message" className="message" />
            {clickedChannel?.private &&
              !(clickedChannel?.channel_users?.indexOf(user?._id) > -1) ? (
              <button>Submit</button>
            ) : (
              <button onClick={handleSend}>Send</button>
            )}
          </div>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}

export default CenterComponent;
