import { useQuery } from "@tanstack/react-query";
import { getCourseDetails } from "../../API/Lecturer/Lecturer";

const useCourseDetails = (_id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['courseDetails', _id], // ✅ مفتاح فريد لكل كورس
    queryFn: () => getCourseDetails(_id),
    staleTime: 0,
    cacheTime: 0,
    refetchInterval: 0,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};

export default useCourseDetails;
