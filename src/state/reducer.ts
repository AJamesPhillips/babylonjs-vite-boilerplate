import { AnyAction } from "redux"
import { device_info_reducer } from "./device_info/reducer";
import { sim_time_reducer } from "./sim_time/reducer";

import { AppRootState } from "./state"



export const root_reducer = (state: AppRootState, action: AnyAction): AppRootState =>
{

    state = device_info_reducer(state, action)
    state = sim_time_reducer(state, action)

    // state = { ...state, last_action: action }

    ;(window as any).debug_state = state

    return state
}
