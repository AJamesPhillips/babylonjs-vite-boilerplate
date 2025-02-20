import { Vector3, Vector4 } from "@babylonjs/core"



export function vec3 (vec: Vector3 | [number, number, number] | number, arg2: number, arg3: number): Vector3
export function vec3 (vec: Vector3 | [number, number, number], arg2?: number, arg3?: number): Vector3
export function vec3 (vec: Vector3 | [number, number, number] | number | undefined, arg2?: number, arg3?: number): Vector3 | undefined
export function vec3 (vec: Vector3 | [number, number, number] | number | undefined, arg2?: number, arg3?: number): Vector3 | undefined
{
    if (vec === undefined) return vec

    if (is_Vector3(vec)) return vec

    if (is_number_array(vec)) return new Vector3(...vec)

    return new Vector3(vec, arg2 || 0, arg3 || 0)
}


function is_Vector3 (vec: Vector3 | [number, number, number] | number): vec is Vector3
{
    return !!(vec as Vector3).cross
}


function is_number_array (vec: [number, number, number] | number): vec is [number, number, number]
{
    return Array.isArray(vec)
}



export function is_Vector4 (vec: Vector3 | Vector4): vec is Vector4
{
    return (vec as Vector4).w !== undefined
}
