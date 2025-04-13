import { useEffect, useState } from "react";
import { getAboutMeInfoAPI } from "api/endpoints/aboutMe/aboutMe.api";
import Spin from "views/components/UI/Spin/Spin";
import image from "assets/img/png/yo.png";
import { Image } from "antd";
import "./AboutMeInfo.scss";
import { IgetAboutMeInfoAPIResponseInfo } from "api/endpoints/aboutMe/brandUsers.response.interface";

export default function AboutMeInfo() {
  const [mainInfo, setMainInfo] =
    useState<IgetAboutMeInfoAPIResponseInfo | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const getAboutMeInfo = await getAboutMeInfoAPI({ key: "mainInfo" });
        isMounted && setMainInfo(getAboutMeInfo.data.info);
      } catch (error) {
        console.error("Error fetching About Me Info:", error);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return !mainInfo || !mainInfo.content1 ? (
    <Spin />
  ) : (
    <div className="about-me-info">
      <div className="about-me-info-content">
        <div className="about-me-info-content-image">
          <Image src={image} preview={false}></Image>
        </div>
        <div className="about-me-info-content-text1">{mainInfo.content1}</div>
      </div>
    </div>
  );
}
