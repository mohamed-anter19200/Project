import axios from "axios";

export async function getAllDoctors() {
  try {
    const options = {
      url: "https://graduation-project-lilac-five.vercel.app/admin/getAllDoctors",
      method: "GET",
      headers: {
        Authorization: sessionStorage.getItem("Token")
      }
    };

    const { data } = await axios.request(options);
    if (data.message === "success") { 
      console.log(data);
      return data;
    }
  } catch (error) {
    return [];
  }
}

export async function addDoctor(values,toast,queryClient) {
  const loadingToastId = toast.loading("Adding lecturer...");
  
  try {
    const options = {
      url: "https://graduation-project-lilac-five.vercel.app/admin/addDoctors",
      method: "POST",
      headers: {
        Authorization: sessionStorage.getItem("Token"),
        "Content-Type": "application/json",
      },
      data: values,
    };

    const { data } = await axios.request(options);
    toast.dismiss(loadingToastId);
    if (data.message === "success") {
      toast.success("Lecturer added successfully!");
      queryClient.invalidateQueries(['doctors']);
    }
  } catch (error) {
    toast.error("Error adding lecturer!");
    throw error;
  }
}

 

 
export async function deleteDoctor(id) {
  try {
    const options = {
      url: `https://graduation-project-lilac-five.vercel.app/admin/deleteDoctor/${id}`,
      method: "DELETE",
      headers: {
        Authorization: sessionStorage.getItem("Token")
      }
    };

    const { data } = await axios.request(options);
  
   } catch (error) {
    throw error;
  }
}
