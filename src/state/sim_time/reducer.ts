import { AnyAction } from "redux"

import { update_substate } from "../../utils/update_state"
import { AppRootState } from "../state"
import { is_set_sim_time } from "./actions"



export const sim_time_reducer = (state: AppRootState, action: AnyAction): AppRootState =>
{

    if (is_set_sim_time(action))
    {
        state = update_substate(state, "sim_time", "current_time", action.new_time)
    }


    return state
}
