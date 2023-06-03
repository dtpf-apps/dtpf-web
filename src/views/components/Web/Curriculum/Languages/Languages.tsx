import React from "react";
import { useNearScreen } from "hooks/useNearScreen";
import "./Languages.scss";

export default function Languages() {
  const [show, el] = useNearScreen();
  let ref: any = el;
  return (
    <div className="languages">
      <div className="use-near-screen" ref={ref}>
        {show && (
          <>
            <h2>Idiomas</h2>
            <div className="languages__item">
              Castellano<span>Nativo</span>
            </div>
            <div className="languages__item">
              Catalán<span>Alto</span>
            </div>
            <div className="languages__item">
              Inglés<span>Medio-Bajo</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
