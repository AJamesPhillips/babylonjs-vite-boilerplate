import { Color4 } from "@babylonjs/core"
import React, { useEffect } from "react"
import { useScene } from "react-babylonjs"



export function Sky ()
{
    const scene = useScene()

    useEffect(() =>
    {
        if (scene) scene.clearColor = new Color4(0.443, 0.737, 0.945, 1)
    }, [scene])

    return <></>

    // var skybox_material = new SkyMaterial("skyMaterial", scene)
    // skybox_material.backFaceCulling = false
	// //skybox_material._cachedDefines.FOG = true

	// // Sky mesh (box)
    // var skybox = MeshBuilder.CreateBox("skyBox", { size: 1000 }, scene)
    // skybox.material = skybox_material

    // function set_sky_config (property: string, from: number, to: number)
    // {
	// 	const keys = [
    //         { frame: 0, value: from },
	// 		{ frame: 100, value: to }
    //     ]

	// 	var animation = new BABYLON.Animation("animation", property, 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
	// 	animation.setKeys(keys)

	// 	scene.stopAnimation(skybox)
	// 	scene.beginDirectAnimation(skybox, [animation], 0, 100, false, 1)
	// }

    // // set to day
    // set_sky_config("material.inclination", skybox_material.inclination, 0.45)

    // return {
    //     skybox,
    //     skybox_material,
    //     set_sky_config,
    // }
}
