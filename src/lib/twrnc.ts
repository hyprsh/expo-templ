import * as twrnc from "twrnc";

const tw = twrnc.create(require(`../../tailwind.config.js`));

export const useDeviceContext = twrnc.useDeviceContext;
export const useAppColorScheme = twrnc.useAppColorScheme;
export default tw;
