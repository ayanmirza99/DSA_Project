import LoginPage from "../pages/Login";
import SignupSelect from "../pages/SignUpSelect";
import StudentSignup from "../pages/StudentSignUp";
import TeacherSignup from "../pages/TeacherSignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout";

export default function AuthRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="*" element={<Navigate to={`/`} replace />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupSelect />} />
        <Route path="/signup/student" element={<StudentSignup />} />
        <Route path="/signup/teacher" element={<TeacherSignup />} />
      </Route>
    </Routes>
  );
}
