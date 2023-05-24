import { useEffect, useId, useState } from 'react';
import classes from './Select.module.scss';
import { focusHandler } from '../../utils/accessibilityUtil';
import { IconCancel } from '../../shared/icons';

export interface SelectKeyValuePair {
  label: string,
  value: any
}

export interface SelectProps {
  placeholder?: string,
  label: string,
  value?: any,
  values: SelectKeyValuePair[],
  required?: boolean,
  onSelect?: (value: any) => void,
  disabled?: boolean
}

const Select = (props: SelectProps) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded == false)
      return;

    const unbind = (e: any) => {
      setExpanded(false);
      html?.removeEventListener('click', unbind);
    };
    const html = document.querySelector('html');
    html?.addEventListener('click', unbind, { once: true });
  }, [expanded]);

  let valueIdx = -1;
  for (let i = 0; i < props.values.length; i++) {
    if (props.values[i].value == props.value) {
      valueIdx = i;
      break;
    }
  }
  const hasValueSet = props.value != null && valueIdx != -1;

  const text = hasValueSet
    ? props.values[valueIdx].label ?? ''
    : props.placeholder ?? '';

  return <div
    className={`${classes.selectWrapper}`}
    onKeyDownCapture={(e) => {
      if (e.key === 'Escape' || e.key === 'Tab') {
        setExpanded(false);
        return false;
      }

      if (props.values.length === 0)
        return false;

      let currentIdx = -1;
      if (props.value != null) {
        for (let i = 0; i < props.values.length; i++) {
          if (props.values[i].value === props.value) {
            currentIdx = i;
            break;
          }
        }
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation();

        if (currentIdx === -1) {
          props.onSelect && props.onSelect(props.values[0].value);
          return false;
        }
        if (currentIdx === props.values.length - 1)
          return false;

        props.onSelect && props.onSelect(props.values[currentIdx + 1].value);
        return false;
      }
      else if (e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();

        if (currentIdx < 1)
          return false;

        props.onSelect && props.onSelect(props.values[currentIdx - 1].value);
        return false;
      }
      else {
        const key = e.key.toLowerCase();
        let labelIdx = props.values[valueIdx]?.label?.toLowerCase().startsWith(key) ? valueIdx : -1;
        for (let i = labelIdx + 1; i < props.values.length; i++) {
          if (props.values[i]?.label?.toLowerCase().startsWith(key)) {
            labelIdx = i;
            break;
          }
        }

        // We may be focusing the last select element - see if we can find an element from the start
        if (labelIdx === valueIdx)
          for (let i = 0; i < props.values.length; i++) {
            if (props.values[i]?.label?.toLowerCase().startsWith(key)) {
              labelIdx = i;
              break;
            }
          }

        if (labelIdx !== valueIdx)
          props.onSelect && props.onSelect(props.values[labelIdx].value);

        return false;
      }
    }}
  >
    {/* Select Control */}
    <fieldset
      className={`${classes.select} ${hasValueSet && classes.selected} ${props.disabled ? classes.selectDisabled : ''}`}
      onClick={e => {
        if (!!props.disabled)
          return;
        e.preventDefault();
        e.stopPropagation();

        setExpanded(!expanded)
      }}
      onKeyUp={focusHandler}
      role='combobox'
      aria-expanded={expanded}
      tabIndex={props.disabled ? -1 : 0}
    >
      <legend className={classes.label}>{props.label}</legend>

      <div className={`${classes.text} ${props.disabled ? classes.textDisabled : ''}`}>
        {text}
      </div>

      {
        hasValueSet && !props.required &&
        <div
          className={classes.clear}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            props.onSelect && props.onSelect(null);
          }}
          tabIndex={0}
        >
          {IconCancel}
        </div>
      }
    </fieldset>

    {/* PopUp Dialog */}
    {
      expanded &&
      <div
        className={classes.popup}
        aria-hidden={!expanded}
      >
        {
          !props.values?.length && <div className="popup-item">No Options</div>
        }

        {
          !!props.values?.length && props.values.map((v, idx) =>
            <div
              className={`${classes.popupItem} ${idx === valueIdx ? classes.selected : ''}`}
              key={idx}
              role='option'
              onClick={() => {
                if (!!props.onSelect)
                  props.onSelect(v.value);

                setExpanded(false);
              }}>
              {v.label}
            </div>)
        }
      </div>
    }
  </div>;
}

export default Select;