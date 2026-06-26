import React, { useReducer } from 'react'
import boardContext from './board-context'
import { BOARD_ACTIONS, TOOL_ACTION_TYPES, TOOL_ITEMS } from '../constants';
import { createRoughElement } from '../utilities/element';

const boardReducer = (state, action) =>{
    switch(action.type){
        case BOARD_ACTIONS.CHANGE_TOOL:
            return {
                ...state, 
                ActiveToolItem: action.payload.tool,
            };

            case BOARD_ACTIONS.DRAW_DOWN : {
                const {clientX,clientY} = action.payload;
                const newElement = createRoughElement(state.elements.length,
                    clientX,
                    clientY,
                    clientX,
                    clientY,
                    {type: state.ActiveToolItem})
                const prevElements = state.elements;
                return{
                    ...state,
                    toolActionType: TOOL_ACTION_TYPES.DRAWING,
                    elements: [...prevElements,newElement],
                };
            }
                

                case BOARD_ACTIONS.DRAW_MOVE: {
                        const {clientX,clientY} = action.payload;
                    const newElements = [...state.elements];
                    const index = state.elements.length - 1;
                    const {x1,y1} = newElements[index]
                    const newElement = createRoughElement(index,x1,y1,clientX,clientY,
                         {type: state.ActiveToolItem,
                         })
                         newElements[index] = newElement;
                    return {
                        ...state,
                        elements: newElements,
                    }
                }

                case BOARD_ACTIONS.DRAW_UP:{
                    return{
                        ...state,
                        toolActionType: TOOL_ACTION_TYPES.NONE,
                    }
                }
                
        default: 
            return state;
    }
};

const initialBoardState = {
    ActiveToolItem: TOOL_ITEMS.LINE,
    toolActionType: TOOL_ACTION_TYPES.NONE,
    elements: [],
}
const BoardProvider = ({children}) => {
    const [boardState, dispatchBoardAction] = useReducer(
        boardReducer,
        initialBoardState
    );

    const handleToolItemClick = (tool) => {
        dispatchBoardAction({
            type: "CHANGE_TOOL",
            payload: {
                tool,
            }
        });
    };

    const boardMouseDownHandler = (event)=>{
        const {clientX,clientY} = event;
        dispatchBoardAction({
                type: "DRAW_DOWN",
                payload: {
                    clientX,
                    clientY,
                }
        });
    };

    const boardMouseMoveHandler = (event)=>{
        const {clientX,clientY} = event;
        dispatchBoardAction({
                type: "DRAW_MOVE",
                payload: {
                    clientX,
                    clientY,
                }
        });
    };

    const boardMouseUpHandler = ()=>{
        dispatchBoardAction({
                type: "DRAW_UP",
        });
    };

    const boardContextValue = {
        ActiveToolItem: boardState.ActiveToolItem,
        elements: boardState.elements,
        toolActionType: boardState.toolActionType,
        handleToolItemClick,
        boardMouseDownHandler,
        boardMouseMoveHandler,
        boardMouseUpHandler,
        
    };  

  return <boardContext.Provider 
    value = {boardContextValue}>
    {children}
  </boardContext.Provider> 
};

export default BoardProvider    