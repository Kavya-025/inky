import { createContext } from "react";

const boardContext = createContext({
    ActiveToolItem: "",
    toolActionType: "",
    elements: [],
    boardMouseDownHandler: () => {},
    handleToolItemClick: () => {},
    boardMouseMoveHandler: ()=>{},
    boardMouseUpHandler: () => {},
});

export default boardContext;