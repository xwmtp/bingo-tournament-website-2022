import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { RouteTabSelector } from "../components/RouteTabSelector";
import { Margins } from "../GlobalStyle";
import { useUser } from "../api/userApi";
import { isAdmin } from "../domain/User";

export const ProfilePage: React.FC = () => {
  const { data: user } = useUser();

  const options = [
    { title: "Profile", to: "/profile/settings" },
    { title: "My Matches", to: "/profile/matches" },
  ];

  if (user && isAdmin(user)) {
    options.push({ title: "Admin", to: "/profile/admin" });
  }

  return (
    <>
      <TabSelectorStyled tabOptions={options} />
      <Outlet />
    </>
  );
};

const TabSelectorStyled = styled(RouteTabSelector)`
  margin-bottom: ${Margins.container}rem;
`;
