import { selector_on_mobile } from "../../state/device_info/selectors"
import { AppRootState } from "../../state/state"



export const MODAL_HEADER_HEIGHT = 100

export function selector_modal_height (state: AppRootState)
{
    const on_mobile = selector_on_mobile(state)
    let pixels = (on_mobile ? 0.8 : 0.6) * state.device_info.screen_height
    return pixels * 1.4 // on Mac and IOS the actual height of page seems to be double?
}



export function selector_modal_content_height (state: AppRootState)
{
    return selector_modal_height(state) - MODAL_HEADER_HEIGHT
}
