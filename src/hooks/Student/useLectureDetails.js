import { useQuery } from "@tanstack/react-query";
import { getLectureDetails } from "../../API/Student/Student";

const useLectureDetails = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['lectures', id],  
    queryFn: () => getLectureDetails(id),   
    staleTime: 5 * 60 * 1000,  
    cacheTime: 10 * 60 * 1000,   
    refetchInterval: 5 * 60 * 1000,   
    refetchIntervalInBackground: true, 
    refetchOnWindowFocus: false, 
  });
  if (isError) {
    console.error("Error fetching lecture details:", error);
  }
  return { data, isLoading, isError, error };
};

export default useLectureDetails; 