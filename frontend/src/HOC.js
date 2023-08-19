import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (WrapperComponent) => (props) => {
  let location = useLocation();
  let params = useParams();
  let navigate = useNavigate();
  return (
    <WrapperComponent
      {...props}
      location={location}
      params={params}
      navigate={navigate}
    />
  );
};

export default withRouter;
