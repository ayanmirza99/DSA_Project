import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout";
import Button from "../components/Button";

export default function SignupSelect() {
  const [role, setRole] = useState(null); // 'student' | 'teacher'
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Create account</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div
          onClick={() => {
            setRole("student");
            navigate("/signup/student");
          }}
          className={`p-6 rounded-2xl border cursor-pointer ${
            role === "student"
              ? "ring-2 ring-indigo-200 shadow"
              : "hover:shadow-md"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-50 grid place-items-center text-indigo-600 text-2xl">
              🎓
            </div>
            <div>
              <h3 className="font-semibold">Sign up as Student</h3>
              <p className="text-sm text-gray-500">
                Register with your student roll number and details.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant={role === "student" ? "primary" : "secondary"}>
              Continue as Student
            </Button>
          </div>
        </div>

        <div
          onClick={() => {
            setRole("teacher");
            navigate("/signup/teacher");
          }}
          className={`p-6 rounded-2xl border cursor-pointer ${
            role === "teacher"
              ? "ring-2 ring-indigo-200 shadow"
              : "hover:shadow-md"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 grid place-items-center text-amber-600 text-2xl">
              🏫
            </div>
            <div>
              <h3 className="font-semibold">Sign up as Teacher</h3>
              <p className="text-sm text-gray-500">
                Register as teacher with your employee ID and contact info.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant={role === "teacher" ? "primary" : "secondary"}>
              Continue as Teacher
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Link to="/" className="text-sm text-indigo-500 hover:underline">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
