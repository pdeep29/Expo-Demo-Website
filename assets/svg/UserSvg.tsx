import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function UserSvg(props: any) {
    return (
        <Svg
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Circle cx={12} cy={9} r={3} stroke="#1C274C" strokeWidth={1.5} />
            <Circle cx={12} cy={12} r={10} stroke="#1C274C" strokeWidth={1.5} />
            <Path
                d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"
                stroke="#1C274C"
                strokeWidth={1.5}
                strokeLinecap="round"
            />
        </Svg>
    )
}

export default UserSvg
