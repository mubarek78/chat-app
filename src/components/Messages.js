import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  // const chatsCollectionRef = collection(db, "chats");
  // const [chats, setChats] = useState([]);


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);

      // const chatdata = getDocs(chatsCollectionRef);
      // setChats(chatdata.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)
  {if(messages.length > 0){
  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
      }
      // else{
      //   return (
      //     <div className="chats">
      //      <h1>say HI</h1>
       
      //     </div>
      //   );
      // }
    }
};

export default Messages;