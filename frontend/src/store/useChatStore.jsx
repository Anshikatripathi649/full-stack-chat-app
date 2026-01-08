import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
 messages: [],
 users: [],
 selectedUser: null,
 isUsersLoading: false,
 isMessagesLoading: false,

 getUsers: async() => {
    set({ isUsersLoading: true});
    try{
        const res = await axiosInstance.get('/messages/users');
        set({ users: res.data});
    }catch(err){
        toast.error(err.response?.data?.message || "Some Internal Server Error");
    }finally{
        set({ isUsersLoading: false});
    }

 },

 getMessages: async(userId) => {
    set({ isMessagesLoading:true });
    try{
        const res = await axiosInstance.get(`/messages/${userId}`);
        set({ messages: res.data });
    }catch(err) {
        toast.error(err.response?.data?.message || "Error loading messages");
    }finally {
        set({isMessagesLoading:false});
    }
   
 },

 sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.respons?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessage: () => {
    const { selectedUser} = get();
    if(!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
    const isMessageFromSelectedUser = newMessage.senderId === get().selectedUser._id;
       if (!isMessageFromSelectedUser) return; // Ignore if it's not the current chat
        set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },

//  todo: optimize this one later
 setSelectedUser: (selectedUser) => {
    set({selectedUser});
 },

}));