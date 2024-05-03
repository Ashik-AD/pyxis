enum DeviceName {
    "sm"= 'mobile',
    "md" = "tablet",
    "lg" = "desktop",
    "xlg" = "desktop_large"
}
type DeviceType = "mobile" | "tablet" | "desktop" | "desktop_large";
const DeviceType = (): DeviceType =>{
    if(isSatisfy(1280)){
        return DeviceName.xlg;
    }
    else if(isSatisfy(1020)){
        return DeviceName.lg;
    }
    else if(isSatisfy(768)) {
        return DeviceName.md;
    }
    return DeviceName.sm;
}

const isSatisfy = (resolution: number): boolean => window.matchMedia(`(min-width: ${resolution}px)`).matches;
export default DeviceType;