import axios from "axios";

export const getLecturerCourses = async () => {
   try {
    const option = {
      url: "https://graduation-project-lilac-five.vercel.app/doctor/coursesByDoctor",
      method: "GET",
       headers: {
        Authorization: sessionStorage.getItem("Token")
      }
    };

    const { data } = await axios.request(option);
    if (data.message === "success") {
       
      return data.courses
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Error occurred");
  }
}

export const addTopic = async (values, toast) => {
  toast.loading("Adding topic...");
  try {
    const option = {
      url: "https://graduation-project-lilac-five.vercel.app/doctor",
      method: "POST",
      data: values, // القيم المرسلة
      headers: {
        Authorization: sessionStorage.getItem("Token"),
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.request(option);

    

    toast.dismiss();

    if (data.message === "success") {
      toast.success("Topic added successfully");
    }
  } catch (error) {
    toast.dismiss();
    toast.error(error.response?.data?.message || "Error occurred");
  }
};
 
export  async function getCourseDetails (_id){
  try {
    const option = {
      url: `https://graduation-project-lilac-five.vercel.app/doctor/getContent/${_id}`,
      method: "GET",
      headers: {
        Authorization: sessionStorage.getItem("Token")
      }
    };
    const { data } = await axios.request(option);
    if (data.message === "success") {
      return data
    }
  } catch (error) {
   toast.error(error.response?.data?.message || "Error occurred");
  }
}
 
export async function deleteTopic(_id, queryClient, toast) {
  const loadingToastId = toast.loading("Deleting topic...");
  try {
    const option = {
      url: `https://graduation-project-lilac-five.vercel.app/doctor/${_id}`,
      method: "DELETE",
      headers: {
        Authorization: sessionStorage.getItem("Token")
      },
    };

    const { data } = await axios.request(option);
    toast.dismiss(loadingToastId);

    if (data.message === "success") {
      toast.success("Topic deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["courseDetails"] });
      queryClient.invalidateQueries({ queryKey: ["lecturerCourses"] });
    }
  } catch (error) {
    toast.dismiss(loadingToastId);
 
    toast.error(error.response?.data?.message || "Error occurred");
  }
}
