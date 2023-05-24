import classes from './TradeRecipt.module.scss';
import { OrderKind } from "../../../app/enums/order/orderKind";
import { TradeDirection } from "../../../app/enums/tradeDirection";
import Modal from "../../../controls/modal/Modal";
import Button from '../../../controls/button/Button';

export interface TradeReceiptProps {
  onClose: () => void,
  onViewTradeInput: () => void,
  onViewTradeNexus: () => void
}

const TradeReceipt = (props: TradeReceiptProps) => {
  return <Modal
    header={'Trade Receipt'}
    onClose={props.onClose}
  >
    <div className={classes.wrapper}>
      <div>Your order has been received.</div>

      <div className={classes.actions}>
        <Button kind="sub" text='Return to Trade Input' onClick={props.onClose} />
        <Button text='View Trade Nexus' onClick={props.onViewTradeNexus} />
      </div>
    </div>

  </Modal>;
}

export default TradeReceipt;