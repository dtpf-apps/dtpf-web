import React, { useEffect, useState, Suspense, lazy } from "react";
import { getAboutMeInfoAPI } from "api/endpoints/aboutMe/aboutMe.api";
import "./Cube.scss";
import { IgetAboutMeInfoAPIResponseInfo } from "api/endpoints/aboutMe/brandUsers.response.interface";
const Spin = lazy(() => import("views/components/UI/Spin"));

export default function Cube() {
  const [cubeInfo, setCubeInfo] =
    useState<IgetAboutMeInfoAPIResponseInfo | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const getAboutMeInfo = await getAboutMeInfoAPI({ key: "cube" });
      isMounted && setCubeInfo(getAboutMeInfo.data.info);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!cubeInfo) {
    return (
      <div className="cube">
        <Suspense fallback={<></>}>
          <Spin />
        </Suspense>
      </div>
    );
  }

  return <RenderCube cubeInfo={cubeInfo} />;
}

function RenderCube({
  cubeInfo,
}: {
  cubeInfo: IgetAboutMeInfoAPIResponseInfo;
}) {
  return (
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
  );
}
