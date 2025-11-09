import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-white p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="hidden md:flex flex-col justify-center px-8">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h1 className="text-3xl font-bold text-indigo-700">
              Welcome to CampusHub
            </h1>
            <p className="mt-3 text-gray-600">
              Secure portal for students and teachers. Fast login, clear UI, and
              role-based signup.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
