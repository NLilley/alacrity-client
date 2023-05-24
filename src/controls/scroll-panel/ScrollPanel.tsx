import { PropsWithChildren, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { mobileBreakPoint } from '../../shared/constants';
import { throttler } from '../../utils/fnUtil';
import classes from './ScrollPanel.module.scss';
import { selectVisualizationQuality } from '../../app/slices/loginSlice';
import { useSelector } from 'react-redux';
import { VisualizationQuality } from '../../app/enums/client/visualizationQuality';

export interface ScrollPanelProps {
  rotateElements?: boolean
}

const ScrollPanel = (props: PropsWithChildren<ScrollPanelProps>) => {
  const panelRef = useRef(null) as any;
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileBreakPoint}px)` });
  const visualizationQuality = useSelector(selectVisualizationQuality);

  const setRotation = () => {
    if (isMobile || visualizationQuality != VisualizationQuality.High)
      return;

    const children = (panelRef.current as any)?.children as HTMLCollection | undefined;
    if (panelRef.current == null || children == null || children.length === 0)
      return;

    const scrollBarStyles = window.getComputedStyle(panelRef.current);
    const gap = parseFloat(scrollBarStyles.gap);
    const scrollLeft = parseFloat(panelRef.current.scrollLeft);
    const panelWidth = parseFloat(scrollBarStyles.width.replace("px", ""));
    const padding = 48;    

    let widthCounter = padding;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childStyles = window.getComputedStyle(child);
      const width = parseFloat(childStyles.width);

      // Set rotation based of our current scroll, childs size, and overall ordering
      let panelMidPointPct = (((widthCounter - scrollLeft + (width / 2)) / panelWidth) - 0.5) * 2;

      panelMidPointPct = Math.max(Math.min(1, panelMidPointPct), -1);
      let xDistance = panelMidPointPct / 2;
      let rotation = Math.asin(xDistance);

      const translateX = rotation * 120;
      const translateZ = -(Math.cos(rotation) - 1) * panelWidth * 1;
      rotation = -rotation * 360 / (2 * Math.PI);
      rotation *= 1;
      (child as any).style.setProperty('transform', `rotateY(${rotation}deg) translateZ(${translateZ}px) translateX(${translateX}px)`);

      widthCounter += width + gap;
    }
  }

  const throttleRecalc = throttler(8, () => {
    if (props.rotateElements != true)
      return;

    setRotation()
  });

  useEffect(() => {
    throttleRecalc(undefined);
  });

  const childrenToRender = (props.children as any)?.map == null
    ? props.children
    : (props.children as any)?.map((c: any, idx: number) => {
      return <div key={idx} className={`rotatable ${classes.scrollChild}`}>
        {c}
      </div>;
    });

  return <div
    ref={panelRef}
    className={`${classes.scrollPanel} rotate-root`}
    onScroll={throttleRecalc}
  >
    {childrenToRender}
  </div>
}

export default ScrollPanel;