// import React, { useEffect } from "react";
// import { useStateValue } from "../StateProvider";
// import socketIOClient from "socket.io-client";
// import axios from "../Axios";
// import { Howl, Howler } from "howler";

// const ENDPOINT = "http://localhost:3001";
// function LeftComponent() {
//   const [{ user, clickedChannel }, dispatch] = useStateValue();

//   var x = document.cookie;
//   const soundPlay = (src) => {
//     const sound = new Howl({
//       src,
//       html5: true,
//       autoplay: false,
//       // sprite: {
//       //   key1: [offset, duration, loop],
//       // },
//     });
//     console.log(sound);
//     sound.play();
//   };

//   useEffect(() => {
//     const socket = socketIOClient(ENDPOINT);
//     socket.on("user-changed", (data) => {
//       dispatch({
//         type: "USER",
//         user: data,
//       });
//     });
//   }, []);

//   console.log(user);

//   const handleClick = (channelId) => {
//     console.log(channelId);
//     dispatch({
//       type: "LEFT_CHANNEL",
//       channelId: channelId,
//     });
//   };

//   return (
//     <div>
//       <div>
//         {user?.channels?.map((channel) => (
//           // <SingleChannelLeft channel={channel} />
//           <div
//             onClick={() => {
//               Howler.unload();
//               handleClick(channel);
//               if (channel?.channel_theme.length != 0)
//                 soundPlay(channel?.channel_theme);
//             }}
//           >
//             {channel.channel_name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default LeftComponent;


import React, { useEffect } from "react";
import { useStateValue } from "../StateProvider";
import socketIOClient from "socket.io-client";
import axios from "../Axios";
import { Howl, Howler } from "howler";

const ENDPOINT = "http://localhost:3001";
function LeftComponent() {
  const [{ user, clickedChannel }, dispatch] = useStateValue();

  var x = document.cookie;
  const soundPlay = (src) => {
    const sound = new Howl({
      src,
      html5: true,
      autoplay: false,
      // sprite: {
      //   key1: [offset, duration, loop],
      // },
    });
    console.log(sound);
    sound.play();
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("user-changed", (data) => {
      dispatch({
        type: "USER",
        user: data,
      });
    });
  }, []);

  console.log(user);

  const handleClick = (channelId) => {
    console.log(channelId);
    dispatch({
      type: "LEFT_CHANNEL",
      channelId: channelId,
    });
  };

  return (
    <div className="left-fullComponent">
      {
        x == "" || user?.channels == [] ? (
          <div className="left-anonymous">Join Channels <br /> Or search channels to start messaging</div>
        ) : (
          <div>
            <div className="left-userDetails">
              <h2>{user?.name}</h2>
            </div>
            <div className="channel-heading">
              <h5>Channels</h5>
            </div>
            <div className="joined-container">
              {user?.channels?.map((channel) => (
                // <SingleChannelLeft channel={channel} />
                <div
                  className="single-channel"
                  onClick={() => {
                    Howler.unload();
                    handleClick(channel);
                    if (channel?.channel_theme.length != 0)
                      soundPlay(channel?.channel_theme);
                  }}
                >
                  <img src={channel.channel_images} width="50px" height="50px" />
                  {channel.channel_name}
                </div>
              ))}
            </div>
          </div>
        )
      }

    </div>
  );
}

export default LeftComponent;
