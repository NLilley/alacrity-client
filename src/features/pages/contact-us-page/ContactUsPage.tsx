import { Link } from "react-router-dom";

export interface ContactUsPageProps { }

const ContactUsPage = (props: ContactUsPageProps) => {
  const tradingEmail = "Trading@alacrity.com";
  const accountEmail = "Account@alacrity.com";
  const supportEmail = "Support@alacrity.com"

  return <section className="page">
    <div className="card">
      <h2>Contact Us</h2>

      <div>
        There are many ways that you can get in touch.
        We have three specialised support teams who can help you with any issue you might be having with the Alacrity app or your Alacrity account.
        See below to discover which of these is best suited to your particular problem. Alternatively, you may wish to view our <Link to="/help">Help Section</Link> which 
        includes guidance on how to use the app, as well as an in-depth FAQ addressing the difficulties that customers most often experience.
      </div>

      <div>
        <h3>Trading Support</h3>
        <div>

          For help with placing trades or for any other trading related please, please contact our trading team at <Link to={`mailto:${tradingEmail}`}>Trading Support</Link>.
          The trading team have a decades of experience trading in the financial markets and will do their utmost to resolve any trade related issues that you have.
        </div>
        <Link to={`mailto:${tradingEmail}`}>{tradingEmail}</Link>
      </div>

      <div>
        <h3>Account Support</h3>
        <div>
          If you're having an urgent issue with any aspect of your account, including deposits, withdrawals or general authentication problems, please contact <Link to={`mailto:${accountEmail}`}>Account Support</Link>.
          Our Account team are available around-the-clock, and will respond to your query as soon as possible.
        </div>
        <Link to={`mailto:${accountEmail}`}>{accountEmail}</Link>
      </div>

      <div>
        <h3>General Support</h3>
        <div>
          For all other issues, please contact general support at <Link to={`mailto:${supportEmail}`}>General Support</Link>.
          Our support team are always happy to hear from customers, and will help set you back on the right path.
        </div>
        <Link to={`mailto:${supportEmail}`}>{supportEmail}</Link>
      </div>
    </div>
  </section >
};

export default ContactUsPage;