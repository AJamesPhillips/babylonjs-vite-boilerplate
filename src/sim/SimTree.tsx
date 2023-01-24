import { BoxBuilder, CreateBox, Mesh, Quaternion, Vector2 } from "@babylonjs/core"
import React, { useEffect, useState } from "react"
import { connect, ConnectedProps } from "react-redux"

import { step_LSystem } from "../LSystem/engine"
import { LSystem } from "../LSystem/interfaces"
import { AppRootState } from "../state/state"
import { vec3 } from "../utils/vector"
import { sim_tree } from "./sim_tree"



interface OwnProps
{
}


const map_state = (state: AppRootState) =>
{
    return {
        current_time: state.sim_time.current_time,
    }
}

const map_dispatch = {
}
const connector = connect(map_state, map_dispatch)
type Props = ConnectedProps<typeof connector> & OwnProps



const _TreeSim = (props: Props) =>
{

    const [sim, set_sim] = useState(sim_tree)
    useEffect(() =>
    {
        if (sim.initial_state.length > 50)
        {
            sim.initial_state = sim_tree.initial_state
        }

        const start_state = sim.initial_state

        set_sim(step_LSystem(sim))
        // console.log(`${start_state} -> ${sim.current.initial_state}`)

    }, [])
    // }, [Math.round(props.current_time)])


    return <>
        <Tree sim={sim} />
    </>
}

export const TreeSim = connector(_TreeSim)



const Tree = (props: { sim: LSystem }) =>
{
    useEffect(() =>
    {
        const characters = props.sim.initial_state.split("")

        const elements: Mesh[] = []
        const parents: Mesh[] = []
        let offset_angle: Vector2 = new Vector2(0, 0)

        characters.map((v, i) =>
        {
            if (v === "R")
            {
                offset_angle.addInPlace(new Vector2(0.1, 0.1))
                return
            }


            const element = CreateBox(`${i}`, {
                width: 0.1, height: 1, depth: 0.1,
            })
            element.position = vec3(0, i, 0)
            element.rotate(vec3(0, 1, 0), offset_angle.x)
            element.rotate(vec3(0, 0, 1), offset_angle.y)

            elements.push(element)

            const parent = parents.last()
            if (parent) parent.addChild(element)
            parents.push(element)

            offset_angle = new Vector2(0, 0)
        })

        return () =>
        {
            elements.forEach(element => element.dispose())
        }
    }, [props.sim.initial_state])


    return <></>
}
