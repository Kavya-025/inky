import React, { useContext } from 'react';
import classes from "./index.module.css";
import toolboxContext from '../../store/toolbox-context';
import { COLORS, FILL_TOOL_TYPES, STROKE_TOOL_TYPES,SIZE_TOOL_TYPES } from '../../constants';
import cx from "classnames";
import boardContext from '../../store/board-context';



const Toolbox = () => {
    const {ActiveToolItem} = useContext(boardContext);
    const {toolboxState, changeStroke, changeFill, changeSize} = useContext(toolboxContext);

    const strokeColor = toolboxState[ActiveToolItem]?.stroke;
    const fillColor = toolboxState[ActiveToolItem]?.fill;
    const size = toolboxState[ActiveToolItem]?.size;

  return (
    <div className={classes.container}>
        { STROKE_TOOL_TYPES.includes(ActiveToolItem) && <div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Stroke Color</div>
            <div className= {classes.colorsContainer}>
                {Object.keys(COLORS).map((k)=>{
                    return <div key={k} className= {cx(classes.colorBox, {
                        [classes.activeColorBox]: strokeColor === COLORS[k]})}
                    style = {{backgroundColor: COLORS[k]}}
                    onClick={() => changeStroke(ActiveToolItem, COLORS[k])}
                    > </div>
                })}
            </div>
        </div>}
        {FILL_TOOL_TYPES.includes(ActiveToolItem)&& <div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Fill color</div>
            <div className= {classes.colorsContainer}>
                {Object.keys(COLORS).map((k)=>{
                    return <div key={k} className= {cx(classes.colorBox, {
                        [classes.activeColorBox]: fillColor === COLORS[k]})}
                    style = {{backgroundColor: COLORS[k]}}
                    onClick={() => changeFill(ActiveToolItem, COLORS[k])}
                    > </div>
                })} 
            </div>
        </div>}
        {SIZE_TOOL_TYPES.includes(ActiveToolItem)&& <div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Brush color</div>
                <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={size}
                onChange={(event) => changeSize(ActiveToolItem,Number(event.target.value))}
                />
        </div>}
    </div>
  )
}

export default Toolbox