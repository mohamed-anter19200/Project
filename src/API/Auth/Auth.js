import axios from "axios";

export async function sendDataToSignUp(values, navigate, setToken, toast) {
  const loadingToastId = toast.loading("Signing up...");
  try {
    const option = {
      url: "https://graduation-project-lilac-five.vercel.app/users/signup",
      method: "post",
      data: values,
    };

    const { data } = await axios.request(option);
    toast.dismiss(loadingToastId);
    if (data.message === "success") {
      toast.success("Signed up successfully!");
      sessionStorage.setItem("Token",data.token)
      setToken(data.token);  
      navigate('/student');
    }  
  } catch (error) {
    toast.dismiss(loadingToastId);
    toast.error(error.response.data.msg);
  }
}

export async function sendDataToLogIn(values, navigate, setToken, setRole, toast) {
  const loadingToastId = toast.loading("Logging in...");
  try {
    const option = {
      url: "https://graduation-project-lilac-five.vercel.app/users/login",
      method: "post",
      data: values,
    };

    const { data } = await axios.request(option);
    const { message, token, role } = data;
    console.log(data);
    toast.dismiss(loadingToastId);
    if (message === "success") {
      toast.success("Logged in successfully!");
      sessionStorage.setItem("Token", token);
      sessionStorage.setItem("Role", role);
      setToken(token);
      setRole(role);      
      setTimeout(() => {
        if (role === "admin") {
          navigate('/admin', { replace: true });
        } else if (role === "student") {
          navigate('/student', { replace: true });
        } else if ( role == "doctor" ) {
          navigate('/lecturer', { replace: true });
        }  
      }, 50);
    }
  } catch (error) {
    toast.dismiss(loadingToastId);
    toast.error("Error during login!");
   }
}


export function logout(navigate, setToken) {
  sessionStorage.clear()
  setToken(null);
  navigate("/login", { replace: true });
}
