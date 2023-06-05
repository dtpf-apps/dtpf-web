import React, { useState } from "react"
import { Row, Col, Button, Image as ImageAnt, Tag } from "antd"
import QueueAnim from "rc-queue-anim"
import Modal from "views/components/UI/Modal"
import { gaEvent } from "utils/analytics.js"
import useScrollToTop from "hooks/useScrollToTop"
import { useNearScreen } from "hooks/useNearScreen"
import "./ProjectLayout.scss"

export default function ProyectLayout(props: {
  innerWidth: number
  align: string
  contentTitle: string
  contentText: string
  linkToWeb: string
  image: string
  imageAlt: string
  modalTitle: string
  modalTags: string[]
  modalImage1: string
  modalImage2: string
  modalImage3: string
  modalImageAlt: string
  modalDate: string
  modalIntroduction: string
  modalText: string[]
  analyticTag: string
}) {
  const {
    innerWidth,
    align,
    linkToWeb,
    image,
    imageAlt,
    contentTitle,
    contentText,
    modalTitle,
    modalTags,
    modalImage1,
    modalImage2,
    modalImage3,
    modalImageAlt,
    modalDate,
    modalIntroduction,
    modalText,
    analyticTag
  } = props
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [show, el] = useNearScreen()
  const ref = el as React.MutableRefObject<HTMLDivElement>
  useScrollToTop()
  return (
    <>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        className="project-layout-modal-ant"
      >
        <ModalContent
          modalTags={modalTags}
          modalImage1={modalImage1}
          modalImage2={modalImage2}
          modalImage3={modalImage3}
          modalImageAlt={modalImageAlt}
          modalDate={modalDate}
          modalIntroduction={modalIntroduction}
          modalText={modalText}
          modalTitle={modalTitle}
        />
      </Modal>
      <div className="clearfix project-layout__use-near-screen" ref={ref}>
        {show && (
          <Row className={"project-layout project-layout-" + align}>
            {innerWidth <= 767 ? (
              <>
                <Content
                  contentTitle={contentTitle}
                  contentText={contentText}
                  setIsVisibleModal={setIsVisibleModal}
                  linkToWeb={linkToWeb}
                  analyticTag={analyticTag}
                />
                <Image
                  image={image}
                  imageAlt={imageAlt}
                  analyticTag={analyticTag}
                />
              </>
            ) : (
              <>
                {align === "left" ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                      image={image}
                      imageAlt={imageAlt}
                      analyticTag={analyticTag}
                    />
                    <Content
                      contentTitle={contentTitle}
                      contentText={contentText}
                      setIsVisibleModal={setIsVisibleModal}
                      linkToWeb={linkToWeb}
                      analyticTag={analyticTag}
                    />
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Content
                      contentTitle={contentTitle}
                      contentText={contentText}
                      setIsVisibleModal={setIsVisibleModal}
                      linkToWeb={linkToWeb}
                      analyticTag={analyticTag}
                    />
                    <Image
                      image={image}
                      imageAlt={imageAlt}
                      analyticTag={analyticTag}
                    />
                  </div>
                )}
              </>
            )}
          </Row>
        )}
      </div>
    </>
  )
}

function Image(props: {
  image: string
  imageAlt: string
  analyticTag: string
}) {
  const { image, imageAlt, analyticTag } = props
  const clickProyectImage = () => {
    gaEvent("project_image--" + analyticTag, "clicks", "UI Clicks", true)
  }
  return (
    <Col span={24} md={12} className="project-layout__image">
      <QueueAnim type={"alpha"} duration={250} ease="easeInCubic">
        <div key="image" onClick={() => clickProyectImage}>
          <ImageAnt width="300" alt={imageAlt} src={image} />
        </div>
      </QueueAnim>
    </Col>
  )
}

function Content(props: {
  contentTitle: string
  contentText: string
  linkToWeb: string
  analyticTag: string
  setIsVisibleModal: React.Dispatch<boolean>
}) {
  const { contentTitle, contentText, linkToWeb, analyticTag, setIsVisibleModal } = props
  const clickProjectSeeMore = () => {
    gaEvent("project_btn_see_more--" + analyticTag, "clicks", "UI Clicks", true)
  }
  const clickProjectGoToWeb = () => {
    gaEvent("project_link_go_to_web--" + analyticTag, "clicks", "UI Clicks", true)
  }
  return (
    <Col span={24} md={12} className="project-layout__content">
      <Col span={24} className="project-layout__content-text">
        <QueueAnim type={"alpha"} duration={350} ease="easeInCubic">
          <div className="project-layout__content-title" key="titleh2">
            <h2>{contentTitle}</h2>
          </div>
          <div className="project-layout__content-paragraph" key="titleP">
            <p>{contentText}</p>
          </div>
        </QueueAnim>
      </Col>
      <div className="project-layout__content--links">
        <Button
          onClick={() => {
            clickProjectSeeMore()
            setIsVisibleModal(true)
          }}
        >
          Ver más
        </Button>
        <a href={linkToWeb} onClick={() => { clickProjectGoToWeb() }} target="_blank" rel='noreferrer'>
          Ir a la web
        </a>
      </div>
    </Col>
  )
}

function ModalContent(props: {
  modalTags: string[]
  modalImage1: string
  modalImage2: string
  modalImage3: string
  modalImageAlt: string
  modalDate: string
  modalIntroduction: string
  modalText: string[]
  modalTitle: string
}) {
  const {
    modalTags,
    modalImage1,
    modalImage2,
    modalImage3,
    modalImageAlt,
    modalDate,
    modalIntroduction,
    modalText,
    modalTitle,
  } = props
  let gaModalTitle = modalTitle.replace(/[ ']/g, "")
  const clickProyectModalImage = (e: number) => {
    gaEvent(
      "click_project_modal_image_" + e + "_" + gaModalTitle,
      "clicks",
      "UI Clicks",
      true
    )
  }
  return (
    <Row className="project-layout__modal">
      <Row className="project-layout__modal-image">
        <Col span={8} onClick={() => clickProyectModalImage(1)}>
          <ImageAnt
            width="100%"
            alt={modalImageAlt}
            src={modalImage1}
          ></ImageAnt>
        </Col>
        <Col span={8} onClick={() => clickProyectModalImage(2)}>
          <ImageAnt
            width="100%"
            alt={modalImageAlt}
            src={modalImage2}
          ></ImageAnt>
        </Col>
        <Col span={8} onClick={() => clickProyectModalImage(3)}>
          <ImageAnt
            width="100%"
            alt={modalImageAlt}
            src={modalImage3}
          ></ImageAnt>
        </Col>
      </Row>
      <div className="project-layout__modal-content">
        <Col span={24} className="project-layout__modal-content-date">
          <span>{modalDate}</span>
        </Col>
        <Col span={24} className="project-layout__modal-content-introduction">
          <p>{modalIntroduction}</p>
        </Col>
        <Col span={24} className="project-layout__modal-content-large-text">
          {modalText &&
            modalText.map((text: string, key: number) => {
              return (
                <div key={key + 1}>
                  <span key={key + 2}>{text}</span>
                  <br key={key + 3}></br>
                </div>
              )
            })}
        </Col>
      </div>
      <Col span={24} className="project-layout__modal-tags">
        {modalTags &&
          modalTags.map((tag: string) => {
            let tagToClassname = tag.replace(/[ .]/g, "")
            return (
              <span key={tag} className={tagToClassname}>
                <Tag>{tag}</Tag>
              </span>
            )
          })}
      </Col>
    </Row>
  )
}