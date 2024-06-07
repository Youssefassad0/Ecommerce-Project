/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState } from "react";
import { styles } from "../style";
import { LoadingOutlined } from "@ant-design/icons";
import Avatar from "../Avatar";
import axios from "axios";
const Email = (props) => {
  const [email, setEMail] = useState("");
  const [loading, setLoading] = useState(false);
function getOrCreateUser(callback){
axios.put('https://api.chatengine.io/users/',
{
"username": email,
"secret": email,
"email": email

},
{
    headers:{"Private-Key":"9f444a2d-0ba8-406b-81e6-9c51653dc7aa"
}
}
).then(r=>callback(r.data))
}

function getOrCreateChat(callback){
    axios.put('https://api.chatengine.io/chats/',
{
    "usernames": ["Assad Shop", email],
    "is_direct_chat": true

},
{
    headers:{"Private-Key":"9f444a2d-0ba8-406b-81e6-9c51653dc7aa"
}
}
).then(r=>callback(r.data))
}

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    console.log("Your Mail : ", email);
    getOrCreateUser(user=>{
      props.setUser(user)
      getOrCreateChat(
        chat=>props.setChat(chat)
        )})
   
    
  }

  
  return (
    <div
      style={{
        ...styles.emailFormWindow,
        ...{
          height: props.visible ? "100%":"0%",
          opacity:props.visible ? "1" : '0',
        },
      }}
    >
      <div style={{ height: "0px" }}>
        <div style={styles.stripe} />
      </div>
      <div
        className="transition-5"
        style={{
          ...styles.loadingDiv,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "0.33" : "0",
          },
        }}
      />
      <LoadingOutlined
        className="transition-5"
        style={{
          ...styles.loadingIcon,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "1" : "0",
            fontSize: "82px",
            top: "calc(50% - 41px)",
            left: "calc(50% - 41px)",
          },
        }}
      />
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Avatar
          style={{
            position: "relative",
            left: "calc(50% - 44px)",
            top: "10%",
          }}
        />
        <div style={styles.topText}>
          Welcome To Our <br />
          Support
        </div>

        <form
          onSubmit={e => handleSubmit(e)}
          style={{
            position: "relative",
            width: "100%",
            top: "19.75%",
          }}
        >
          <input
            type="email"
            style={styles.emailInput}
            onChange={(e) => setEMail(e.target.value)}
            placeholder=" Your Email.. "
          />
        </form>
        <div style={styles.bottomText}>
          Enter Your Email <br />
          To Get Stated
        </div>
      </div>
    </div>
  );
};

export default Email;
