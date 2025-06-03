import { useEffect, useState } from "react";
import apiClient from "../../lib/api-client";

const useConversation = (ticketId) => {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticketId) return;

    const fetchChat = async () => {
      try {
        const res = await apiClient.get(`/chat/${ticketId}`);
        setChat(res.data); // assume API response e full message array thake
      } catch (error) {
        console.error("Error fetching chat:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [ticketId]);

  return { chat, loading };
};

export default useConversation;
