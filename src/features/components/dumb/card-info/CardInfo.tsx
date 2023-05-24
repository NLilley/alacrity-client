import classes from './CardInfo.module.scss';
import { CardInfo as CardInfoModel } from '../../../../app/models/cardInfo';

export interface CardInfoProps {
  cardInfo?: CardInfoModel
}

const CardInfo = (props: CardInfoProps) => {
  // Just use dummy information for now
  return <div className={classes.cardInfo}>
    <div>
      <fieldset className={classes.cardholderName}>
        <legend>Cardholder Name</legend>
        <input disabled className="disabled" value={"Mr. Dummy Account"} tabIndex={0} />
      </fieldset>
    </div>
    <fieldset className={classes.cardNumber}>
      <legend>Card Number</legend>
      <input disabled className="disabled" value={"1111 - 2222 - 3333 - 4444"} tabIndex={0} />
    </fieldset>
    <div>
      <fieldset className={classes.cvc}>
        <legend>CVC</legend>
        <input disabled className="disabled" value={"123"} tabIndex={0} />
      </fieldset>
      <fieldset className={classes.expiry}>
        <legend>Expiry</legend>
        <input disabled className="disabled" value={"12 / 29"} tabIndex={0} />
      </fieldset>
    </div>



  </div>
}

export default CardInfo;