import classes from './TextArea.module.scss';

export interface TextAreaProps {
  label: string,
  value?: string,
  placeholder?: string,
  disabled?: boolean,
  onChange?: (update: string) => void
  style?: { [name: string]: any }
}

const TextArea = (props: TextAreaProps) => {
  return <fieldset className={classes.textArea}>
    <legend>{props.label}</legend>
    <textarea
      style={props.style}
      placeholder={props.placeholder}
      value={props.value}
      disabled={props.disabled}
      onChange={e => {
        if (!props.onChange)
          return;

        props.onChange(e.target.value);
      }}
    />
  </fieldset>
}

export default TextArea;