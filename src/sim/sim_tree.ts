import { LSystem } from "../LSystem/interfaces"



export const sim_tree: LSystem = {
    alphabet: ["F", "R"],
    initial_state: "FR",
    rules: [
        { match: "F", replace: "FRF" }
    ]
}
