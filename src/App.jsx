import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie/es6";

import { ChannelListContainer, ChannelContainer, Auth } from "./components";

import "./App.css";
import 'stream-chat-react/dist/css/index.css'

const apiKey = "n2heeqb665um";

const cookies = new Cookies();
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser({
    id: cookies.get("userId"),
    name: cookies.get("userName"),
    fullName: cookies.get("fullName"),
    image: cookies.get("avatarURL"),
    hashedPassword: cookies.get("hashedPassword"),
    phoneNumber: cookies.get("phoneNumber"),
  }, authToken );
}

const App = () => {
  const [ createType, setCreateType ] = useState('');
  const [ isEditing, setIsEditing ] = useState(false);
  const [ isCreating, setIsCreating ] = useState(false);

  if (!authToken) return <Auth />;

  return (

    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer 
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
        <ChannelContainer 
          isCreating={isCreating}
          isEditing={isEditing}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
