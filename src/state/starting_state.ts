import { AppRootState } from "./state"
import { get_device_info_starting_state } from "./device_info/starting_state"
import { get_sim_time_starting_state } from "./sim_time/starting_state"



export function get_starting_state (load_state_from_storage: boolean): AppRootState
{
    return {
        device_info: get_device_info_starting_state(),
        sim_time: get_sim_time_starting_state(),
    }
}
