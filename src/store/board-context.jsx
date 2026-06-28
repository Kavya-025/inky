import { createContext } from "react";

const boardContext = createContext({
    ActiveToolItem: "",
    toolActionType: "",
    elements: [],
    history: [[]],
    index: 0,
    boardMouseDownHandler: () => {},
    handleToolItemClick: () => {},
    boardMouseMoveHandler: ()=>{},
    boardMouseUpHandler: () => {},
});

export default boardContext;