import styled from "styled-components";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies, withCookies } from "react-cookie";
const Container = styled.div`
  height: 100%;
  /* background-color: #f0f5f9; */
  background-color: #ffffff;
  box-sizing: border-box;
`;
const Content = styled.div`
  height: 80%;
  padding: 20px 30px;
  box-sizing: border-box;
`;
const Desc = styled.div``;
const Name = styled.span`
  font-weight: 500;
`;
const CheckBox = styled.input``;
const ChatButton = styled.button`
  background-color: #da9d2e;
  border: none;
  border-radius: 10px;
  width: 50%;
  height: 40px;
  margin: 20px;
  color: white;
  font-weight: 600;
`;
const Agreement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0px;
`;
const AgreementLabel = styled.div``;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;
const Contact = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SoicalLink = styled.a`
  margin: 5px 10px;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const SoicalIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const Home = ({ cookies }) => {
  const agreement = cookies.cookies.agreement_;
  const [isAccepted, setIsAccepted] = useState(
    agreement === "accepted" ? true : false
  );
  const navigate = useNavigate();
  const [agreementCookie, setAgreementCookie] = useCookies(["agreement_"]);
  const setAgreementCokiee = () => {
    let now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);
    setAgreementCookie("agreement_", "accepted", {
      path: "/",
      expires: now,
    });
  };

  return (
    <Container>
      <Header />
      <Content>
        <Desc>
          Do you love to meet new people from CET...?<Name> CET Speaks </Name>
          makes it possible.When you use <Name> CET Speaks</Name>,you are paired
          randomly with another person to talk one-on-one. To help you stay
          safe, chats are anonymous unless you tell someone who you are (not
          recommended!), and you can stop a chat at any time.See our Terms and
          Condition to understand the regulations and limits you have follow
          while using <Name>CET Speaks</Name>.
        </Desc>
        <Agreement>
          <AgreementLabel>
            <CheckBox
              name="accept"
              type="checkbox"
              checked={isAccepted}
              onChange={() => setIsAccepted(!isAccepted)}
            />{" "}
            I agree to the Terms and Condition of<Name> CET Speaks</Name>.
          </AgreementLabel>
          <ChatButton
            disabled={!isAccepted}
            onClick={() => {
              setAgreementCokiee();
              navigate("/chat");
            }}
          >
            Take Me In
          </ChatButton>
        </Agreement>
      </Content>
      <Footer>
        <div> Developed by Aseel SM</div>
        <Contact>
          <SoicalLink href="https://www.instagram.com/aseel._sm/">
            <SoicalIcon src="/assets/instagram.svg" />
          </SoicalLink>
          <SoicalLink href="mailto:aseelsm0027@gmail.com">
            <SoicalIcon src="/assets/mail.svg" />
          </SoicalLink>
          <SoicalLink href="https://github.com/aseel-sm">
            <SoicalIcon src="/assets/github.svg" />
          </SoicalLink>
        </Contact>
      </Footer>
    </Container>
  );
};

export default withCookies(Home);
