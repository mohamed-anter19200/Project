import { useQuery } from "@tanstack/react-query";
import { getAllLectures } from "../../API/Student/Student";

const useAllLectures = (id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['lectures', id],  
    queryFn: () => getAllLectures(id),  
    staleTime: 5 * 60 * 1000,  
    cacheTime: 10 * 60 * 1000,   
    refetchInterval: 5 * 60 * 1000,   
    refetchIntervalInBackground: true, 
    refetchOnWindowFocus: false, 
  });

  return { data, isLoading, isError };
};

export default useAllLectures; 