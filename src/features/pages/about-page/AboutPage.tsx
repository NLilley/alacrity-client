export interface AboutPageProps { }

const AboutPage = (props: AboutPageProps) => {
  const feedbackEmail = "feedback@TODO.com";

  return <section className="page">

    <div className="card">
      <h2>Alacrity - Simulated Trading</h2>
      <div>
        Alacrity is a trading app which allows you to place simulated trades on
        a selection of well know American stocks. The value of your virtual holdings will
        update in real time, giving you instant feedback regarding your open positions,
        and aide you in your attempts to grow your account balance.
      </div>

      <h3>App Features:</h3>
      <ul>
        <li>Interactive Dashboard</li>
        <li>Instrument Search</li>
        <li>Confirable Watchlists</li>
        <li>Live streaming prices and indicator data</li>
        <li>Stock trading through both Limit and Market orders</li>
        <li>Trade Nexus showing open positions and historic trades</li>
        <li>Message Hub</li>
        <li>Session aware login system</li>
        <li>Account Management</li>
        <li>Settings Page</li>
      </ul>

      <div>
        This app is no longer under active development, but if you notice a bug,
        or think of an exciting new feature, don't hessitate to drop me a line at:
        &nbsp;<a target="blank" href={`mailto:${feedbackEmail}`}>{feedbackEmail}</a>
      </div>
    </div>

    <div className="card">
      <h3>Technical Details</h3>

      <div className="m-v-m">
        This application is formed of two parts - a C# AspNetCore backend acting as a gateway to the underlying C# trading system,
        and the typescript React/RTK frontend you are currently viewing.
      </div>

      <div className="m-v-m">
        The backend is a relatively simple AspNetCore app taking advantage of most of the built in features,
        with some special session handling. All data is written to an SQLite database for persistent storage.
        Realtime data is delivered to the frontend using Microsoft's signalR websocket framework,
        enabling low latency price information updates.
      </div>

      <div className="m-v-m">
        The frontend is almost entirely hand-rolled React components using TSX/scss modules.
        The main exception is the stokc price charts which are handled by TradingView's
        Lightweight charts library (<a href="https://github.com/tradingview/lightweight-charts">https://github.com/tradingview/lightweight-charts</a>).
        These components are fed with real time simulated data from the C# backend server for all authenticated clients.
      </div>
    </div>

  </section>;
}

export default AboutPage;