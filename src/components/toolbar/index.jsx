import React, { useContext} from 'react';
import classes from "./index.module.css";
import cx from "classnames";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaSlash } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import boardContext from '../../store/board-context';
import { TOOL_ITEMS } from '../../constants';
import { BsFillBrushFill } from "react-icons/bs";
import { LuEraser } from "react-icons/lu";
import { FaFont } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { RiArrowGoForwardFill } from "react-icons/ri";
import { GrInstallOption } from "react-icons/gr";


const Toolbar = () => {
  const {ActiveToolItem, handleToolItemClick, undo, redo} = useContext(boardContext);

  const handleDownloadClick = () => {
    const canvas = document.getElementById("canvas");
    const data = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = data;
    anchor.download = "board.png";
    anchor.click();
  }
  return (
    <div className={classes.container}>
      <div 
        className= {
          cx(classes.toolItem, {[classes.active]: ActiveToolItem === TOOL_ITEMS.BRUSH})
        }
        onClick={() => handleToolItemClick(TOOL_ITEMS.BRUSH)}
      >
        <BsFillBrushFill />
      </div>

      <div 
        className= {
          cx(classes.toolItem, {[classes.active]: ActiveToolItem === TOOL_ITEMS.LINE})
        }
        onClick={() => handleToolItemClick(TOOL_ITEMS.LINE)}
      >
        <FaSlash />
      </div>

      <div 
        className= {
          cx(classes.toolItem, {[classes.active]: ActiveToolItem === TOOL_ITEMS.RECTANGLE})
        }
        onClick={() => handleToolItemClick(TOOL_ITEMS.RECTANGLE)}
      >
        <LuRectangleHorizontal/>
      </div>

      <div 
        className= {
          cx(classes.toolItem, {[classes.active]: ActiveToolItem === TOOL_ITEMS.CIRCLE})
        }
        onClick={() => handleToolItemClick(TOOL_ITEMS.CIRCLE)}
      >
        <FaRegCircle />
      </div>

      <div 
        className= {
          cx(classes.toolItem, {[classes.active]: ActiveToolItem === TOOL_ITEMS.ARROW})
        }
        onClick={() => handleToolItemClick(TOOL_ITEMS.ARROW)}
      >
        <FaArrowRightLong />
      </div>
      <div 
        className= {
          cx(classes.toolItem, {[classes.active]: ActiveToolItem === TOOL_ITEMS.ERASER})
        }
        onClick={() => handleToolItemClick(TOOL_ITEMS.ERASER)}
      >
        <LuEraser />
      </div>
      <div 
        className= {
          cx(classes.toolItem, {[classes.active]: ActiveToolItem === TOOL_ITEMS.TEXT})
        }
        onClick={() => handleToolItemClick(TOOL_ITEMS.TEXT)}
      >
        <FaFont />
      </div>
      <div 
        className= {classes.toolItem}
        onClick={undo}
      >
        <RiArrowGoBackFill />
      </div>
      <div 
        className= {classes.toolItem}
        onClick={redo}
      >
        <RiArrowGoForwardFill />
      </div>
      <div 
        className= {classes.toolItem}
        onClick={handleDownloadClick}
      >
        <GrInstallOption />
      </div>
    </div>
  )
}

export default Toolbar;