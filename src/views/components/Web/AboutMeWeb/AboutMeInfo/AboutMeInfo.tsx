import { useEffect, useState } from "react"
import { getAboutMeInfoApi } from "api/aboutMe"
import Spin from "views/components/UI/Spin/Spin"
import image from "assets/img/png/yo.png"
import { Image } from "antd"
import './AboutMeInfo.scss'

export default function AboutMeInfo() {
	const [mainInfo, setMainInfo] = useState({
		content1: ''
	})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		let isMounted = true
		getAboutMeInfoApi("mainInfo").then((response) => {
			isMounted && setMainInfo(response.info)
			setIsLoading(false)
		})
		return () => {
			isMounted = false
		}
	}, [])

	return (
		isLoading ? (
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
		)
	)
}