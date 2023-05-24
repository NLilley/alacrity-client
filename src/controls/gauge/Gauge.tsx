import classes from './Gauge.module.scss';

export interface GaugeProps {
  width: number,
  height: number,
  value: number,
  min?: number,
  max?: number,
  stops: number[][]
}

const lerpColor = (stops: number[][], portion: number): string => {
  portion = portion < 0 ? 0 : portion > 1 ? 1 : portion;

  const scaled = portion * (stops.length - 1);
  const stopIndex = Math.floor(scaled);
  const multi = (portion * (stops.length - 1)) % 1;

  const [minR, minG, minB] = stops[stopIndex];
  const [maxR, maxG, maxB] = stops[stopIndex + (stopIndex !== (stops.length - 1) ? 1 : 0)];

  const [r, g, b] = [
    (1 - multi) * minR + (multi * maxR),
    (1 - multi) * minG + (multi * maxG),
    (1 - multi) * minB + (multi * maxB),
  ]

  return `#${Math.floor(r).toString(16).padStart(2, '0')
    }${Math.floor(g).toString(16).padStart(2, '0')
    }${Math.floor(b).toString(16).padStart(2, '0')
    }`;
}

const Gauge = (props: GaugeProps) => {
  const [min, max] = [props.min ?? 0, props.max ?? 1];
  const truncatedValue = Math.min(max, Math.max(min, props.value));
  const range = max - min;

  const normalizedX = (truncatedValue - min) / range;
  const circleX = ((normalizedX) - 0.5) * 2;
  const circleAngle = Math.acos(circleX);
  const circleY = Math.sin(circleAngle);

  const x = normalizedX;
  const y = 0.5 - (circleY / 2);

  let color = lerpColor(props.stops, normalizedX);

  return <svg width={props.width} height={props.height} viewBox="-0.15 -0.15 1.3 0.8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter x="-50%" y="-50%" width="200%" height="200%" id="blur" filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="0.06" />
        <feBlend mode="normal" in="SourceGraphic" result="shape" />
      </filter>
    </defs>

    <path
      d="M0 0.5 A 0.5 0.5 0 0 1 1 0.5" stroke="#2C2C2C"
      strokeWidth="0.1"
      strokeLinecap="round"
    />
    <path
      d={`M0 0.5 A 0.5 0.5 0 0 1 ${x} ${y}`}
      filter="url(#blur)"
      stroke={color}
      strokeWidth="0.1"
      strokeLinecap="round"
      className={classes.slither}
    />
    <text x="0.5" y="0.45" className={classes.svgText}>
      {(props.value).toLocaleString()}
    </text>
  </svg>;
}

export default Gauge;