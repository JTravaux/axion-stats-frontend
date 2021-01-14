import React from 'react';
import moment from 'moment';
import StatCard from './FreeclaimStatCard';
import { Grid, Typography  } from '@material-ui/core';

const FreeclaimStats = ({ data, loading }) => {

    return (
        <div style={{ padding: '2%', paddingBottom: 0 }}>
            <Typography variant="h4" align="center" color="primary" style={{ fontWeight: '100' }}>HEX Freeclaim Stats</Typography>
            
            <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }} align="center">Each ETH address containing HEX on May 28th, 2020, staked or unstaked, can claim free Axion at a value of 1:1.</Typography>
            <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }} align="center">There is a maximum cap of 10 million tokens per address, and you keep your HEX. More information in FAQ.</Typography>
            <br/>
            {data && (
                <>
                    <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }} align="center">Data Last Refreshed: {moment(data.timestamp).format("h:mm a")}</Typography>
                </>
            )}
          
            <div style={{ margin: '2%' }}>
                <Grid container spacing={3} justify="center">
                    <Grid item lg={4} md={6} xs={10}>
                        <StatCard stat="Total Addresses Claimed" percent={data.percent_addresses_claimed} amount={data.claimed_addresses} total={data.claimable_addresses} suffix="" loading={loading} />
                    </Grid>
                    <Grid item lg={4} md={6} xs={10}>
                        <StatCard stat="Total Axion Claimed" percent={data.percent_amount_claimed} tooltip="Includes overflow AXN sent to auction" amount={data.claimed_amount} total={data.claimable_amount} suffix="AXN" loading={loading} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default FreeclaimStats;