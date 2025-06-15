import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../../API/Admin/Course/Course";

const useAllCourses = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['courses'],  
    queryFn: () => getAllCourses(),
    staleTime: 2 * 60 * 1000,         // 2 minutes
    cacheTime: 2 * 60 * 1000,         // 2 minutes
    refetchInterval: 2 * 60 * 1000,   // Refetch every 2 minutes
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};

export default useAllCourses; 