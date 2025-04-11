import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {UserContext} from "../components/AuthorizeView"; // update this import as needed

const ManageMoviesButton = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  if (!user || !user.roles?.includes("Administrator")) return null;

  return (
    <button onClick={() => navigate("/admin")}>
      Manage Movies
    </button>
  );
};

export default ManageMoviesButton;
