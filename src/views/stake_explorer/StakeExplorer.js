import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Stake from './Stake';
import Header from '../header/Header';
import { useSnackbar } from 'notistack';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, CircularProgress, Divider, Grid, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import StatCard from './TotalsCard';
import { BASE_URL } from '../../constants';

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--text-secondary-color)"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--text-secondary-color)"
        }
    }
});

const StakeExplorer = props => {
    const classes = useStyles();

    const [tabValue, setTabValue] = useState(0);
    const [activeStakes, setActiveStakes] = useState([])
    const [completedStakes, setCompletedStakes] = useState([])
    const [address, setAddress] = useState('')
    const [totals, setTotals] = useState(null);
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const ADDR = props.match.params.address
        if (ADDR) {
            setAddress(ADDR)
            getStakes(ADDR)
        }
    
    // eslint-disable-next-line
    }, [])

    const _error = message => {
        enqueueSnackbar(message, {
            variant: 'error',
            autoHideDuration: 3000,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            }
        })
    }

    const _getActiveStakes = addr => {
        return new Promise(async (resolve, reject) => {
            fetch(`${BASE_URL}/staking/stakes/active/${addr}`).then(result => {
                result.json().then(res => {
                    resolve(res);
                })
            }).catch(err => {
                _error("There was an error pulling active stakes.")
                reject(err)
            })
        })
    }

    const _getCompleteStakes = addr => {
        return new Promise(async (resolve, reject) => {
            fetch(`${BASE_URL}/staking/stakes/complete/${addr}`).then(result => {
                result.json().then(res => {
                    resolve(res);
                })
            }).catch(err => {
                _error("There was an error pulling completed stakes.")
                reject(err)
            })
        })
    }

    const getStakes = async (addr) => {
        if (addr.length === 0) {
            _error("Invalid Ethereum Address.")
            setLoading(false)
            return;
        }

        if (!Web3.utils.isAddress(addr)) {
            _error("Invalid Ethereum Address.");
            return;
        }

        try {
            setLoading(true);
            const ADDRESS = Web3.utils.toChecksumAddress(addr)
            const STAKES = await Promise.all([
                _getActiveStakes(ADDRESS),
                _getCompleteStakes(ADDRESS)
            ])

            setDone(true);
            setTotals(STAKES[0].totals);
            setCompletedStakes(STAKES[1].sort((a, b) => b.end - a.end));
            setActiveStakes(STAKES[0].stakes.sort((a, b) => a.end - b.end));
        }
        catch (err) { console.log(err) }
        finally { setLoading(false) }
    }

    return (
        <div>
            <Header />

            <div style={{ padding: '2%', paddingBottom: 0 }}>
                <Typography variant="h4" align="center" color="primary" style={{ fontWeight: '100' }}>Axion Stake Explorer</Typography>
                <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }} align="center">Enter an Ethereum address to view its stakes.</Typography>
                <br/>
               
                <Grid container alignItems="center" justify="center" spacing={2}>
                    <Grid item md={4} sm={6} xs={8}>
                        <TextField 
                            InputLabelProps={{ style: { color: "var(--text-primary-color)"}}} 
                            className={classes.root} 
                            inputProps={{ style: { color: 'var(--text-primary-color)' } }} 
                            color="secondary" 
                            onChange={ev => setAddress(ev.target.value.trim())} 
                            value={address} 
                            fullWidth 
                            variant="outlined" 
                            margin="dense" 
                            title="Ethereum Address" 
                            label="Ethereum Address" 
                        />
                    </Grid>
                    <Grid item md={1}>
                        <Button disabled={loading} onClick={() => getStakes(address)} variant="contained" fullWidth color="primary">{loading ? <CircularProgress color="secondary" size={20} /> : "Go"}</Button>
                    </Grid>
                </Grid>

                <br/>
                
                {loading && (
                    <div style={{margin: '0 auto', textAlign: 'center'}}>
                        <CircularProgress color="primary" size={40} />
                    </div>
                )}

                {!loading && done && (<>
                    <br/>
                    <Grid container alignItems="center" justify="center" spacing={4}>
                        <Grid item lg={4} md={6} xs={10}>
                            <StatCard stat="Axion Staked" suffix="AXN" amount={totals.total_axn} />
                        </Grid>
                        <Grid item lg={4} md={6} xs={10}>
                            <StatCard stat="Total Shares" amount={totals.total_shares} />
                        </Grid>
                        <Grid item lg={4} md={6} xs={10}>
                            <StatCard stat="Pool Share Size" suffix="%" tooltip={`Your Shares (${totals.total_shares.toLocaleString()}) / Total Shares (${totals.global_shares.toLocaleString()})`} amount={(totals.total_shares / totals.global_shares * 100)} percent={true} />
                        </Grid>
                    </Grid>
                    <br/>
                    <Divider variant="middle"/>
                    <AppBar position="static" color="primary" style={{borderRadius: '3px'}}>
                        <Tabs variant="fullWidth" value={tabValue} onChange={(ev, nv) => setTabValue(nv)}>
                            <Tab label="Active Stakes" />
                            <Tab label="Completed Stakes" />
                        </Tabs>
                    </AppBar>

                    <br/>
                    
                    <Grid container alignItems="center" justify="center" spacing={2}>
                        {tabValue === 0 ? activeStakes.map((s, idx) => <Grid key={idx} item xs={12}><Stake {...s} type="stake" /></Grid>) : completedStakes.map((s, idx) => <Grid key={idx} item xs={12}><Stake {...s} type="complete" /></Grid>)}
                    </Grid>
                </>)}
            
            </div>
        </div>
    )
}

export default StakeExplorer;