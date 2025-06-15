import { useQuery } from "@tanstack/react-query";
import { getSectionsOfSubject } from "../../API/Student/Student";

const useSectionsOfSubject = (SubjectId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['sectionsOfSubjects', SubjectId],  
    queryFn: () => getSectionsOfSubject(SubjectId),  
    staleTime: 5 * 60 * 1000,  
    cacheTime: 10 * 60 * 1000,   
    refetchInterval: 5 * 60 * 1000,   
    refetchIntervalInBackground: true, 
    refetchOnWindowFocus: false, 
  });
            
  return { data, isLoading, isError };
};

export default useSectionsOfSubject; 