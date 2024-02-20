import classes from './Chart.module.scss';
import { memo, useEffect, useRef } from "react";


export interface ChartProps {
  /**
   * This function MUST setup the external charting library.
   * @param domElement The internal element which will have a chart rendered into it.   
   */
  onStart: (domElement: any) => void,
  /**
   * This function will be called when the chart becomes unmounted, and so should be cleaned up.
   * @returns 
   */
  onEnd: () => void,
}

const Chart = (props: ChartProps) => {
  const myRef = useRef(null);

  useEffect(() => {
    props.onStart(myRef.current);
    return () => {
      props.onEnd();
    }
  }, []);

  return <div className={classes.chartWrapper}>
    <div ref={myRef} />
  </div>
}

export default memo(Chart);