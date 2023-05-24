import { useEffect, useRef } from 'react';
import classes from './Modal.module.scss';
import { focusHandler } from '../../utils/accessibilityUtil';
import ReactDOM from 'react-dom';

export interface ModalProps {
  header?: string,
  onClose?: () => void
}

let modalsDiv: any = null;
const Modal = (props: React.PropsWithChildren<ModalProps>) => {
  const dialogRef = useRef(null) as any;
  useEffect(() => {
    const html = document.querySelector('html');
    const dialog = dialogRef.current;
    html!.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      html!.style.overflow = 'unset';
    };
  }, []);

  const renderHeader = !!props.header || !!props.onClose;
  modalsDiv ??= document.getElementById('modals');
  return ReactDOM.createPortal(
    <dialog
      ref={dialogRef}
      className={classes.dialog}
      onClose={() => props.onClose && props.onClose()}
    >
      {
        renderHeader && <div className={classes.header}>
          <div role="heading">{props.header && props.header}</div>
          {props.onClose && <div className={classes.close} onKeyUp={focusHandler} onClick={props.onClose} tabIndex={0}>⨉</div>}
        </div>
      }
      {props.children}
    </dialog>,
    modalsDiv
  );
};

export default Modal;