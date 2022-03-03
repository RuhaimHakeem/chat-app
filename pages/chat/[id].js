import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../components/chat-screen";
import Sidebar from "../../components/sidebar";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/get-recipient-email";

const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat With {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  // const ref = doc(db, "chats", context.query.id);

  //PREP the messages on the server
  // const messageRes = await collection(ref);

  // const colref = collection(messageRef, "messages");

  // const q = query(colref, orderBy("timestamp, asc"));
  // const data = await getDocs(q);
  const chatRef = doc(db, "chats", context.query.id);
  const messagesRes = await getDocs(
    query(collection(chatRef, "messages"), orderBy("timestamp", "asc"))
  );

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //prep the chats

  const chatRes = await getDoc(chatRef);
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; //IE and EDGE
  scrollbar-width: none; // Firefox
`;
