import React, { useRef, useEffect } from "react";
import "./Clock.scss";

export default function ClockJs() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.92;
    drawClock(ctx, radius);
    const interval = setInterval(() => {
      drawClock(ctx, radius);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const drawClock = (ctx, radius) => {
    drawFace(ctx, radius);
    drawTime(ctx, radius);
  };
  const drawFace = (ctx, radius) => {
    let grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#cdd5df";
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.04);
    grad.addColorStop(0, "#273b56d3");
    grad.addColorStop(0.5, "#5d718d");
    grad.addColorStop(1, " #273b56");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = " #273b56";
    ctx.fill();
  };
  const drawTime = (ctx, radius) => {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    hour = hour % 12;
    hour =
      (hour * Math.PI) / 6 +
      (minute * Math.PI) / (6 * 60) +
      (second * Math.PI) / (360 * 60);
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    second = (second * Math.PI) / 30;
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
  };
  const drawHand = (ctx, pos, length, width) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  };
  return (
    <div className="clock__canvas">
      <canvas width="190" height="190" id="canvas" style={{backgroundColor:"#273b56"}} ref={canvasRef} />
    </div>
  );
};

