import React from "react";
import styled from "styled-components";
import { FlexDiv } from "./divs/FlexDiv";

export const Page: React.FC = ({ children }) => {
  return <StyledPage>{children}</StyledPage>;
};

const StyledPage = styled(FlexDiv)`
  width: 1000px;
  flex-direction: column;
  max-width: 90vw;
  flex-flow: column;
  justify-content: start;
  flex-grow: 1;
`;
