import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../store/features/authSlice";

export default function useAuthPersist() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token);
    
    if (token) {
      // dispatch checkAuth to validate token and fetch user
      dispatch(checkAuth());
    }
  }, [dispatch]);
}
