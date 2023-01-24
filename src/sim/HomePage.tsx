import { ArcRotateCamera, Nullable, PointLight } from "@babylonjs/core"
import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { useCamera, useScene } from "react-babylonjs"
import { connect, ConnectedProps } from "react-redux"

import { CustomScene } from "../utils/CustomScene"
import { AppRootState } from "../state/state"
// import { load_low_poly_house_3 } from "./assets/load_low_poly_house_3"
import { Sun } from "../components/Sun"
import { DemoSpinningBoxes } from "../DemoSpinningBoxes"
import { DemoBabylonJS_UI } from "../DemoUI"
import { Sky } from "../components/Sky"
import { create_earth } from "../components/create_earth"
import { sim_tree } from "./sim_tree"
import { step_LSystem } from "../LSystem/engine"
import { TreeSim } from "./SimTree"



interface OwnProps
{
    camera: ArcRotateCamera | undefined
}


const map_state = (state: AppRootState) =>
{
    return {
    }
}

const map_dispatch = {
}
const connector = connect(map_state, map_dispatch)
type Props = ConnectedProps<typeof connector> & OwnProps

// type LOADING_STATE = "NOT STARTED" | "LOADING" | "LOADED" | "FAILED"


const _HomePage = (props: Props) =>
{
    const [sun_point_light, set_sun_point_light] = useState<PointLight | undefined>(undefined)

    const scene = useScene() as Nullable<CustomScene>
    if (!scene) return null // type guard


    useEffect(() =>
    {
        if (!props.camera || !sun_point_light) return

        // Uncomment to render an Earth.  Though there is a bug at the moment
        // so will need to comment out:
        // `let atmosphere = new AtmosphericScatteringPostProcess("atmosphere"`...
        // in `create_earth.ts`.
        create_earth(scene, props.camera, sun_point_light)
    }, [props.camera, sun_point_light])


    // const [loaded_assets, set_loaded_assets] = useState<LOADING_STATE>("NOT STARTED")

    // if (loaded_assets === "NOT STARTED")
    // {
    //     set_loaded_assets("LOADING")
    //     // load_low_poly_house_3(scene)
    //     //     .then(() => set_loaded_assets("LOADED"))
    //     //     .catch(err =>
    //     //     {
    //     //         set_loaded_assets("FAILED")
    //     //         console.error(`Error loading low_poly_house_3`, err)
    //     //     })
    // }

    // if (loaded_assets !== "LOADED") return null

    return <RenderHomePage set_sun_point_light={set_sun_point_light} />
}

export const HomePage = connector(_HomePage)// as FunctionComponent<OwnProps>



function RenderHomePage (props: { set_sun_point_light: (sun_point_light: PointLight) => void })
{
    return <>
        <Sun set_sun_point_light={props.set_sun_point_light} />
        {/* <Sky /> */}
        {/* <DemoSpinningBoxes /> */}
        <TreeSim />
        <DemoBabylonJS_UI />
    </>
}
