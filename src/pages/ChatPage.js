import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Conversations from '../components/Conversations';
import Header from '../components/Header';
import Message from '../components/Message';
import { getConversations } from '../store/conversation/api.conversation';
import { getMessages, sendMessage } from '../store/message/api.message';
import './ChatPage.css';

function ChatPage() {
  const dispatch = useDispatch();
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const { conversations } = useSelector((state) => state.getConversations);
  const { messages } = useSelector((state) => state.getMessages);
  const { currentUser } = useSelector((state) => state.userLogin);

  console.log(conversations);
  useEffect(() => {
    dispatch(getConversations());
  }, []);
  useEffect(() => {
    if (currentChat?._id) dispatch(getMessages(currentChat?._id));
  }, [currentChat]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    dispatch(sendMessage(message));
  };
  return (
    <div>
      <Header />
      <div className="content-container flex">
        <div className="flex border-r w-1/4">
          <div className="p-2.5 w-full h-full ">
            {conversations?.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversations conversation={c} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 border-r">
          <div className="flex flex-col relative justify-between h-full p-2.5">
            {currentChat ? (
              <>
                <div className="h-full overflow-y-scroll pr-2.5">
                  {messages?.map((m) => (
                    <div>
                      <Message
                        message={m}
                        own={m?.senderId?._id === currentUser._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-1 flex items-center justify-between ">
                  <textarea
                    className="w-4/5 h-[90px] p-2.5 rounded-lg"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="w-20 h-10 border-none rounded-md cursor-pointer bg-green-700 text-white"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {/* <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
