import { CometChat } from "@cometchat-pro/chat";
import config from "../cometConfig";

import React from "react";

interface ChatProps {}

const Chat: React.FC<ChatProps> = ({}) => {
  const LISTENER_KEY_MESSAGE = "msglistener";
  const appId = config.appId;
  const apiKey = config.apiKey;
  const LISTENER_KEY_GROUP = "grouplistener";
  const init = () => {
    return CometChat.init(appId);
  };
  const getTextMessage = (uid: string, text: string, msgType: string) => {
    if (msgType === "user") {
      return new CometChat.TextMessage(
        uid,
        text,
        CometChat.MESSAGE_TYPE.TEXT
        // CometChat.RECEIVER_TYPE.USER
      );
    } else {
      return new CometChat.TextMessage(
        uid,
        text,
        CometChat.MESSAGE_TYPE.TEXT
        // CometChat.RECEIVER_TYPE.GROUP
      );
    }
  };
  const getLoggedinUser = () => {
    return CometChat.getLoggedinUser();
  };
  const login = (UID: string) => {
    return CometChat.login(UID, apiKey);
  };
  const getGroupMessages = (GUID: string, callback: any, limit = 30) => {
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(GUID)
      .setLimit(limit)
      .build();
    callback();
    return messagesRequest.fetchPrevious();
  };
  const sendGroupMessage = (UID: string, message: string) => {
    const textMessage = getTextMessage(UID, message, "group");
    return CometChat.sendMessage(textMessage);
  };
  const joinGroup = (GUID: string) => {
    return CometChat.joinGroup(GUID, CometChat.GROUP_TYPE.PUBLIC, "");
  };
  const addMessageListener = (callback: any) => {
    CometChat.addMessageListener(
      LISTENER_KEY_MESSAGE,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage: string) => {
          callback(textMessage);
        },
      })
    );
  };
  return null;
};

export default Chat;
