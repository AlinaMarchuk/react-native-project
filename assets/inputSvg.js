import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = ({ children }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={343}
    height={50}
    fill="#F6F6F6"
    strokeWidth={1}
    stroke="#E8E8E8"
    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
  >
    {children}
    <Path
      fill="#F6F6F6"
      stroke="#E8E8E8"
      d="M.5 8A7.5 7.5 0 0 1 8 .5h327a7.5 7.5 0 0 1 7.5 7.5v34a7.5 7.5 0 0 1-7.5 7.5H8A7.5 7.5 0 0 1 .5 42V8Z"
    />
  </Svg>
);
export default SvgComponent;
