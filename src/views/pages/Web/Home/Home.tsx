import React, { memo, useContext } from "react";
import useScrollToTop from "hooks/useScrollToTop";
import MainTitle from "views/components/Web/MainTitle";
import Helmet from "views/components/Helmet";
import ProjectsWeb from "views/components/Web/ProjectsWeb";
import AboutMeInfo from "views/components/Web/AboutMeWeb/AboutMeInfo";
import { Divider } from "antd";
import "./Home.scss";
import { ConnectionContext } from "providers/ConnectionProvider";

function Home() {
  const { connectionStatus } = useContext(ConnectionContext);

  useScrollToTop();
  return (
    <>
      <Helmet
        titleHelmet="DTPF | Página principal"
        contentHelmet="Página principal de David T. Pizarro Frick"
      />
      <div className="home">
        <MainTitle />
        {connectionStatus === 200 && (
          <>
            <Divider />
            <AboutMeInfo />
          </>
        )}
        <Divider style={{ marginBottom: 50 }} />
        <ProjectsWeb />
      </div>
    </>
  );
}

export default memo(Home);
