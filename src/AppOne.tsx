// As per instructions here: https://doc.babylonjs.com/divingDeeper/developWithBjs/treeShaking#almighty-inspector
import "@babylonjs/core/Debug/debugLayer" // Augments the scene with the debug methods
import "@babylonjs/inspector" // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version

import { ArcRotateCamera, Color4 } from "@babylonjs/core"
import React, { FunctionComponent, useEffect, useMemo, useState } from "react"
import { Engine, Scene, SceneEventArgs } from "react-babylonjs"
import { connect, ConnectedProps, Provider } from "react-redux"

import { mutate_scene } from "./utils/CustomScene"
import { get_store } from "./state/store"
import { add_toggle_show_debug } from "./utils/add_toggle_show_debug"
import { AppRootState } from "./state/state"
import { vec3 } from "./utils/vector"
import { HomePage } from "./sim/HomePage"
import { ACTIONS } from "./state/actions"
import { DemoReactJS_UI } from "./DemoUI"



export const AppOne = () =>
{
    const [camera, set_camera] = useState<ArcRotateCamera | undefined>(undefined)

    const store = get_store()

    useEffect(() =>
    {
        // console .log(" use effect...")

        let time = 0
        const timer_id = setInterval(
            () =>
            {
                time += 0.1
                store.dispatch(ACTIONS.sim_time.set_sim_time({ new_time: time }))
            }
            , 100
        )

        return () =>
        {
            // console .log("stop use effect...")
            clearInterval(timer_id)
        }
    }, [])


    const on_scene_mount = useMemo(() => (e: SceneEventArgs) =>
    {
        add_toggle_show_debug(e.scene)
        mutate_scene(e.scene)
    }, undefined)

    const camera_target = useMemo(() => vec3(0, 2, 0), undefined)


    return <>
    <Provider store={store}>
        <DemoReactJS_UI />
    </Provider>
    <Engine antialias adaptToDeviceRatio>
        <Scene
            onSceneMount={on_scene_mount}
            // onMeshPicked={mesh => this.meshPicked(mesh)}
        >
            <arcRotateCamera
                name="orbitalCamera"
                alpha={Math.PI / 3}
                beta={Math.PI / 3}
                radius={30}
                target={camera_target}
                wheelPrecision={30}
                // minZ={0.001}
                lowerRadiusLimit={3}
                useBouncingBehavior={true}
                onCreated={set_camera}
            />

            <Provider store={store}>
                <adtFullscreenUi
                    name="UI"
                    isForeground={true}
                >
                    <HomePage camera={camera}/>
                </adtFullscreenUi>
            </Provider>
        </Scene>
    </Engine>
    </>
}



interface OwnProps {}

const map_state = (state: AppRootState) =>
{
    return {}
}

const map_dispatch = {
}
const connector = connect(map_state, map_dispatch)
type Props = ConnectedProps<typeof connector> & OwnProps


const _Demo = (props: Props) =>
{
    return <sphere name="demo" diameter={3} />
}

export const Demo = connector(_Demo) as FunctionComponent<OwnProps>
