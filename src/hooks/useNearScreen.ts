import React, { useState, useEffect, useRef } from "react"

export function useNearScreen() {
  const el = useRef() as React.MutableRefObject<HTMLDivElement>
  const [show, setShow] = useState(false)
  useEffect(() => {
    let isMounted = true
    Promise.resolve(
      typeof window.IntersectionObserver !== "undefined"
        ? window.IntersectionObserver
        : import("intersection-observer")
    ).then(() => {
      const observer = new window.IntersectionObserver(function (entries) {
        const { isIntersecting } = entries[0]
        if (isIntersecting) {
          isMounted && setShow(true)
          observer.disconnect()
        }
      })
      isMounted && observer.observe(el.current)
    })
    return () => { isMounted = false }
  }, [el])

  return [show, el]
}