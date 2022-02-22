import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { data: loggedIn } = useMeQuery();

  useEffect(() => {
    if (!loggedIn) navigate("/");
  }, [loggedIn, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
