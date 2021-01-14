import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Home from './home';
import theme from './theme';
import LiveEvents from './views/live_events/LiveEvents';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auctions from './views/auctions/Auctions';
import StakeExplorer from './views/stake_explorer/StakeExplorer';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <Switch>
              <Route path="/auctions" component={Auctions}/>
              <Route path="/events" component={LiveEvents} />
              <Route path="/stakes/:address?" component={StakeExplorer}/>
              <Route path="/" component={Home}/>
            </Switch>
          </Router>
        </CssBaseline>
      </MuiThemeProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
