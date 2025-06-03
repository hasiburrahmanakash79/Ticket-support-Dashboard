import { useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../../lib/api-client';

const useTicket = ({ page = 1, status = '', searchTerm = '' }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const res = await apiClient.get('/ticket/get-ticket-from-all-user', {
        params: {
          page,
          status,
          searchTerm
        }
      });

      setTickets(res?.data?.data || []);
      setTotalPages(res.data?.totalPages || 1); // Optional
      setError(null);

      console.log(res?.data?.data, "Tickets fetched successfully");
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError(err?.response?.data?.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [page, status, searchTerm]);

  return {
    tickets,
    loading,
    error,
    totalPages,
    refetch: fetchTickets
  };
};

export default useTicket;
