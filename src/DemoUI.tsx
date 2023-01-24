import { Control } from "@babylonjs/gui"
import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from "react"
import { connect, ConnectedProps } from "react-redux"

import { AppRootState } from "./state/state"



interface OwnProps {}

const map_state = (state: AppRootState) =>
{
    return {
        time: state.sim_time.current_time,
    }
}

const map_dispatch = {
}
const connector = connect(map_state, map_dispatch)
type Props = ConnectedProps<typeof connector> & OwnProps



function _DemoBabylonJS_UI (props: Props)
{
    const [is_active, set_is_active] = useState(false)
    const is_active_ref = useRef(is_active)
    is_active_ref.current = is_active

    const on_click = useMemo(() => () => set_is_active(!is_active_ref.current), [])

    const rect = <rectangle
        name="demo-ui-rect"
        background="#CCC"
        thickness={0}
        heightInPixels={125}
        widthInPixels={650}
        cornerRadius={30}
        paddingTopInPixels={50}
        verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
        onPointerClickObservable={on_click}
    >
        <textBlock
            text={`Current time: ${props.time.toFixed(2)} (BabylonJS)`}
            fontSize={40}
            color={is_active ? "red" : "white"}
            resizeToFit={true}
            verticalAlignment={Control.VERTICAL_ALIGNMENT_CENTER}
        />
    </rectangle>

    return rect
}

export const DemoBabylonJS_UI = connector(_DemoBabylonJS_UI)// as FunctionComponent<OwnProps>




function _DemoReactJS_UI (props: Props)
{
    const [is_active, set_is_active] = useState(false)
    const is_active_ref = useRef(is_active)
    is_active_ref.current = is_active

    const on_click = useMemo(() => () => set_is_active(!is_active_ref.current), [])

    return <div
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, top: 0, pointerEvents: "none" }}
    >
        <div
            onClick={on_click}
            style={{
                pointerEvents: "all",
                position: "fixed",
                color: is_active ? "red" : "white",
                padding: "5px 20px",
                margin: 20,
                top: 0,
                backgroundColor: "#CCC",
                borderRadius: 30,
                fontSize: 20,
            }}
        >
            Current time {props.time.toFixed(2)} (ReactJS)
        </div>
    </div>
}

export const DemoReactJS_UI = connector(_DemoReactJS_UI) as FunctionComponent<OwnProps>
