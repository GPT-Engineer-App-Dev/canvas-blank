import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from './client';

// Helper function to handle Supabase queries
const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

// Fetch events
export const useEvents = () => useQuery({
  queryKey: ['events'],
  queryFn: () => fromSupabase(supabase.from('events').select('*')),
});

// Add a new event
export const useAddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};

// Fetch comments
export const useComments = () => useQuery({
  queryKey: ['comments'],
  queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});

// Add a new comment
export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });
};

/**
 * Types and relations:
 * 
 * events:
 * - id: bigint (Primary Key)
 * - created_at: timestamp with time zone
 * - name: text
 * - date: date
 * - description: text
 * 
 * comments:
 * - id: bigint (Primary Key)
 * - created_at: timestamp with time zone
 * - content: text
 * - event_id: bigint (Foreign Key to events.id)
 */