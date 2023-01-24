import type { Action, AnyAction } from "redux"



interface SetSimTimeArgs
{
    new_time: number
}

interface ActionSetSimTime extends Action, SetSimTimeArgs {}

const set_sim_time_type = "set_sim_time"

const set_sim_time = (args: SetSimTimeArgs): ActionSetSimTime =>
{
    return { type: set_sim_time_type, ...args }
}

export const is_set_sim_time = (action: AnyAction): action is ActionSetSimTime => {
    return action.type === set_sim_time_type
}


export const sim_time_actions = {
    set_sim_time,
}
