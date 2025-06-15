import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login/Login';
import SignUp from "./pages/SignUp/SignUp";
import LandingPage from "./pages/LandingPage/LandingPage";

import StudentHome from "./pages/Student/StudentHome";

import Lectures from './pages/Student/Lectures/Lectures';
import Sections from './pages/Student/Sections/Sections';
import Subjects from "./pages/Student/Subjects/Subjects";
import SectionsOfSubjects from "./pages/Student/SectionsOfSubjects/SectionsOfSubjects";
import LectureDetails from "./pages/Student/LectureDetails/LectureDetails";

import AdminHome from "./pages/Admin/AdminHome";

import StudentLayout from "./layouts/StudentLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";

import UserProvider from "./context/User.context";
import AddCourse from "./pages/Admin/Courses/AddCourse/AddCourse";
import DisplayAllCourses from "./pages/Admin/Courses/DisplayAllCourses/DisplayAllCourses";
 
import DisplayAllLecturers from "./pages/Admin/Lecturer/DisplayAllLecturers/DisplayAllLecturers";
import AddLecturer from "./pages/Admin/Lecturer/AddLecturer/AddLecturer";

import LecturerLayout from "./layouts/LecturerLayout";
import LecturerHome from "./pages/Lecturer/LecturerHome";
import AddTopic from "./pages/Lecturer/AddTopic/AddTopic";
import CourseDetails from "./pages/Lecturer/CourseDetails/CourseDetails";
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    window.onpopstate = () => {
      const currentPath = window.location.pathname;
      const protectedRoutes = ['/admin', '/student', '/lecturer'];
      const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));

      if (!isProtectedRoute) {
        sessionStorage.removeItem("Token");
        sessionStorage.removeItem("Role");
        window.location.reload();
      }
    };
  }, []);
   const router = createBrowserRouter([
    {
      path: "/",
      element: <GuestRoute><LandingPage /></GuestRoute>,
      index: true
    },
    {
      path: "/login",
      element: (
        <GuestRoute>
          <Login />
        </GuestRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <GuestRoute>
          <SignUp />
        </GuestRoute>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <AdminHome /> },
        {
          path: "courses",
          children: [
            { path: "displayAllCourses", element: <DisplayAllCourses/>},
            { path: "addCourse", element: <AddCourse/>},
          ]
        },
        {
          path: "lecturers",
          children: [
            { path: "displayAllLecturers", element: <DisplayAllLecturers /> },
            { path: "addLecturer", element: <AddLecturer /> },
          ]
        }
      ]
    },
    {
      path: "/student",
      element: (
        <ProtectedRoute>
          <StudentLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <StudentHome /> },
        { path: "subjects", element: <Subjects /> },
        { path: "subject/:id", element: <Lectures /> },
        { path: "sections", element: <Sections /> },
        { path: "section/:SubjectId", element: <SectionsOfSubjects /> },
        { path: "topic/:subjectId/content/:lectureId", element: <LectureDetails /> },
      ],
    },
    {
      path: "/lecturer",
      element: (
        <ProtectedRoute>
          <LecturerLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <LecturerHome /> },
        {path:"add-topic", element: <AddTopic />},
        {path:"course-details/:_id", element: <CourseDetails />},
      ]
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
