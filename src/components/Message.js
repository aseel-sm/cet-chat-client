import React from "react";
import styled from "styled-components";
const Container = styled.div`
  background-color: ${(props) =>
    props.type === "incoming" ? "#c9d6df" : "#c9d6df"};
  width: max-content;
  max-width: 50%;
  box-sizing: border-box;
  word-wrap: break-word;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 10px;
  border-top-right-radius: ${(props) => props.type !== "incoming" && "0px"};
  border-top-left-radius: ${(props) => props.type === "incoming" && "0px"};
  color: ${(props) => (props.type === "incoming" ? "#6c6c6c" : "#6c6c6c")};
  font-weight: 500;
  position: relative;
  align-self: ${(props) =>
    props.type === "incoming" ? "flex-start" : "flex-end"};

  &::after {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;

    border-left: ${(props) =>
      props.type === "incoming"
        ? " 10px solid transparent"
        : " 10px solid #c9d6df"};

    border-right: ${(props) =>
      props.type === "incoming"
        ? " 10px solid #c9d6df"
        : " 10px solid transparent"};

    border-top: 10px solid #c9d6df;

    border-bottom: 10px solid transparent;
    right: ${(props) => props.type !== "incoming" && "-19px"};
    left: ${(props) => props.type === "incoming" && "-19px"};
    top: 0px;
  }
`;
const Message = ({ data }) => {
  return <Container type={data.type}>{data.msg}</Container>;
};

export default Message;
// if left---black pink
// right blue pink
