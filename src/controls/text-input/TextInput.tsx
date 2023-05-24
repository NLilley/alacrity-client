import { useEffect, useRef } from 'react';
import classes from './TextInput.module.scss';

export interface TextInputProps {
  label: string,
  value?: string,
  placeholder?: string,
  isPassword?: boolean,
  disabled?: boolean,
  autoFocus?: boolean,
  onChange?: (update: string) => void,
  onKeyDown?: (e: any) => void
}

const TextInput = (props: TextInputProps) => {
  const ref = useRef(null);
  useEffect(() => {
    if (props.autoFocus)
      setTimeout(() => (ref as any).current.focus(), 0);
  }, []);
  const inputType = props.isPassword ? 'password' : 'text';
  return <fieldset className={classes.textInput}>
    <legend>{props.label}</legend>
    <input
      ref={ref}
      type={inputType}
      placeholder={props.placeholder}
      value={props.value}
      disabled={props.disabled}
      tabIndex={0}
      onChange={e => {
        if (!props.onChange)
          return;

        props.onChange(e.target.value);
      }}
      onKeyDownCapture={props.onKeyDown}
    />
  </fieldset>
}

export default TextInput;