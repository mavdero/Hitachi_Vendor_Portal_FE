import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
  const params = useParams();
  const navigate = useNavigate();
  const location=useLocation();
  return (
    <WrappedComponent
      {...props}
      params={params}
      navigate={navigate}
      location={location}
    />
  );
};
export default withRouter;