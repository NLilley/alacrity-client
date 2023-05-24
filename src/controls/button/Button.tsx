import { useEffect, useRef } from 'react';
import { focusHandler } from '../../utils/accessibilityUtil';
import classes from './Button.module.scss';

export interface ButtonProps {
  text: string,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  kind?: 'main' | 'sub',
  size?: 'small' | 'medium',
  disabled?: boolean,
  autoFocus?: boolean
}

const Button = (props: ButtonProps) => {
  const ref = useRef(null);
  const color = !!props.disabled ? 'btn-dis' : props.kind === 'sub' ? 'btn-sub' : 'btn-main';
  const size = props.size === 'medium' ? 'btn-med' : 'btn-sml';
  const cursor = !!props.disabled ? classes.cursor : '';
  const onClick = !props.disabled ? props.onClick : undefined;

  useEffect(() => {
    if(props.autoFocus)
      (ref.current as any).focus();
  }, [])

  return <div
    ref={ref}
    onClick={onClick}
    onKeyUp={focusHandler}
    className={`btn ${color} ${size} ${cursor}`}
    tabIndex={0}
    role="button"
    aria-disabled={props.disabled == true}
  >
    {props.text}
  </div>
}

export default Button;