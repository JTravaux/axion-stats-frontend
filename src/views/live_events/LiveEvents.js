import { Card, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Header from '../header/Header'
import STAKING_ABI from './STAKING_ABI.json';
import moment from 'moment';
import LinkIcon from '@material-ui/icons/Link';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const EXAMPLE_EVENT = {
    time: Date.now(),
    address: "0xJUST_AN_EXAMPLE_ADDRESS",
    stakeNum: "12345",
    amount: 100000000000000000000000000,
    start: 1607882427,
    end: 1607982427,
    shares: 110000000000000000000000000,
    block: 1234567,
    type: "Stake"
}

const LiveEvents = () => {
    const [liveEvents, setLiveEvents] = useState([EXAMPLE_EVENT]);
    const [pastEvents, setPastEvents] = useState([]);
    const [connected, setConnected] = useState(null);
    
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

    useEffect(() => {
        const web3 = new Web3(Web3.givenProvider || "wss://mainnet.infura.io/ws/v3/cd05a2c3e5a1409f9bbbdd69d48d9895");
        const STAKING_CONTRACT = new web3.eth.Contract(STAKING_ABI, "0x1920d646574E097c2c487F69F40814F95d45bf8C");

        STAKING_CONTRACT.events.allEvents({}, (err, ev) => {
            if (ev.event === "Stake" || ev.event === "Unstake") {
                console.log(ev)
                setLiveEvents([_formatEvent(ev), ...liveEvents])
            }
        })
        .on("connected", id => setConnected(id))
    }, [])

    // const openEtherscan = addr => window.open(`https://etherscan.io/address/${addr}`, "_blank")
    const openTx = tx => window.open(`https://etherscan.io/tx/${tx}`, "_blank")

    return (
        <div>
            <Header />

            <div style={{width: '55%', margin: '1% auto'}}>
                <div style={{backgroundColor: 'var(--primary-main-color)', padding: '1%', margin: '1%', borderRadius: '5px'}}>
                    <Typography variant="subtitle1" align="center" style={{ color: 'white'}}>
                        This page will automatically update as new Stakes and Unstakes happen&nbsp;
                        <Tooltip title="Waiting for events..." classes={{ tooltip: 'tooltip' }} placement="right">
                            <RadioButtonCheckedIcon style={{ color: connected ? '#2DC574' : 'red', fontSize: '13px', cursor: 'pointer' }} />
                        </Tooltip>
                    </Typography>
                    <Typography variant="subtitle2" align="center" style={{fontWeight: '400', color: 'white'}}>BETA! Expect bugs.</Typography>
                </div>
  
                {liveEvents.map((s, idx) => (
                    <Card key={idx} style={{ margin: '1%', padding: '1%', border: '1px solid var(--secondary-main-color)', textAlign: 'center' }} elevation={12}>
                        <Grid container justify="space-between" alignItems="center">
                            <Grid container item xs={3} justify="space-between" alignItems="center">
                                <Grid item xs={2}>
                                    <Typography variant="subtitle1" color="primary" style={{ fontWeight: '500' }}>{s.type}</Typography>
                                </Grid>
                                <Grid item container>
                                    <Grid item>
                                        <Typography variant="subtitle2" className="textLink" style={{ fontStyle: 'italic' }} onClick={() => openTx(s.txid)}>{moment(s.time).fromNow()}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <LinkIcon fontSize="small" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="subtitle1">{(s.amount / 1000000000000000000).toLocaleString()} AXN</Typography>
                                <Typography variant="subtitle2">Amount</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="subtitle1">{(s.shares / 1000000000000000000).toLocaleString()}</Typography>
                                <Typography variant="subtitle2">Shares</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="subtitle1">{moment.unix(s.end).diff(moment.unix(s.start), 'days')}</Typography>
                                <Typography variant="subtitle2">Days</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <div>
                                    <Tooltip title="View on Etherscan">
                                        <IconButton onClick={() => openTx(s.txid)}>
                                            <OpenInNewIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default LiveEvents;