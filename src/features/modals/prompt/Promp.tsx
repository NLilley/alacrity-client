import { useState } from 'react';
import TextInput from '../../../controls/text-input/TextInput';
import { Confirm } from '../confirm/Confirm';

export interface PromptProps {
  header?: any,
  inputLabel: any,
  confirmText?: string,
  cancelText?: string,
  onConfirm: (inputText: string) => void,
  onCancel: () => void
}

export const Prompt = (props: PromptProps) => {
  const [inputText, setInputText] = useState('');
  return <Confirm
    header={props.header}
    confirmText={props.confirmText}
    cancelText={props.cancelText}
    onConfirm={() => props.onConfirm(inputText)}
    onCancel={props.onCancel}
    autofocus={false}
  >
    <TextInput
      label={props.inputLabel}
      value={inputText}
      onChange={newInputText => setInputText(newInputText)}
      onKeyDown={(e: any) => {
        if (e.key == 'Enter')
          props.onConfirm(inputText);
      }}
      autoFocus
    />
  </Confirm>;
}

export default Prompt;