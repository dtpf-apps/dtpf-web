import { useEffect, useState } from "react"
import { getAboutMeInfoApi } from "api/aboutMe"
import Cube from "../Cube"
import image from "assets/img/png/yo.png"
import { Image } from "antd"
import './AboutMeInfo.scss'

export default function AboutMeInfo() {
	const [mainInfo, setMainInfo] = useState({
		content1: ''
	})

	useEffect(() => {
		let isMounted = true
		getAboutMeInfoApi("mainInfo").then((response) => {
			isMounted && setMainInfo(response.info)
		})
		return () => {
			isMounted = false
		}
	}, [])

	return (
		<div className="about-me-info">
			<div className="about-me-info-content">
				<div className="about-me-info-content-image">
					<Image src={image} preview={false}></Image>
				</div>
				<div className="about-me-info-content-text1">{mainInfo.content1}</div>
			</div>
				<Cube />
		</div>
	)
}