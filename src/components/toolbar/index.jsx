import React, { useContext} from 'react';
import classes from "./index.module.css";
import cx from "classnames";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaSlash } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import boardContext from '../../store/board-context';
import { TOOL_ITEMS } from '../../constants';

const Toolbar = () => {
  const {ActiveToolItem, handleToolItemClick} = useContext(boardContext)
  return (
    <div className={classes.container}>
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

    </div>
  )
}

export default Toolbar;