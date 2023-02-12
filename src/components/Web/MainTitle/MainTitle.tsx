import React from "react";
import Texty from "rc-texty";
import TweenOne from "rc-tween-one";
import "./MainTitle.scss";

export default function MainTitle() {
  return (
    <div className="main-title" aria-hidden="true">
      <div className="combined-wrapper">
        <div className="combined">
          <Texty
            className="title"
            type="left"
            component={TweenOne}
            componentProps={{
              animation: [
                { x: 130, type: "set" },
                { x: 100, delay: -200, duration: 50 },
                {
                  ease: "linear",
                  duration: 50,
                  x: 0,
                },
                {
                  letterSpacing: 0,
                  delay: -300,
                  scale: 0.9,
                  ease: "linear",
                  duration: 50,
                },
                {
                  scale: 1,
                  width: "100%",
                  delay: 0,
                  duration: 50,
                  ease: "linear",
                },
              ],
            }}
          >
            David&nbsp;T.
          </Texty>
          <Texty
            className="title-2"
            type="right"
            component={TweenOne}
            componentProps={{
              animation: [
                { x: 130, type: "set" },
                { x: 100, delay: -200, duration: 50 },
                {
                  ease: "linear",
                  duration: 100,
                  x: 0,
                },
                {
                  letterSpacing: 0,
                  delay: -300,
                  scale: 0.9,
                  ease: "linear",
                  duration: 50,
                },
                {
                  scale: 1,
                  width: "100%",
                  delay: 0,
                  duration: 100,
                  ease: "linear",
                },
              ],
            }}
          >
            Pizarro&nbsp;Frick
          </Texty>
          <TweenOne
            className="combined-bar"
            animation={{
              delay: 200,
              width: 0,
              x: 50,
              type: "from",
              ease: "linear",
            }}
          />
          <Texty className="content" type="bottom" delay={400} interval={5}>
            Desarrollador de Software
          </Texty>
        </div>
      </div>
    </div>
  );
}
