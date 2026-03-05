import React, { Suspense, lazy } from 'react';
import useContextAboutMe from 'hooks/contexts/useContextAboutMe';
import { IAboutMeInfo } from 'api/endpoints/aboutMe/aboutMe.response.interface';
import './Cube.scss';
const Spin = lazy(() => import('views/components/UI/Spin'));

export default function Cube() {
  const { cubeInfo } = useContextAboutMe();

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

function RenderCube({ cubeInfo }: { cubeInfo: IAboutMeInfo }) {
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
