import React from "react";
import { Navbar, Form, Button, Nav, FormControl } from "react-bootstrap";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import { useStateValue } from "../StateProvider";
import SearchUser from "./SearchUser";
import { Howl, Howler } from "howler";
function SearchComponent() {
  const [{ user, channels, clickedChannel }, dispatch] = useStateValue();
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

  const [search, setSearch] = React.useState([]);
  const closeShowdown = () => {
    $(".formSearch").val(null);
    setSearch(null);
  };

  const handleClick = (channelId) => {
    console.log(channelId);
    dispatch({
      type: "LEFT_CHANNEL",
      channelId: channelId,
    });
  };
  const searchUser = () => {
    var channelList = [];
    var searchInput = _.lowerCase(_.camelCase($(".formSearch").val())).replace(
      /\s+/g,
      ""
    );
    channels?.map((userTemp) => {
      if (
        _.lowerCase(_.camelCase(userTemp.channel_name))
          .replace(/\s+/g, "")
          .includes(searchInput)
      ) {
        channelList.push(userTemp);
      }
    });
    setSearch(channelList);
  };

  return (
    <div className="fullSearch">
      <div className="searchContainer">
        <FormControl
          type="text"
          placeholder="Search channels"
          className="formSearch"
          onChange={searchUser}
        />
      </div>

      <div className="displaySearch">
        {/* <ReactLoading type='spinningBubbles' width='40px' height='40px' className='displaySearchLoading' color='black' /> */}
        <div className="displaySearchContents">
          {$(".formSearch").val() !== "" ? (
            search.length !== 0 ? (
              search.map((searchedChannel) => {
                return (
                  <div
                    onClick={() => {
                      handleClick(searchedChannel);
                      Howler.unload();
                      if (searchedChannel?.channel_theme.length != 0)
                        soundPlay(searchedChannel?.channel_theme);
                    }}
                  >
                    <SearchUser
                      className="searchUser"
                      channel={searchedChannel}
                    />
                  </div>
                );
              })
            ) : (
              <p className="searchUser" id="notFound">
                User not found
              </p>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
