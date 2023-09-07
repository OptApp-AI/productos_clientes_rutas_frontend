import React from "react";
import { Alert } from "react-bootstrap";
import styled from "styled-components";

const StyledAlert = styled(Alert)`
  line-height: 100px;
  color: #fff;
  font-size: 30px;
  margin: 0 auto;
`;

const Mensaje = ({ variant, children }) => {
  return <StyledAlert variant={variant}>{children}</StyledAlert>;
};

export default Mensaje;
