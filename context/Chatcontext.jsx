// import { createContext, useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import toast from "react-hot-toast";



// export const Chatcontext=createContext();
// export const ChatProvider=({children})=>{
//     const [message,setMessage]=useState([]);
//     const [users,setUsers]=useState([]);
//     const [selectedUser,setSelectedUser]=useState(null);//we will store the id of the user where we store the id of these
//     //user where we want to chat

//     //here we store the id of the user and the number of unseen messeges from user

//     const [unseenMessages,setUnseenMessages]=useState({});

//     const {socket,axios}=useContext(AuthContext);

//     //function to get all user from sidebar

//     const getUser=async ()=>{
//         try{
//         const { data } =await axios.get("/api/messages/users");
//         if(data.success){
//             setUsers(data.users)
//             setUnseenMessages(data.unseenMessages);


//         }
//         }
//         catch(err){
//            console.log("there is an error while sending message")
//             toast.error(err.message);

//         }
//     }

//     //function to get messages for selected user
//     const getMessages=async (userId)=>{
//         try{
//        const {data}=await axios.get(`/api/messages/${userId}`);
//        if(data.success){
//         setMessage(data.message);
//        }

//         }
//         catch(err){
//             console.log("error while chating")
//             toast.error(err);

//         }
//     }

//     //function to send message to the selected user
//     const sendMessage=async (messageData)=>{
//         try {
//             const {data}=await axios.post(`/api/messages/send/${selectedUser._id}`,messageData)
//            if(data.success){
//             setMessage((prevMessages)=>[...prevMessages,data.newMessage]);
//            }
//            else{
//             toast.error(data.message);
//            }
//         }
//         catch(err){
//             toast.apply(err.message);

//         }

//     }

//     //function to subscribe to message for selected user
//     const subscribeToMessage=async ()=>{
//         if(!socket) return;
//         socket.on("newMessage",(newMessage)=>{
//             if(selectedUser && newMessage.senderId===selectedUser._id){
//                 newMessage.seen=true;
//                 setMessage((prevMessages)=>[...prevMessages,newMessage]);
//                 axios.put(`/api/messages/mark/${newMessage._id}`);
//             }
//             else{
//                setUnseenMessages((prevUnseenMessages)=>({
//                 ...prevUnseenMessages,[newMessage.senderId] :
//                 prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId]+1 : 1
//                }))
//             }

            
//         })
//     }

//     //function to unsubscribes from messages
//     const unsubscribesFromMessages=()=>{
//         if(socket) socket.off("newMessage");
//     }
//     useEffect(()=>{
//      subscribeToMessage();
//      return ()=>unsubscribesFromMessages();
//     },[socket,selectedUser]) //when there is any change in both of the element of the dependency array then
//     //these function will be called


//     const value={
//         message,user,selectedUser,getUser,setMessage,sendMessage,setSelectedUser,unseenMessages,setUnseenMessages

//     }
//     return (
//   <Chatcontext.Provider value={value}>
//     {children}
//   </Chatcontext.Provider>
// );


// }



import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

// Create Chat context
export const Chatcontext = createContext();

export const ChatProvider = ({ children }) => {
  const [message, setMessage] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // user we want to chat with
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios, authUser: user } = useContext(AuthContext);

  // Function to get all users for sidebar
  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (err) {
      console.log("There is an error while fetching users");
      toast.error(err.message);
    }
  };

  // Function to get messages for selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessage(data.message);
      }
    } catch (err) {
      console.log("Error while fetching messages");
      toast.error(err.message);
    }
  };

  // Function to send message to selected user
  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        setMessage((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Function to subscribe to new messages via socket
  const subscribeToMessage = () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessage((prevMessages) => [...prevMessages, newMessage]);
        axios
          .put(`/api/messages/mark/${newMessage._id}`)
          .catch((err) => console.error("Failed to mark message", err));
      } else {
        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  // Function to unsubscribe from socket events
  const unsubscribesFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  // Setup/cleanup socket listeners
  useEffect(() => {
    subscribeToMessage();
    return () => unsubscribesFromMessages();
  }, [socket, selectedUser]);

  // Context value to provide
  const value = {
    message,
    user,
    users,
    selectedUser,
    getUser,
    setMessage,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    getMessages,
  };

  return (
    <Chatcontext.Provider value={value}>
      {children}
    </Chatcontext.Provider>
  );
};
