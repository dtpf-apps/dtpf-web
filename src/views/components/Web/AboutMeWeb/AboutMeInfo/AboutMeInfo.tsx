import useContextAboutMe from 'hooks/contexts/useContextAboutMe';
import Spin from 'views/components/UI/Spin/Spin';
import image from 'assets/img/png/yo.png';
import { Image } from 'antd';
import './AboutMeInfo.scss';

export default function AboutMeInfo() {
  const { mainInfo } = useContextAboutMe();

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
