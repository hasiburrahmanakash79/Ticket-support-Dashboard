// components/hook/useConversation.js
import { useEffect, useState } from "react";
import apiClient from "../../lib/api-client";

const useConversation = (ticketId) => {
  const [chat, setChat] = useState({ data: [] });
  const [loading, setLoading] = useState(true);

  const fetchChat = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/chat/${ticketId}`);
      setChat(res.data);
    } catch (error) {
      console.error("Failed to load conversation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchChat();
    }
  }, [ticketId]);

  const refetch = async () => {
    await fetchChat();
  };

  return { chat, loading, refetch };
};

export default useConversation;

