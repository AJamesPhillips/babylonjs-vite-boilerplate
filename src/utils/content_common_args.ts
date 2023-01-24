import { ArcRotateCamera, ShadowGenerator } from "@babylonjs/core"
import { AdvancedDynamicTexture } from "@babylonjs/gui"

import { CustomScene } from "./CustomScene"


export interface ContentCommonArgs
{
    scene: CustomScene
    camera: ArcRotateCamera
    shadow_generator: ShadowGenerator
    ui_layer: AdvancedDynamicTexture
}
