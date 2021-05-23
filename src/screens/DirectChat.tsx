import React from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "stream-chat-react/dist/css/index.css";
import { useAuth, useUser } from "../store";

interface DirectChatProps {}

const DirectChat: React.FC<DirectChatProps> = ({}) => {
  const auth = useAuth();
  const user = useUser();

  const userToken =
    "muzy7mv359svpefu6suwygr4canu4aka5zn7zbwmahjyuvjr9nzps5zwm2mn4ahs";

  const chatClient = StreamChat.getInstance("dz5f4d5kzrue");

  chatClient.connectUser(
    {
      id: "muzy7mv359svpefu6suwygr4canu4aka5zn7zbwmahjyuvjr9nzps5zwm2mn4ahs",
      name: user.state.username,
      image:
        "https://getstream.io/random_png/?id=fragrant-recipe-1&name=fragrant",
    },
    userToken
  );

  const channel = chatClient.channel(
    "messaging",
    "muzy7mv359svpefu6suwygr4canu4aka5zn7zbwmahjyuvjr9nzps5zwm2mn4ahs",
    {
      image: "https://www.drupal.org/files/project-images/react.png",
      name: user.state.username,
      members: [user.state.username],
    }
  );

  return (
    <Chat client={chatClient} theme="messaging light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default DirectChat;
