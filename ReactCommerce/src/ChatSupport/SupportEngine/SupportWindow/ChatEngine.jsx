/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine';

const ChatEngine = (props) => {
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (props.visible) {
            setTimeout(() => {
                setShowChat(true);
            }, 500);
        }
    }, [props.visible]);

    return (
        <div
            className='transition-5'
            style={{
                ...styles.chatEngineWindow,
                ...{
                    height: props.visible ? '100%' : '0px',
                    zIndex: props.visible ? '100' : '0',
                },
            }}
        >
            {showChat && (
                <ChatEngineWrapper>
                    <Socket
                        projectID={"7e4250d3-9e9f-4e72-b0a7-e51b43a14f35"}
                        userName={props.user.email}
                        userSecret={props.user.email}
                    />
                    <ChatFeed activeChat={props.chat && props.chat.id} />
                </ChatEngineWrapper>
            )}
        </div>
    );
};

export default ChatEngine;

const styles = {
    chatEngineWindow: {
        width: '100%',
        backgroundColor: '#fff',
    },
};
