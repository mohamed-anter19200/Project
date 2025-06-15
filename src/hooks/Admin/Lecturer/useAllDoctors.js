import { useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "../../../API/Admin/Lecturer/Lecturer";

const useAllDoctors = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['doctors'],  
    queryFn: () => getAllDoctors(),
    staleTime: 2 * 60 * 1000,         
    cacheTime: 2 * 60 * 1000,    
    refetchInterval: 2 * 60 * 1000,    
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};

export default useAllDoctors; 