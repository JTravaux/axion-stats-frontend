import { Card, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Header from '../header/Header'
import STAKING_ABI from './STAKING_ABI.json';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { STAKING_ADDRESS, BASE_URL } from '../../constants';
import Event from './Event';
import moment from 'moment';

const FIVE_MINUTES = 300000;
const LiveEvents = () => {
    const [status, setStatus] = useState('');
    const [liveEvents, setLiveEvents] = useState([]);
    const [connected, setConnected] = useState(null);

    const [pastEvents, setPastEvents] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(Date.now());

    const [pastEventsUpdater, setPastEventsUpdater] = useState(null);

    const _formatEvent = ev => {
        return {
            time: Date.now(),
            type: ev.event,
            txid: ev.transactionHash,
            address: ev.returnValues.account,
            stakeNum: ev.returnValues.sessionId,
            amount: ev.returnValues.amount,
            start: ev.returnValues.start,
            end: ev.returnValues.end,
            shares: ev.returnValues.shares,
            block: ev.blockNumber 
        }
    }

    const _getPastEvents = async (num = 10) => {
        let res = await fetch(`${BASE_URL}/staking/latest-events/${num}`);
        let res_json = await res.json();
        setPastEvents(res_json);
        setLastUpdated(Date.now())

        if (!pastEventsUpdater) {
            const updater = setInterval(async () => {
                let res = await fetch(`${BASE_URL}/staking/latest-events/${num}`);
                let res_json = await res.json();
                setPastEvents(res_json);
                setLastUpdated(Date.now())
            }, FIVE_MINUTES)
            setPastEventsUpdater(updater)
        }
    }

    useEffect(() => {
        const web3 = new Web3(Web3.givenProvider);
        const STAKING_CONTRACT = new web3.eth.Contract(STAKING_ABI, STAKING_ADDRESS);
        _getPastEvents(15);

        STAKING_CONTRACT.events.allEvents({}, (err, ev) => {
            if(!err) {
                if (ev.event === "Stake" || ev.event === "Unstake") {
                    console.log(ev)
                    setLiveEvents([_formatEvent(ev), ...liveEvents])
                }
            } else {
                if (err.message === "No provider set.")
                    setStatus(`${err.message} Please use a Web3 enabled browser, or enable the metamask estension.`)
                else
                    setStatus(err.message)
            }
        })
        .on("connected", id => setConnected(id))

        return () => { clearInterval(pastEventsUpdater) }
    }, [])

    const openTx = tx => window.open(`https://etherscan.io/tx/${tx}`, "_blank")

    return (
        <div>
            <Header />
            <div style={{margin: '1%'}}>
                <Grid container justify="space-evenly" spacing={2}>
                    <Grid item md={6} xs={12}>
                        <Card className="accordianHues" style={{ padding: '1%', margin: '1%', borderRadius: '5px' }} elevation={12}>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="subtitle1" color="primary" style={{fontWeight: 'bold'}}>Live Events</Typography>
                                    <Typography variant="subtitle2" color="secondary">This section will automatically update as new stakes and unstakes happen.</Typography>
                                </Grid>
                                <Grid item>
                                    <Tooltip title={connected ? "Connected! Waiting for events..." : "Connecting..."} classes={{ tooltip: 'tooltip' }} placement="right">
                                        <RadioButtonCheckedIcon style={{ color: connected ? '#2DC574' : 'red', fontSize: '13px', cursor: 'pointer' }} />
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Card>

                        {liveEvents.map((s, idx) => <Event {...s} key={`live_${idx}`} />)}
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Card className="accordianHues" style={{ padding: '1%', margin: '1%', borderRadius: '5px' }} elevation={12}>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="subtitle1" color="primary" style={{ fontWeight: 'bold' }}>Past Events</Typography>
                                    <Typography variant="subtitle2" color="secondary">Here are the most recent past events. The data automatically updates every 5 minutes.</Typography>
                                </Grid>
                                <Grid item>
                                    <Tooltip title={pastEventsUpdater ? `Last updated: ${moment(lastUpdated).format("h:mm a")}` : "Getting past events..."} classes={{ tooltip: 'tooltip' }} placement="right">
                                        <RadioButtonCheckedIcon style={{ color: pastEventsUpdater ? '#2DC574' : 'red', fontSize: '13px', cursor: 'pointer' }} />
                                    </Tooltip>
                                </Grid>
                            </Grid>                          
                        </Card>

                        {pastEvents.map((s, idx) => <Event {...s} key={`past_${idx}`} />)}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default LiveEvents;