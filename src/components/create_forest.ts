import { AbstractMesh, Matrix, Mesh, MeshBuilder, Scene, ShadowGenerator, Vector3, Vector4 } from "@babylonjs/core"
import { is_Vector4, vec3 } from "../utils/vector"
import { create_tree, Tree } from "./create_tree"



const MODEL_TREE_HEIGHT_m = 5.1

export function create_forest (scene: Scene, shadow_generator: ShadowGenerator, position: Vector3, size: number)
{
    const tree_nodes: Mesh[] = []
    const trees_with_delays: { tree: Tree, delay: number }[] = []

    const space_between_tree_centers = 3
    const growth_direction_near_to_far = true


    const tree = create_tree(scene, shadow_generator, vec3(0, 0, 0), `thin_tree`)
    const leaves = tree.node.getChildMeshes()[0] as Mesh
    const trunk = tree.node.getChildMeshes()[1] as Mesh
    tree_nodes.push(leaves, trunk)

    const instance_count_1d = Math.round(size / space_between_tree_centers)
    const instance_count_2d = instance_count_1d ** 2
    // console .log("instance_count_2d ", instance_count_2d)
    const matrices_data = new Float32Array(16 * instance_count_2d)

    const desired_max_tree_height = 10
    const max_tree_scale = desired_max_tree_height / MODEL_TREE_HEIGHT_m

    let m = Matrix.Identity()
    let index = 0
    let i = 0
    while (i < instance_count_1d)
    {
        let j = 0
        while (j < instance_count_1d)
        {
            const x = (i * -1 * space_between_tree_centers) - (Math.random() * 2)
            const z = (j * -1 * space_between_tree_centers) - (Math.random() * 2)

            const s = (0.4 + (Math.sin(Math.random() * Math.PI) * 0.6) * max_tree_scale)
            m = Matrix.Identity().scale(s)


            const pos = new Vector4(position.x + x, position.y, position.z + z, 1)
            m = m.setRow(3, pos)
            m.copyToArray(matrices_data, index * 16)

            // const pos = position.add(new Vector3(x, 0, z))
            // const tree = create_tree(scene, shadow_generator, pos, `${i}_${j}`)

            // tree.node.getChildMeshes().forEach(mesh => mesh.scaling = scale)
            // const tree_node: any = tree.node
            // tree_node.size = s
            // tree_nodes.push(tree_node)

            // const progress = (i + j) / ((size - 1) * 2)
            // const inv_progress = 1 - progress
            // const p = growth_direction_near_to_far ? progress : inv_progress
            // const d = Math.sin(p * (Math.PI / 2))
            // const delay = (d * 10 + Math.random() * p) * 200

            // trees_with_delays.push({ tree, delay })
            ++j
            ++index
        }
        ++i
    }

    leaves.thinInstanceSetBuffer("matrix", matrices_data, 16)
    trunk.thinInstanceSetBuffer("matrix", matrices_data, 16)

    leaves.isPickable = true
    leaves.thinInstanceEnablePicking = true
    // tree.node.thinInstanceSetBuffer("matrix", matrices_data, 16)
    // tree.node..thinInstanceSetBuffer("color", colorData, 4);


    function play ()
    {
        tree.play()
        trees_with_delays.forEach(({ tree, delay }) =>
        {
            setTimeout(() => tree.play(), delay)
        })
    }


    return {
        tree_nodes,
        play,
    }
}
