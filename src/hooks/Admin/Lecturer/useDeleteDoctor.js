import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoctor } from '../../../API/Admin/Lecturer/Lecturer';
import { toast } from 'react-hot-toast';

const useDeleteDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      toast.promise(
        deleteDoctor(id), 
        {
          loading: 'Deleting lecturer...',
          success: 'Lecturer deleted successfully!',
          error: 'Error deleting lecturer!',
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['doctors']);
    }
  });
};

export default useDeleteDoctor; 