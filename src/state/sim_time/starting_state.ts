import { SimTimeState } from "./state"



export function get_sim_time_starting_state (): SimTimeState
{
    return {
        current_time: 0,
    }
}
