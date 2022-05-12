import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import ButtonAsLink from "./ButtonAsLink";
import { IS_LOGGED_IN, IS_LOGGED_IN_LOCAL } from "../gql/query";
import logo from "../img/logo.svg";

const Header = () => {
  let navigate = useNavigate();
  const { data, client } = useQuery(IS_LOGGED_IN_LOCAL);

  const onClick = () => {
    localStorage.removeItem("token");
    client.resetStore();
    client.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: false,
      },
    });
    navigate("/");
  };

  return (
    <HeaderBar>
      <img src={logo} alt="Notedly Logo" height="40" />
      <LogoText>Notedly</LogoText>
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink onClick={onClick}>Logout</ButtonAsLink>
        ) : (
          <p>
            <Link to={"/signin"}>Sign In</Link>
            &nbsp;
            <Link to={"signup"}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

export default Header;
