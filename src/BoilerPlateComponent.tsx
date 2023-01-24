import React, { FunctionComponent } from "react"
import { connect, ConnectedProps } from "react-redux"

import { AppRootState } from "./state/state"



interface OwnProps {}

const map_state = (state: AppRootState) =>
{
    return {}
}

const map_dispatch = {
    // change_view: ACTIONS.sim_time.set_sim_time,
}
const connector = connect(map_state, map_dispatch)
type Props = ConnectedProps<typeof connector> & OwnProps


const _BoilerPlateComponent = (props: Props) =>
{
    return <></>
}

export const BoilerPlateComponent = connector(_BoilerPlateComponent) as FunctionComponent<OwnProps>
