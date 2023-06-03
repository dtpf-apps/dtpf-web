import React from "react"
import { Helmet as ReactHelmet } from "react-helmet"

export default function Helmet(props: {
  titleHelmet: string
  contentHelmet: string
}) {
  const { titleHelmet, contentHelmet } = props
  return (
    <ReactHelmet>
      <title>{titleHelmet}</title>
      <meta
        name="description"
        content={contentHelmet}
        data-react-helmet="true"
      />
    </ReactHelmet>
  )
}