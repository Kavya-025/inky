import React, { useContext } from 'react';
import classes from "./index.module.css";
import toolboxContext from '../../store/toolbox-context';
import { COLORS, FILL_TOOL_TYPES, STROKE_TOOL_TYPES,SIZE_TOOL_TYPES, TOOL_ITEMS } from '../../constants';
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
                <div>
                <input
                    className={classes.colorPicker}
                    type="color"
                    value={strokeColor}
                    onChange={(e) => changeStroke(ActiveToolItem, e.target.value)}
                ></input>
                </div>
                {Object.keys(COLORS).map((k)=>{
                    return <div key={k} className= {cx(classes.colorBox, {
                        [classes.activeColorBox]: strokeColor === COLORS[k]})}
                    style = {{backgroundColor: COLORS[k]}}
                    onClick={() => changeStroke(ActiveToolItem, COLORS[k])}
                    > </div>
                })}
            </div>
        </div>}
        {FILL_TOOL_TYPES.includes(ActiveToolItem)&& <div className={classes.selectOptionContainer} >
            <div className={classes.toolBoxLabel}>Fill color</div>
            <div className= {classes.colorsContainer}>
                {fillColor === null ? (
              <div
                className={cx(classes.colorPicker, classes.noFillColorBox)}
                onClick={() => changeFill(ActiveToolItem, COLORS.BLACK)}
              ></div>
            ) : (
              <div>
                <input
                  className={classes.colorPicker}
                  type="color"
                  value={strokeColor}
                  onChange={(e) => changeFill(ActiveToolItem, e.target.value)}
                ></input>
              </div>
            )}
            <div
              className={cx(classes.colorBox, classes.noFillColorBox, {
                [classes.activeColorBox]: fillColor === null,
              })}
              onClick={() => changeFill(ActiveToolItem, null)}
            ></div>
                
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
            <div className={classes.toolBoxLabel}>
                {ActiveToolItem === TOOL_ITEMS.TEXT? "Font size": "Brush color"}</div>
                <input
                type="range"
                min={ActiveToolItem === TOOL_ITEMS.TEXT?16:1}
                max={ActiveToolItem === TOOL_ITEMS.TEXT?30:10}
                step={1}
                value={size}
                onChange={(event) => changeSize(ActiveToolItem,Number(event.target.value))}
                />
        </div>}
    </div>
  )
}

export default Toolbox