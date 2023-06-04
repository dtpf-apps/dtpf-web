import React from "react"
import useScrollToTop from "hooks/useScrollToTop"
import MainTitle from "views/components/Web/MainTitle"
import Helmet from "views/components/Helmet"
import ProjectsWeb from "views/components/Web/ProjectsWeb"
import AboutMeInfo from "views/components/Web/AboutMeWeb/AboutMeInfo"
import { Divider } from "antd"
import "./Home.scss"

export default function Home() {
  useScrollToTop()
  return (
    <>
      <Helmet
        titleHelmet="DTPF | Página principal"
        contentHelmet="Página principal de David Thomas Pizarro Frick"
      />
      <div className="home">
        <MainTitle />
        <Divider />
        <AboutMeInfo />
        <Divider style={{ marginBottom: 50 }} />
        <ProjectsWeb />
      </div>
    </>
  )
}