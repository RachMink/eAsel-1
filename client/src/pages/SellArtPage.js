import React, { useContext } from "react";
import SellForm from "../components/SellForm";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
function SellArtPage(props) {
  const auth = useContext(AuthContext);
  if (auth.isAuthenticated) {
    return <SellForm />;
  } else {
    return <LoginForm from="/sellwithus" />;
  }
}

export default SellArtPage;
