import {
    Color3,
    GlowLayer,
    Light,
    Mesh,
    PointLight,
    Vector3,
} from "@babylonjs/core"
import React, { useEffect, useState } from "react"



export const SUN_NAME = "sun_direct"


interface Props
{
    set_sun_point_light: (sun_point_light: PointLight) => void
    intensity?: number
    bias_direct?: number
    in_space?: boolean
}

export function Sun (props: Props)
{
    const {
        intensity = 1.5,
        bias_direct = 1.5,
        in_space = false,
    } = props


    const sun_position = new Vector3(50, 20, 20).scale(in_space ? 10 : 1)
    const sun_direction = new Vector3(0, 0, 0)
    // Using this type of lighting allows things like the low poly house, which has materials with
    // "use physical light falloff" still turned on, to be illuminated sufficiently.  Without it
    // these models are very dark (as they are relatively far from the light source)
    const falloff_type = Light.FALLOFF_STANDARD

    const sun_intensity = in_space ? 1 : intensity * bias_direct
    const sky_intensity = intensity / bias_direct

    return <>
        <pointLight
            name={SUN_NAME}
            direction={sun_direction}
            position={sun_position}
            falloffType={falloff_type}
            intensity={sun_intensity}
            onCreated={props.set_sun_point_light}
        />
        {!in_space && <hemisphericLight
            name="sun_indirect"
            direction={sun_direction}
            falloffType={falloff_type}
            intensity={sky_intensity}
        />}

        <SunGlobe
            position={sun_position}
            scaling={in_space ? new Vector3(10, 10, 10) : undefined}
        />
    </>
}



const sun_emissive_color = new Color3(1, 1, 0.5)
function SunGlobe (props: { position: Vector3, scaling?: Vector3 })
{
    const [sun_mesh, set_sun_mesh] = useState<Mesh>()


    // Using this effect rather than react-babylonJS as it is logging an error.
    // Otherwise the addition of sun_mesh to glowLayer's addIncludedOnlyMesh
    // causes the logging of an error from react-babylonjs of
    // "need to make sure this isn't something like a Vector3 before destructuring"
    useEffect(() =>
    {
        const glow_layer = new GlowLayer("sun_glow")
        glow_layer.intensity = 10
        if (sun_mesh) glow_layer.addIncludedOnlyMesh(sun_mesh)

        return () =>
        {
            glow_layer.dispose()
        }
    }, [sun_mesh])


    return <>
        <sphere
            name="sun_sphere"
            diameter={1}
            position={props.position}
            scaling={props.scaling}
            onCreated={set_sun_mesh}
        >
            <standardMaterial
                name="sun_glow_material"
                emissiveColor={sun_emissive_color}
            />
        </sphere>
        {/* <glowLayer
            name="glow"
            intensity={10}
            addIncludedOnlyMesh={sun_mesh}
        /> */}
    </>
}
