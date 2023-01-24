import { DeviceInfoState } from "./device_info/state"
import { SimTimeState } from "./sim_time/state"



export interface AppRootState
{
    device_info: DeviceInfoState
    sim_time: SimTimeState
}
