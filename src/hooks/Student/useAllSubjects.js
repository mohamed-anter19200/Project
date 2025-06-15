import { useQuery } from "@tanstack/react-query";
import { getAllSubjects } from "../../API/Student/Student";

const useAllSubjects = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["subjects"], 
    queryFn: getAllSubjects,  
    staleTime: 5 * 60 * 1000,  
    cacheTime: 10 * 60 * 1000,   
    refetchInterval: 5 * 60 * 1000,   
    refetchIntervalInBackground: true, 
    refetchOnWindowFocus: false, 
  });

  return { data, isLoading, isError };
};

export default useAllSubjects; 