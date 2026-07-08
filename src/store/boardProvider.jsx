import React, { useCallback, useReducer, useRef } from "react";
import boardContext from "./board-context";
import { BOARD_ACTIONS, TOOL_ACTION_TYPES, TOOL_ITEMS } from "../constants";
import {
    createElement,
    getSvgPathFromStroke,
    isPointNearElement,
} from "../utilities/element";
import getStroke from "perfect-freehand";

const boardReducer = (state, action) => {
    switch (action.type) {
        case BOARD_ACTIONS.CHANGE_TOOL:
            return {
                ...state,
                ActiveToolItem: action.payload.tool,
            };

        case BOARD_ACTIONS.CHNAGE_ACTION_TYPE:
            return {
                ...state,
                toolActionType: action.payload.actionType,
            };

        case BOARD_ACTIONS.DRAW_DOWN: {
            const { clientX, clientY, stroke, fill, size } = action.payload;

            const newElement = createElement(
                state.elements.length,
                clientX,
                clientY,
                clientX,
                clientY,
                {
                    type: state.ActiveToolItem,
                    stroke,
                    fill,
                    size,
                }
            );

            return {
                ...state,
                toolActionType:
                    state.ActiveToolItem === TOOL_ITEMS.TEXT
                        ? TOOL_ACTION_TYPES.WRITTING
                        : TOOL_ACTION_TYPES.DRAWING,
                elements: [...state.elements, newElement],
            };
        }

        case BOARD_ACTIONS.DRAW_MOVE: {
            const { clientX, clientY } = action.payload;

            const newElements = [...state.elements];

            const index = newElements.length - 1;

            const { type } = newElements[index];

            switch (type) {
                case TOOL_ITEMS.LINE:
                case TOOL_ITEMS.RECTANGLE:
                case TOOL_ITEMS.CIRCLE:
                case TOOL_ITEMS.ARROW: {
                    const { x1, y1, stroke, fill, size } = newElements[index];

                    newElements[index] = createElement(
                        index,
                        x1,
                        y1,
                        clientX,
                        clientY,
                        {
                            type,
                            stroke,
                            fill,
                            size,
                        }
                    );

                    break;
                }

                case TOOL_ITEMS.BRUSH:
                    newElements[index].points = [
                        ...newElements[index].points,
                        { x: clientX, y: clientY },
                    ];

                    newElements[index].path = new Path2D(
                        getSvgPathFromStroke(
                            getStroke(newElements[index].points)
                        )
                    );

                    break;

                default:
                    break;
            }

            return {
                ...state,
                elements: newElements,
            };
        }

        case BOARD_ACTIONS.DRAW_UP: {
            const elementsCopy = [...state.elements];

            const newHistory = state.history.slice(0, state.index + 1);

            newHistory.push(elementsCopy);

            return {
                ...state,
                history: newHistory,
                index: state.index + 1,
            };
        }

        case BOARD_ACTIONS.ERASE: {
            const { clientX, clientY } = action.payload;

            let newElements = [...state.elements];

            newElements = newElements.filter((element) => {
                return !isPointNearElement(element, clientX, clientY);
            });

            const newHistory = state.history.slice(0, state.index + 1);

            newHistory.push(newElements);

            return {
                ...state,
                elements: newElements,
                history: newHistory,
                index: state.index + 1,
            };
        }

        case BOARD_ACTIONS.CHANGE_TEXT: {
            const index = state.elements.length - 1;

            const newElements = [...state.elements];

            newElements[index] = {
                ...newElements[index],
                text: action.payload.text,
            };

            const newHistory = state.history.slice(0, state.index + 1);

            newHistory.push(newElements);

            return {
                ...state,
                toolActionType: TOOL_ACTION_TYPES.NONE,
                elements: newElements,
                history: newHistory,
                index: state.index + 1,
            };
        }

        case BOARD_ACTIONS.UNDO:
            if (state.index <= 0) return state;

            return {
                ...state,
                elements: state.history[state.index - 1],
                index: state.index - 1,
            };

        case BOARD_ACTIONS.REDO:
            if (state.index >= state.history.length - 1) return state;

            return {
                ...state,
                elements: state.history[state.index + 1],
                index: state.index + 1,
            };

        // ⭐ NEW ACTION
        case BOARD_ACTIONS.SET_ELEMENTS:
            return {
                ...state,
                elements: action.payload.elements,
                history: [...state.history, action.payload.elements],
                index: state.index + 1,
            };

        default:
            return state;
    }
};

const BoardProvider = ({ children, initialElements = [] }) => {
    const initialBoardState = {
        ActiveToolItem: TOOL_ITEMS.BRUSH,
        toolActionType: TOOL_ACTION_TYPES.NONE,
        elements: initialElements,
        history: [initialElements],
        index: 0,
    };

    const [boardState, dispatchBoardAction] = useReducer(
        boardReducer,
        initialBoardState
    );

    const remoteUpdateRef = useRef(false);

    const handleToolItemClick = (tool) => {
        dispatchBoardAction({
            type: BOARD_ACTIONS.CHANGE_TOOL,
            payload: { tool },
        });
    };

    const boardMouseDownHandler = (event, toolboxState) => {
        if (boardState.toolActionType === TOOL_ACTION_TYPES.WRITTING) return;

        const { clientX, clientY } = event;

        if (boardState.ActiveToolItem === TOOL_ITEMS.ERASER) {
            dispatchBoardAction({
                type: BOARD_ACTIONS.CHNAGE_ACTION_TYPE,
                payload: {
                    actionType: TOOL_ACTION_TYPES.ERASING,
                },
            });
            return;
        }

        dispatchBoardAction({
            type: BOARD_ACTIONS.DRAW_DOWN,
            payload: {
                clientX,
                clientY,
                stroke: toolboxState[boardState.ActiveToolItem]?.stroke,
                fill: toolboxState[boardState.ActiveToolItem]?.fill,
                size: toolboxState[boardState.ActiveToolItem]?.size,
            },
        });
    };

    const boardMouseMoveHandler = (event) => {
        if (boardState.toolActionType === TOOL_ACTION_TYPES.WRITTING) return;

        const { clientX, clientY } = event;

        if (boardState.toolActionType === TOOL_ACTION_TYPES.DRAWING) {
            dispatchBoardAction({
                type: BOARD_ACTIONS.DRAW_MOVE,
                payload: {
                    clientX,
                    clientY,
                },
            });
        } else if (
            boardState.toolActionType === TOOL_ACTION_TYPES.ERASING
        ) {
            dispatchBoardAction({
                type: BOARD_ACTIONS.ERASE,
                payload: {
                    clientX,
                    clientY,
                },
            });
        }
    };

    const boardMouseUpHandler = () => {
        if (boardState.toolActionType === TOOL_ACTION_TYPES.WRITTING) return;

        if (boardState.toolActionType === TOOL_ACTION_TYPES.DRAWING) {
            dispatchBoardAction({
                type: BOARD_ACTIONS.DRAW_UP,
            });
        }

        dispatchBoardAction({
            type: BOARD_ACTIONS.CHNAGE_ACTION_TYPE,
            payload: {
                actionType: TOOL_ACTION_TYPES.NONE,
            },
        });
    };

    const textAreaBlurHandler = (text) => {
        dispatchBoardAction({
            type: BOARD_ACTIONS.CHANGE_TEXT,
            payload: {
                text,
            },
        });
    };

    const boardUndoHandler = useCallback(() => {
        dispatchBoardAction({
            type: BOARD_ACTIONS.UNDO,
        });
    }, []);

    const boardRedoHandler = useCallback(() => {
        dispatchBoardAction({
            type: BOARD_ACTIONS.REDO,
        });
    }, []);

    // ⭐ NEW FUNCTION
    const setElements = useCallback((elements) => {

    remoteUpdateRef.current = true;

    dispatchBoardAction({
        type: BOARD_ACTIONS.SET_ELEMENTS,
        payload: {
            elements,
        },
    });

}, []);

    const boardContextValue = {
        ActiveToolItem: boardState.ActiveToolItem,
        elements: boardState.elements,
        toolActionType: boardState.toolActionType,
        handleToolItemClick,
        boardMouseDownHandler,
        boardMouseMoveHandler,
        boardMouseUpHandler,
        textAreaBlurHandler,
        undo: boardUndoHandler,
        redo: boardRedoHandler,
        setElements, // ⭐ NEW
        remoteUpdateRef,
    };

    return (
        <boardContext.Provider value={boardContextValue}>
            {children}
        </boardContext.Provider>
    );
};

export default BoardProvider;