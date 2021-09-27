import Conversations from '../components/Conversation/Conversations';
import Header from '../components/Header';
import Message from '../components/Message/Message';
import './ChatPage.css';

function ChatPage() {
  return (
    <div>
      <Header />
      <div className="content-container flex">
        <div className="flex bg-blue-900 w-1/4">
          <div className="p-2.5 h-full ">
            {/* {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}> */}
            <Conversations
            //  conversation={c} currentUser={user}
            />
            {/* </div> */}
            {/* ))} */}
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col relative justify-between h-full p-2.5">
            {/* {currentChat ? ( */}
            <>
              <div className="h-full overflow-y-scroll pr-2.5">
                {/* {messages.map((m) => ( */}
                <div>
                  <Message />
                  <Message />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                </div>
                {/* ))} */}
              </div>
              <div className="mt-1 flex items-center justify-between ">
                <textarea
                  className="w-4/5 h-[90px] p-2.5 rounded-lg"
                  placeholder="write something..."
                  // onChange={(e) => setNewMessage(e.target.value)}
                  // value={newMessage}
                ></textarea>
                <button
                  className="w-20 h-10 border-none rounded-md cursor-pointer bg-green-700 text-white"
                  // onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </>
            {/* ) : ( */}
            {/* <span className="noConversationText">
              Open a conversation to start a chat.
            </span> */}
            {/* )} */}
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
