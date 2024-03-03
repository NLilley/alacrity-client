```
_____________                   __________         
___    |__  /_____ ________________(_)_  /_____  __
__  /| |_  /_  __ `/  ___/_  ___/_  /_  __/_  / / /
_  ___ |  / / /_/ // /__ _  /   _  / / /_ _  /_/ / 
/_/  |_/_/  \__,_/ \___/ /_/    /_/  \__/ _\__, /  
                                          /____/   

                    Alacrity Simulated Trading - Trade with Alacrity
```

Thank you for your interest in my Alacrity Simulated Trading application!

Alacrity is a minimalistic simulated trading application. You are reading through the README for the backend alacrity-client component of this project. It is intended for this project to be used along-side it's companion Backend WebServer.  Please see `AlacrityServer` for more information, including build instructions for the web client.

NOTE: Alacrity is ONLY to be used for demonstrative purposes. Several shortcuts were taken in it's
design and development which are most unsuitable for a production environment!

# Project Overview

Alacrity client is a React/Redux Toolkit Web Application. It provides the front end for the Alacrity paper trading project, and includes the following features:
- Basic account functionality (Login, Logout, Password Management, etc.)
- Real time streaming price data (for simulated instruments)
- Historic candle storage and recovery
- Lightweight Chart visualization integration (https://github.com/tradingview/lightweight-charts)
- Market and Limit Orders
- Trading Notification System
- Accessible UI
- Profit Loss calculation, Portfolio Analysis
- ... And other essential trading functionality

# Build

alacrity-client requires a modern version of node to build (tested with v21.6.0), and uses the yarn package manager.  Once your build environment is prepared, run `yarn install` to fetch all project dependencies,
and then `yarn dev` to fire up the dev server.

If you have any issues, please either raise an issue, or reach out to me for help.

Note: The front-end requires the AlacrityServer backend to be running in order to function.  Please see the AlacrityServer README for further instructions.

# Technology

The web client is fundamentally a TypeScript React WebApp using Redux Toolkit for state management and backend interaction, SignalR for WebSocket real-time data streaming, and Lightweight charts for candlestick visualization.  SASS is used for styling components.  The project uses the vite build system.

# Testing

The web client has little in the way of direct unit tests, but does provide many StoryBook stories documenting expected component behaviour, and aiding component development. To enable the storybook tests, run `yarn storybook` from the client root.

# Structure

The project follows a logical and consistent structure to ensure that navigation and discovery are as effortless as possible.  The main entry point to the application is the main.tsx file, and the majority of client code is located in the `/src` directory.

#### High-Level `/src` Overview:
- app: Contains the core data structures consumed by the app, as well as all redux slices and the majority of the request/response API code.
- controls: Simple, reusable component controls. These are pure, testable components which do not require redux interaction.
- features: Most of the web-apps feature UI components. In particular, all of our content "pages" live in this folder. If you wish to add another feature to the client, this is most likely where you should include it.
- services: A home for the underlying services providing functionality to the entire app. Currently these are exclusively used for handling signalR data streaming.
- shared: A sensible location for shared, globally important files. Mostly css files and other shared resources.
- utils: A collection of basic utility methods.

#### A few more notes on project structure:

- Styles are located alongside their components.
- ... as are StoryBook stories.
- global css variables are located in the global.scss file

# Conclusion

Thanks again for taking the time to review this project!  If you have any questions, don't hesitate to reach out, and happy trading with Alacrity!

\- N