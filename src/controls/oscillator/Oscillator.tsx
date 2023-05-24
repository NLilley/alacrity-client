import Gauge from '../gauge/Gauge';
import classes from './Oscillator.module.scss';

export interface OscillatorProps {
  width?: number,
  height?: number,
  value: number,
  text: string,
  heading?: string,
  /** Defualt to 0 inclusive*/
  min?: number,
  /** Defualt to 1 inclusive*/
  max?: number
}

const stops = [
  [0xFF, 0X0E, 0X0E], // Red
  [0xEB, 0XFF, 0X03], // Yellow
  [0x05, 0xFF, 0x00], // Green
]

const Oscillator = (props: OscillatorProps) => {
  const [width, height] = [props.width ?? 120, props.height ?? 70];

  return <div style={{ width }} className={classes.oscillator}>
    {
      props.heading && <div className={classes.heading}>{props.heading}</div>
    }
    <Gauge width={width} height={height} value={props.value} stops={stops} min={props.min} max={props.max} />
    {
      props.text && <div className={classes.text}>
        {props.text}
      </div>
    }
  </div>;
}

export default Oscillator;