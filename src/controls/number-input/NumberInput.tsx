import classes from './NumberInput.module.scss';

export interface NumberInputProps {
  label: string,
  value?: string,
  placeholder?: string,
  min?: number,
  max?: number,
  disabled?: boolean,
  autoFocus?: boolean,
  maxDp?: number,
  onChange?: (update: string) => void,
}

const NumberInput = (props: NumberInputProps) => {
  return <fieldset>
    <legend>{props.label}</legend>
    <input
      type="number"
      placeholder={props.placeholder}
      value={props.value}
      disabled={props.disabled}
      min={props.min}
      max={props.max}
      autoFocus={props.autoFocus}
      onChange={e => {
        if (!props.onChange)
          return;

        if (props.maxDp != null && props.maxDp > 0) {
          const parts = e.target.value.split(".");
          if (parts[1] != null && parts[1].length > props.maxDp)
            return;
        }

        const number = parseFloat(e.target.value);

        if (props.min != null && Number.isFinite(number) && number < (props.min as any))
          return;

        if (props.max != null && Number.isFinite(number) && number > props.max)
          return;

        props.onChange && props.onChange(e.target.value);
      }
      }
    />
  </fieldset>;
}

export default NumberInput;