import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCourse } from '../../../API/Admin/Course/Course';
import { toast } from 'react-hot-toast';

const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      toast.promise(
        deleteCourse(id), 
        {
          loading: 'Deleting course...',
          success: 'Course deleted successfully!',
          error: 'Error deleting course!',
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
    }
  });
};

export default useDeleteCourse; 