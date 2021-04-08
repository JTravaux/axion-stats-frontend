import React, { useEffect, useMemo, useState } from 'react';
import Header from '../header/Header.js';
import { Button, Card, CircularProgress, Grid, Typography } from '@material-ui/core';
import { useSortBy, useTable, usePagination } from 'react-table';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import TableControls from './TableControls.js';
import Web3 from 'web3';
import STAKING_ABI from './ABI/Staking.json';
import STAKING_V1_ABI from './ABI/StakingV1.json';
import { STAKING_ADDRESS, STAKING_V1_ADDRESS, LAST_V1_SESSION } from '../../constants';

const VCA_REG = () => {
    const [data, setData] = useState([]);
    const [web3, setWeb3] = useState(null);
    const [doingWork, setDoingWork] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [v1Done, setV1Done] = useState(false);
    const [v2Done, setV2Done] = useState(false);
    const [events, setEvents] = useState(null)

    const {
        rows,
        page,
        gotoPage,
        nextPage,
        pageCount,
        prepareRow,
        setPageSize,
        pageOptions,
        canNextPage,
        previousPage,
        headerGroups,
        canPreviousPage,
        state: { pageIndex, pageSize }
    } = useTable({
        initialState: {
            pageIndex: 0, 
            pageSize: 10, 
            sortBy: [{ id: 'id', desc: true }] 
        },
        data: useMemo(() => data, [data]),
        columns: useMemo(() => [
            { Header: 'Address', accessor: 'account' },
            { Header: 'Total Shares from Stakes', accessor: 'totalShares', width: 2 },
            { Header: 'Total Shares from Contract', accessor: 'totalSharesOf', width: 2 }
        ], []),
    }, useSortBy, usePagination)

    const tableProps = {
        rows,
        page,
        gotoPage,
        pageSize,
        nextPage,
        pageIndex,
        pageCount,
        setPageSize,
        pageOptions,
        canNextPage,
        previousPage,
        canPreviousPage,
    }

    useEffect(() => {
        if (Web3.givenProvider) {
            const web3 = new Web3(Web3.givenProvider);
            setWeb3(web3);
            setStatus("waiting...")
        } else
            setStatus("Can't access Web3.givenProvider. Please use a browser that has metamask installed.")
    }, [])

    const getV2StakeUnstakeEvents= async () => {
        setDoingWork(true);
        const STAKING_CONTRACT = new web3.eth.Contract(STAKING_ABI, STAKING_ADDRESS);

        // Stake Events
        const ALL_V2_STAKE_EVENTS = await _getEvents("Stake", STAKING_CONTRACT)
        const v2_stake_events = ALL_V2_STAKE_EVENTS.filter(ev => +ev.returnValues.sessionId > LAST_V1_SESSION).sort((a, b) => +a.returnValues.sessionId - +b.returnValues.sessionId)
        setEvents({ ...events, v2_stake_events })

        // Unstake EVents
        const ALL_V2_UNSTAKE_EVENTS = await _getEvents("Unstake", STAKING_CONTRACT)
        const v2_unstake_events = ALL_V2_UNSTAKE_EVENTS.sort((a, b) => +a.returnValues.sessionId - +b.returnValues.sessionId)
        setEvents({ ...events, v2_stake_events, v2_unstake_events })

        // Cleanup
        setV2Done(true)
        setDoingWork(false);
        setStatus('Waiting...');
    }

    const getV1StakeUnstakeEvents = async () => {
        setDoingWork(true);

        const STAKING_V1_CONTRACT = new web3.eth.Contract(STAKING_V1_ABI, STAKING_V1_ADDRESS);
        const V1_START_BLOCK = 11248075;
        const V1_END_BLOCK = 11472614;

        // Stake Events
        const ALL_V1_STAKE_EVENTS = await _getEvents("Stake", STAKING_V1_CONTRACT, V1_START_BLOCK, V1_END_BLOCK);
        const v1_stake_events = ALL_V1_STAKE_EVENTS.filter(ev => +ev.returnValues.sessionId <= LAST_V1_SESSION).sort((a, b) => +a.returnValues.sessionId - +b.returnValues.sessionId)
        setEvents({...events, v1_stake_events})

        // Unstake EVents
        const ALL_V1_UNSTAKE_EVENTS = await _getEvents("Unstake", STAKING_V1_CONTRACT, V1_START_BLOCK, V1_END_BLOCK);
        const v1_unstake_events = ALL_V1_UNSTAKE_EVENTS.sort((a, b) => +a.returnValues.sessionId - +b.returnValues.sessionId)
        setEvents({ ...events, v1_stake_events, v1_unstake_events })

        // Cleanup
        setV1Done(true);
        setDoingWork(false);
        setStatus('Waiting...');
    }
    
    const _getEvents = async (
        type = 'Stake',
        contract,
        startBlock = 11472615, // v2 start
        endBlock = "latest",
        step = 1000,
    ) => {
        let fromBlock = startBlock;
        let toBlock = endBlock;
        const between = endBlock - startBlock;

        if (between > step) {
            toBlock = startBlock + step;
        }

        setStatus(`Getting ${type} Events from ${contract.options.address}...`)

        let events = [];
        while (toBlock <= endBlock) {
            try {
                const queriedEvents = await contract.getPastEvents(type, { fromBlock, toBlock });

                events = [...events, ...queriedEvents];

                fromBlock = toBlock + 1;
                toBlock = fromBlock + step;

                if (toBlock > endBlock && fromBlock < endBlock) {
                    toBlock = endBlock;
                }

                setStatus(`Getting ${type} Events from ${contract.options.address}... Count: ${events.length}`)
            } catch (error) {
                console.log(error);
            }
        }

        return events;
    };

    const saveEvents = type => {
        const fileData = JSON.stringify(events[type], null, 2);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${type}.json`;
        link.href = url;
        link.click();
    }

    const getActiveStakes = async (stakes, unstakes) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const active_stake_events = stakes.filter(s => !unstakes.find(u => u.sessionID === s.sessionID))
                resolve(active_stake_events)
            }, 1000)
        })
    }

    const getActiveStakeEvents = async () => {
        setDoingWork(true);
        setStatus("Determining active stakes...");

        const stakeEvents = events.v1_stake_events.concat(events.v2_stake_events).map(s => { return { sessionID: +s.returnValues.sessionId, address: s.returnValues.account }});
        const unstakeEvents = events.v1_unstake_events.concat(events.v2_unstake_events).map(s => { return { sessionID: +s.returnValues.sessionId, address: s.returnValues.account }});
        const active_stake_events = await getActiveStakes(stakeEvents, unstakeEvents);

        let sessions_by_address = {}
        for (let i = 0; i < active_stake_events.length; ++i) {
            const current = active_stake_events[i];
            const address = current.address;
            const session = current.sessionID;

            if (sessions_by_address[address])
                sessions_by_address[address].push(session)
            else
                sessions_by_address[address] = [session]
        }


        setEvents({ ...events, active_stake_events, sessions_by_address });

        setDoingWork(false);
        setStatus("Waiting...");
    }

    return (
        <div>
            <Header/>

            <div style={{ margin: '2% auto' }}>
                <Typography variant="h4" align="center" color="secondary" style={{ fontWeight: '100' }}>Get All Staker Details</Typography>
            </div>

            {doingWork && (
                <div style={{ margin: '2% auto' }}>
                    <center>
                        <CircularProgress color="primary" size={30} />
                    </center>
                </div>
            )}

            <div style={{ padding: '0 2%', margin: '0 auto', marginBottom: '2%', width: '25%' }}>
                <center>
                    <Typography align="center">Status: {status}</Typography>
                    <br/>
                    <Button disabled={doingWork || !web3 || v1Done} onClick={() => getV1StakeUnstakeEvents()} fullWidth variant="contained" color="primary">Get V1 Stake/Unstake Events</Button>
                    <br /><br />
                    <Button disabled={doingWork || !web3 || v2Done} onClick={() => getV2StakeUnstakeEvents()} fullWidth variant="contained" color="primary">Get V2 Stake/Unstake Events</Button>
                    <br /><br />
                    <Button disabled={doingWork || !web3 || !v2Done || !v1Done} onClick={() => getActiveStakeEvents()} fullWidth variant="contained" color="primary">Get Active Stake Events</Button>
                </center>
            </div>

            {data.length > 0 && (
                <div style={{ padding: '0 2%', margin: '0 auto', marginBottom: '2%' }}>
                    {/* H E A D E R */}
                    {headerGroups.map(({ headers }) => (
                        <Grid container key="container" justify="space-between" className="tableControls">
                            {headers.map((header, idx) => (
                                <Grid item container direction="row" xs={2} key={header + " " + idx} alignItems="center" justify="center">
                                    <Grid item>
                                        <Typography variant="subtitle1" {...header.getHeaderProps(header.getSortByToggleProps())} style={{ color: '#FFF', cursor: 'pointer' }} >{header.Header}</Typography>
                                    </Grid>

                                    <Grid item>
                                        {header.isSorted
                                            ? header.isSortedDesc
                                                ? <KeyboardArrowDownIcon style={{ fontSize: '20px', marginLeft: '5px', color: "#FFF" }} />
                                                : <KeyboardArrowUpIcon style={{ fontSize: '20px', marginLeft: '5px', color: "#FFF" }} />
                                            : ''}
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    ))}

                    {/* A U C T I O N S */}
                    {loading && (
                        <div style={{ margin: '5% auto' }}>
                            <center>
                                <CircularProgress color="primary" size={30} />
                            </center>
                        </div>
                    )}

                    {page.map((row, idx) => {
                        prepareRow(row)
                        const NOW = Date.now()
                        const CURRENT = NOW > Number(row.values.start) * 1000 && NOW < Number(row.values.end) * 1000;
                        return (
                            <Card elevation={6} key={row.id} className="stakeRow" style={{ margin: '1% 0', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0.05)', border: CURRENT ? "2px solid var(--primary-main-color)" : "" }}>
                                <Grid container justify="space-between" key={row.id} alignItems="center">
                                    <Grid item>
                                        <Typography color="textPrimary" variant="subtitle2" align="center">
                                            {row.values.address}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography color="textPrimary" variant="subtitle2" align="center">
                                            {row.values.totalShares}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography color="textPrimary" variant="subtitle2" align="center">
                                            {row.values.totalSharesOf}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        )
                    })}

                    <TableControls {...tableProps} />
                </div>
            )}

            {events && (
                <div style={{ textAlign: 'center', margin: '2% auto' }}>
                    <Typography variant="h6">Data Downloads</Typography><br />
                    {events.v1_stake_events && <><Button variant="outlined" onClick={() => saveEvents("v1_stake_events")}>Save V1 Stake Events ({events.v1_stake_events.length})</Button>&nbsp;</>}
                    {events.v1_unstake_events && <><Button variant="outlined" onClick={() => saveEvents("v1_unstake_events")}>Save V1 UnStake Events ({events.v1_unstake_events.length})</Button>&nbsp;</>}
                    {events.v2_stake_events && <><Button variant="outlined" onClick={() => saveEvents("v2_stake_events")}>Save V2 Stake Events ({events.v2_stake_events.length})</Button>&nbsp;</>}
                    {events.v2_unstake_events && <Button variant="outlined" onClick={() => saveEvents("v2_unstake_events")}>Save V2 UnStake Events ({events.v2_unstake_events.length})</Button>}

                    <br/><br/>
                    {events.active_stake_events && <Button variant="outlined" onClick={() => saveEvents("active_stake_events")}>Save Active Stakes ({events.active_stake_events.length})</Button>}
                    {events.sessions_by_address && <Button variant="outlined" onClick={() => saveEvents("sessions_by_address")}>Save Sessions by Address ({Object.keys(events.sessions_by_address).length})</Button>}
                </div>
            )}
            
        </div>
    )
}

export default VCA_REG;