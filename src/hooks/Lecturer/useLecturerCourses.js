import { useQuery } from "@tanstack/react-query";
import { getLecturerCourses } from "../../API/Lecturer/Lecturer";

const useLecturerCourses = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['lecturerCourses'],
    queryFn: getLecturerCourses,
    staleTime: 2 * 60 * 1000,         // 2 minutes
    cacheTime: 2 * 60 * 1000,         // 2 minutes
    refetchInterval: 2 * 60 * 1000,   // Refetch every 2 minutes
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};

export default useLecturerCourses; 