import React from 'react';
import moment from 'moment';
import StatCard from './MarketStatCard.js';
import { Grid, Switch, Typography, FormControlLabel } from '@material-ui/core';
import Logo from '../../assets/img/logo.png';

const MarketStats = ({ marketData, toggleAutoUpdating, stakingData }) => {
    return (
        <div style={{ padding: '2%', paddingBottom: 0 }}>

            <center>
                <img src={Logo} width={65} alt="logo"/>
            </center>
            
            <Typography variant="h4" align="center" color="secondary" style={{ fontWeight: '100' }}>Market Stats</Typography>

            <center>
                <FormControlLabel labelPlacement="start" control={<Switch size="small" checked={marketData.autoUpdating} onChange={toggleAutoUpdating} />} label={<Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }}>Automatically update stats</Typography>} />
                <br/>

                {marketData.lastUpdated && (
                    <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }}>
                        Last Updated: {moment(marketData.lastUpdated).format("h:mm:ss a")}
                    </Typography>
                )}
            </center>

            <div style={{ margin: '2%' }}>
                <Grid container justify="space-evenly" spacing={3}>
                    <Grid item lg={3} md={6} xs={10} key="USDTPrice">
                        <StatCard loading={Boolean(!marketData.usdtPerAxn)} stat="Current Price" amount={`$${marketData.usdtPerAxn}`} suffix="USDT" />
                    </Grid>
                    <Grid item lg={3} md={6} xs={10} key="pricePerETH">
                        <StatCard loading={Boolean(!marketData.axnPerEth)} stat="Axion Per ETH" amount={Number(marketData.axnPerEth).toLocaleString()} suffix="AXN"/>
                    </Grid>
                    <Grid item lg={3} md={6} xs={10} key="circSupply">
                        <StatCard loading={Boolean(!marketData.circSupply)} stat="Circulating Supply" amount={Number(marketData.circSupply).toLocaleString()} suffix="AXN"/>
                    </Grid>
                    <Grid item lg={3} md={6} xs={10} key="totalSupply">
                        <StatCard loading={Boolean(!stakingData.total_axn_staked)} stat="Total Supply" amount={Math.floor(Number(marketData.circSupply + (stakingData.total_axn_staked ?? 0 ))).toLocaleString()} suffix="AXN" tooltip="Staked + Circulating" />
                    </Grid>
                    <Grid item lg={4} md={6} xs={10} key="marketCap.circulating">
                        <StatCard loading={Boolean(!marketData.marketCap)} stat="Circulating Market Cap" amount={`${Number(marketData.marketCap).toLocaleString("en-US", { style: "currency", currency: "USD" })}`} suffix="USD" />
                    </Grid>
                    <Grid item lg={4} md={6} xs={10} key="marketCap.total">
                        <StatCard loading={Boolean(!stakingData.total_axn_staked)} stat="Total Market Cap" amount={`${Number((marketData.circSupply + (stakingData.total_axn_staked ?? 0 )) * marketData.usdtPerAxn).toLocaleString("en-US", { style: "currency", currency: "USD" })}`} suffix="USD" tooltip="Staked + Circulating"/>
                    </Grid>
                    <Grid item lg={4} md={6} xs={10} key="volumeETH">
                        <StatCard loading={Boolean(!marketData.volumeUsd)} stat="24h Volume" amount={Number(marketData.volumeUsd).toLocaleString("en-US", { style: "currency", currency: "USD" })} suffix="USD"/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MarketStats;