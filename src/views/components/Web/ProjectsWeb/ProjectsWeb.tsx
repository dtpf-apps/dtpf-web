import React, { useState, useEffect } from "react"
import RecetasDeliciosasMsr from "./Projects/RecetasDeliciosasMsr"
// import PortfolioDTPF from "./Projects/PortfolioDTPF"
import Audity from "./Projects/Audity"
import Dalist from "./Projects/Dalist"
// import BeFriends from "./Projects/BeFriends"
import Dagif from "./Projects/Dagif"
import Amazen from "./Projects/Amazen"
import "./ProjectsWeb.scss"

export default function ProjectsWeb() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const reportWindowSize = () => {
    setInnerWidth(window.innerWidth)
  }
  useEffect(() => {
    let unmounted = false
    if (!unmounted) {
      window.onresize = reportWindowSize
    }
    return () => { unmounted = true }
  }, []) 
  return (
    <div className="projects-web">
      <h1 className="projects-web__title">Proyectos</h1>
      {/* <PortfolioDTPF innerWidth={innerWidth} align="left" /> */}
      <RecetasDeliciosasMsr innerWidth={innerWidth} align="left" />
      <Audity innerWidth={innerWidth} align="right" />
      <Dalist innerWidth={innerWidth} align="left" />
      {/* <BeFriends innerWidth={innerWidth} align="right" /> */}
      <Amazen innerWidth={innerWidth} align="right" />
      <Dagif innerWidth={innerWidth} align="left" />
    </div>
  )
}