import { useQuery } from "@tanstack/react-query";
import { getNewest } from "../../API/Student/Student";

const useNewest = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['Newest Uploaded'],  
    queryFn: () => getNewest(),  
    staleTime: 5 * 60 * 1000,  
    cacheTime: 10 * 60 * 1000,   
    refetchInterval: 5 * 60 * 1000,   
    refetchIntervalInBackground: true, 
    refetchOnWindowFocus: false, 
  });
            
  return { data, isLoading, isError };
};

export default useNewest; 