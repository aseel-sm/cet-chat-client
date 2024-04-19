import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  /* margin: 0px 10px; */
  /* border: 1px solid black; */
  height: 10%;
  border-radius: 10px;

  box-sizing: border-box;
`;
const Logo = styled.img`
  height: 100%;
`;
const Header = () => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate("/")}>
      {" "}
      <div></div>
      <Logo src="/cet_speaks.png" />
      <div></div>
    </Container>
  );
};

export default Header;
