import React, { useEffect, useState, Suspense, lazy } from "react";
import { getAboutMeInfoApi } from "../../../../api/aboutMe";
import "./Cube.scss";
const Spin = lazy(() => import("../../../../components/UI/Spin"));

export default function Cube() {
  const [cubeInfo, setCubeInfo] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getAboutMeInfoApi("cube").then((response) => {
      isMounted && setCubeInfo(response.info);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <RenderCube cubeInfo={cubeInfo} />
  );
}

function RenderCube(props: any) {
  const {cubeInfo} = props;
  return (
    <>
    {!cubeInfo ? (
      <Suspense fallback={<></>}>
        <Spin />
      </Suspense>
    ) : (
      <div id="css-3D-cube">
        <div id="css-3D-cube-infinite">
          <div id="css-3D-cube-infinite-side1">{cubeInfo.content1}</div>
          <div id="css-3D-cube-infinite-side2">{cubeInfo.content2}</div>
          <div id="css-3D-cube-infinite-side3">{cubeInfo.content3}</div>
          <div id="css-3D-cube-infinite-side4">{cubeInfo.content4}</div>
          <div id="css-3D-cube-infinite-side5">{cubeInfo.content5}</div>
          <div id="css-3D-cube-infinite-side6">{cubeInfo.content6}</div>
        </div>
      </div>
    )}
    </>
  )
}
