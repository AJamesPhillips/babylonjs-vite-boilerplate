import { LSystem } from "./interfaces"



export const step_LSystem = (system: LSystem): LSystem =>
{
    let new_state = ""

    for (let i = 0; i < system.initial_state.length; ++i)
    {
        const character = system.initial_state[i]

        system.rules.forEach(rule =>
        {
            if (rule.match === character)
            {
                new_state += rule.replace
            }
            else
            {
                new_state += character
            }
        })
    }

    return {
        ...system, initial_state: new_state,
    }
}
