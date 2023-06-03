import React from "react";
import useScrollToTop from "hooks/useScrollToTop";
import WellcomeParagraph from "views/components/Web/WellcomeParagraph/WellcomeParagraph";
import MainTitle from "views/components/Web/MainTitle";
import MainMenuBigButtons from "views/components/Web/MainMenuBigButtons";
import Helmet from "views/components/Helmet";
import "./Home.scss";

export default function Home() {
  useScrollToTop();
  return (
    <>
      <Helmet
        titleHelmet="DTPF | Página principal"
        contentHelmet="Página principal de David Thomas Pizarro Frick"
      />
      <div className="home">
        <MainTitle />
        <WellcomeParagraph />
        <MainMenuBigButtons />
      </div>
    </>
  );
}
