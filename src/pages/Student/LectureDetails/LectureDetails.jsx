import { useParams } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import FilePlayer from "../../../components/FilePlayer/FilePlayer";
import LectureCard from "../../../components/LectureCard/LectureCard";
import useLectureDetails from "../../../hooks/Student/useLectureDetails";
import useAllLectures from "../../../hooks/Student/useAllLectures";

export default function LectureDetails() {
  const { lectureId } = useParams();
   let id = sessionStorage.getItem("Lectures ID") ;

  const {
    data,
    isLoading: lectureLoading,
    isError: lectureError
  } = useLectureDetails(lectureId);
  //  if (data) {
  //     id = data.file._courseId;
  //  }
   
  const {
    data:lectures,
    isLoading,
    isError
  } = useAllLectures(id);
  if (lectureLoading || isLoading) {
    return <p className="text-center text-gray-600">Loading lectures...</p>;
  }

  if (lectureError  || !data || isError) {
    return <p className="text-center text-red-600">An error occurred while loading lectures.</p>;
  }

  const { videoStream, file: { courseTitle, file: { secure_url } } } = data;

  const filteredLectures = lectures.lectures?.filter((lecture) => lecture._id !== lectureId) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle text={courseTitle} />
      <div className="grid grid-cols-12 gap-4">
        <div className="md:col-span-8 col-span-12">
          <VideoPlayer video={videoStream} />
          <FilePlayer file={secure_url} />
        </div>
        <div className="md:col-span-4 col-span-12">
          {filteredLectures.length > 0 ? (
            <div className="grid md:grid-cols-4 gap-4">
              {filteredLectures.map((lecture) => (
                <LectureCard key={lecture._id} videoType={"lec"} {...lecture} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              All lectures have already been viewed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
