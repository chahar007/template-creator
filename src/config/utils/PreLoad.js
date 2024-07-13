import  { lazy } from "react";

const ReactLazyPreload = (importStatement) => {
    const Component = lazy(importStatement);
    Component.preload = importStatement;
    return Component;
};

export default ReactLazyPreload;