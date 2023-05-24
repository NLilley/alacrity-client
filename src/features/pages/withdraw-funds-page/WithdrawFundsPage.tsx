import { useState } from 'react';
import { useWithdrawalMutation } from '../../../app/api/transactionApi';
import Button from '../../../controls/button/Button';
import LoadingBox from '../../../controls/loading-box/LoadingBox';
import NumberInput from '../../../controls/number-input/NumberInput';
import CardInfo from '../../components/dumb/card-info/CardInfo';
import classes from './WithdrawFundsPage.module.scss';

export interface WithdrawFundsPage { }

const WithdrawFundsPage = (props: WithdrawFundsPage) => {
  const [withdrawalAmountStr, setWithdrawalAmountStr] = useState("");
  const [attemptWithdrawal, withdrawalResult] = useWithdrawalMutation();

  const withdrawalAmount = parseFloat(withdrawalAmountStr);
  const isWithdrawalValid = withdrawalAmountStr.length > 0 && withdrawalAmount > 0;

  if (withdrawalResult.isLoading)
    return <section className='page'>
      <LoadingBox
        content="Processing Withdrawal"
        height={200}
      />
    </section>;

  return <section className='page'>
    <div className="card">
      <h2>Withdraw Funds</h2>

      {
        withdrawalResult.isError && <div className={classes.error}>
          An error occured while processing your withdrawal request.
          Please contact Alacrity support on support@alacrity.com for more information.
        </div>
      }

      <div className={classes.withdrawInfo}>
        Please enter the amount you wish to withdraw, as well as your account card details below.
        Alacrity endeavors to process all deposits and withdrawals within 24 hours.
      </div>

      <div className={classes.withdrawInfo}>
        The largest withdrawal we support in any one transaction is $9,999. The smallest is $1;
      </div>

      <div className={classes.withdrawAmount}>
        <NumberInput
          label='Withdrawal Amount'
          value={withdrawalAmountStr}
          min={1}
          max={9999}
          maxDp={2}
          onChange={a => setWithdrawalAmountStr(a)}
          autoFocus
        />
      </div>

      <CardInfo />

      <div className="card-footer">
        <Button
          text='Withdraw'
          size='medium'
          disabled={!isWithdrawalValid}
          onClick={() => {
            if (!isWithdrawalValid)
              return;

            attemptWithdrawal({
              withdrawalAmount: withdrawalAmount,
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

export default WithdrawFundsPage;