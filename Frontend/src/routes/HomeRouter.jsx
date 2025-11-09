import { Routes, Route } from "react-router-dom";

export default function HomeRouter() {
  return (
    <Routes>
      <Route path="/" element={<div>Dashboard (protected)</div>} />

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
