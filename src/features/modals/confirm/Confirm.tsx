import classes from './Confirm.module.scss';
import Modal from "../../../controls/modal/Modal"
import Button from '../../../controls/button/Button';
import { PropsWithChildren } from 'react';

export interface ConfirmProps {
  header?: any,
  confirmText?: string,
  cancelText?: string,
  onConfirm: () => void,
  onCancel: () => void,
  autofocus?: boolean
}

export const Confirm = (props: PropsWithChildren<ConfirmProps>) => {
  return <Modal
    header={props.header}
    onClose={props.onCancel}
  >
    <div className={classes.wrapper}>
      {props.children}
      <div className={classes.actions}>
        <Button kind="sub" text={props.cancelText ?? "No"} onClick={props.onCancel} autoFocus={props.autofocus ?? true}/>
        <Button text={props.confirmText ?? "Yes"} onClick={props.onConfirm} />
      </div>

    </div>
  </Modal>
}