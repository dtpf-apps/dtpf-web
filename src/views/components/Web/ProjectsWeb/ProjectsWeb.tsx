import React, { useState, useEffect } from "react";
import "./ProjectsWeb.scss";
import RecetasDeliciosasMsr from "./Projects/RecetasDeliciosasMsr";
import PortfolioDTPF from "./Projects/PortfolioDTPF";

export default function ProjectsWeb() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const reportWindowSize = () => {
    setInnerWidth(window.innerWidth);
  }
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      window.onresize = reportWindowSize;
    }
    return () => { unmounted = true };
  }, []); 
  return (
    <div className="projects-web">
      <h1 className="projects-web__title">Proyectos</h1>
      <PortfolioDTPF innerWidth={innerWidth} align="left" />
      <RecetasDeliciosasMsr innerWidth={innerWidth} align="right" />
    </div>
  );
}
