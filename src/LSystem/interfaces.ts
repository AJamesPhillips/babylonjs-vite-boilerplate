
interface Rule
{
    match: string
    replace: string
}

export interface LSystem
{
    alphabet: string[]
    initial_state: string
    rules: Rule[]
}
