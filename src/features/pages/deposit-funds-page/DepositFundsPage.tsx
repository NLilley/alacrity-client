import { useState } from 'react';
import { useDepositMutation } from '../../../app/api/transactionApi';
import Button from '../../../controls/button/Button';
import LoadingBox from '../../../controls/loading-box/LoadingBox';
import NumberInput from '../../../controls/number-input/NumberInput';
import CardInfo from '../../components/dumb/card-info/CardInfo';
import classes from './DepositFundsPage.module.scss';

export interface DepositFundPageProps { }

const DepositFundsPage = (props: DepositFundPageProps) => {
  const [depositAmountStr, setDepositAmountStr] = useState("");
  const [attemptDeposit, depositResult] = useDepositMutation();

  const depositAmount = parseFloat(depositAmountStr);
  const isDepositValid = depositAmountStr.length > 0 && depositAmount > 0;

  if (depositResult.isLoading)
    return <section className='page'>
      <LoadingBox
        content="Processing Deposit"
        height={200}
      />
    </section>;

  return <section className='page'>
    <div className="card">
      <h2>Deposit Funds</h2>

      {
        depositResult.isError && <div className={classes.error}>
          An error occured while processing your deposit request.
          Please contact Alacrity support on support@alacrity.com for more information.
        </div>
      }

      <div className={classes.depositInfo}>
        Please enter the amount you wish to deposit, as well as your account card details below.
        Alacrity endeavors to process all deposits and withdrawals within 24 hours.
      </div>

      <div className={classes.depositInfo}>
        The largest deposit we support in any one transaction is $9,999. The smallest is $1;
      </div>

      <div className={classes.depositAmount}>
        <NumberInput
          label='Deposit Amount'
          value={depositAmountStr}
          min={1}
          max={9999}
          maxDp={2}
          onChange={a => setDepositAmountStr(a)}
          autoFocus
        />
      </div>

      <CardInfo />

      <div className="card-footer">
        <Button
          text='Deposit'
          size='medium'
          disabled={!isDepositValid}
          onClick={() => {
            if (!isDepositValid)
              return;

            attemptDeposit({
              depositAmount: depositAmount,
              cardInfo: {
                // Card Info not used for this demo - use dummy data  
                cardExpiry: "",
                cardHolderName: "",
                cardNumber: "",
                cvc: 0
              }
            });
          }}
        />
      </div>
    </div>
  </section>
}

export default DepositFundsPage;