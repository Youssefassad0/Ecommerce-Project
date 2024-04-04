/* eslint-disable react/prop-types */
import React ,{useState}  from "react";
import Email from "./Email";
import ChatEngine  from "./ChatEngine";
import { styles } from "../style";


const SupportWindow = props => {
    const [user, setUser] = useState(null)
    const [chat, setChat] = useState(null)

    return (
        <div 
            className='transition-5'
            style={{
                ...styles.supportWindow,
                ...{ opacity: props.visible ? '1' : '0' },
                ...{display:props.visible?'block':'none'}
            }}
        >
            <Email
            setUser={user=>setUser(user)}
            setChat={chat=>setChat(chat)} 
            visible={user===null ||  chat===null}

             />
             <ChatEngine 
            visible={user!==null ||  chat!==null}
            chat={chat}
            user={user}

             
             />
        </div>
    )
}

export default SupportWindow;