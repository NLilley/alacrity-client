import { Link } from "react-router-dom";

export interface HelpPageProps { }

const HelpPage = (props: HelpPageProps) => {
  const bugEmail = "Bugs@alacrity.com";
  return <section className="page">

    <div className="card">
      <h2>Help and Support</h2>

      <div>
        <h3>Important!</h3>
        If you need urgent help, or if these help pages have not resolved your issue, please contact our support team.
        See <Link to="/contact-us">Our Contact Information</Link> for specific contact details.
      </div>

      <div className="m-v-m">
        These help pages contain tutorials and adivce regarding all aspects of the Alacrity services.
        Please select one of the following for help:
        <ul>
          <li><Link className="clean" to="/not-implemented">Placing and Managing trades</Link></li>
          <li><Link className="clean" to="/not-implemented">Reviewing your account balances and open positions</Link></li>
          <li><Link className="clean" to="/not-implemented">Tracking Deposits and Withdrawals</Link></li>
          <li><Link className="clean" to="/not-implemented">Using our data-visualisation tools to track stock price movements</Link></li>
          <li><Link className="clean" to="/not-implemented">Video trading tutorials</Link></li>
          <li><Link className="clean" to="/not-implemented">A full list of our client services</Link></li>
          <li><Link className="clean" to="/not-implemented">Our Commissions and other Charges</Link></li>
          <li><Link className="clean" to="/not-implemented">ALL OTHER LEARNING MATERIALS</Link></li>
        </ul>
      </div>

    </div>

    <div className="card">
      <h3>Frequently Asked Questions</h3>

      <div className="m-v-m">
        <div>Q: How long after having my account activated can I start trading?</div>
        <div>A: Once you're able to log into your account, you'll immediately be able to fund your account and start trading.</div>
      </div>

      <div className="m-v-m">
        <div>Q: Does Alacrity support trading on Margin?</div>
        <div>A: We do not currently support margin trading. All trades need to be placed with settled funds.</div>
      </div>

      <div className="m-v-m">
        <div>Q: How long do deposits and withdrawals take?</div>
        <div>A: We try to clear deposits and withdrawals as quickly as possible. Typical wait times are 10 minutes, but it is very rare that a deposit takes longer than a day.</div>
      </div>

      <div className="m-v-m">
        <div>Q: Are you planning on expanding Alacrity's instrument selection?</div>
        <div>
          A: Yes! We're currently working to increase the number of single stocks that we offer,
          and are looking to start offering ETF trading. We're expecting to be able to announce these features soon.
          In future, we're also hoping to offer global stocks, and other exciting trading opportunities.
        </div>
      </div>

      <div className="m-v-m">
        <div>Q: Will you be supporting around-the-clock trading?</div>
        <div>
          A: Long term this is a feature that we would love to offer,
          but is currently not being actively developed. Hopefully we will have an
          opportunity to revisit this feature in the not-so distant future.
        </div>
      </div>

      <div className="m-v-m">
        <div>Q: I've spotted a bug. How do I let you know?</div>
        <div>
          A: Oh dear! Please send as detailed an explanation of the issue as you can to <a href={`mailto:${bugEmail}`}>{bugEmail}</a>.
          Please try to include a screenshot of the problem if you can.
        </div>
      </div>

    </div>

  </section>
};

export default HelpPage;