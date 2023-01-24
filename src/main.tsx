import "./utils/monkey_patch"

import React from "react"

import { createRoot } from "react-dom/client"
import { AppOne } from "./AppOne"



window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement

    const root = createRoot(canvas)
    root.render(
        <AppOne />
        // <DemoSceneSpinningBoxes />,
    )
})


// // Prevents the swipe left / right from navigating forwards and backwards
// // But does not work on Mac when using two fingers (positioned vertically relative to each other)
// // and swiping left right.  Note: on Mac when using two fingers positioned horizontally relative to
// // each other then it works fine.
// window.ontouchmove = e => e.preventDefault()
