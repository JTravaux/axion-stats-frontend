import React, { useState } from 'react';
import moment from 'moment';
import StatCard from './StakingStatCard';
import { Grid, Typography, Switch, FormControlLabel  } from '@material-ui/core';

const StakingStats = ({ stakingData, loading, supply, actualSupply }) => {
    const [isAdjusted, setIsAdjusted] = useState(false)

    return (
        <div style={{ padding: '2%', paddingBottom: 0 }}>
            <Typography variant="h4" align="center" color="secondary" style={{ fontWeight: '100' }}>Staking Stats</Typography>
            {stakingData.timestamp && (
                <>
                    <center>
                        <FormControlLabel
                            disabled={!actualSupply}
                            labelPlacement="start"
                            control={<Switch color="secondary" size="small" checked={isAdjusted} onChange={ev => setIsAdjusted(ev.target.checked)} />}
                            label={<Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }}>Include dev fund &amp; contracts</Typography>}
                        />
                    </center>
                    <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }} align="center">Data Last Refreshed: {moment(stakingData.timestamp).format("h:mm a")}</Typography>
                    <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }} align="center">Data as of Block: {stakingData.block}</Typography>
                   
                </>
            )}
          
            <div style={{ margin: '2%' }}>
                <Grid container spacing={3} justify="center">
                    <Grid item lg={4} md={6} xs={10}>
                        <StatCard stat="Total Active Stakes" amount={stakingData.total_active_stakes} suffix="" loading={loading} />
                    </Grid>
                    <Grid item lg={4} md={6} xs={10}>
                        <StatCard stat="Total Axion Staked" amount={Math.round(stakingData.total_axn_staked ?? 0)} suffix="AXN" loading={loading} />
                    </Grid>
                    <Grid item lg={4} md={6} xs={10}>
                        <StatCard stat="Percentage Staked" amount={(stakingData.total_axn_staked / (stakingData.total_axn_staked + (isAdjusted ? supply : actualSupply))).toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 })} suffix="" loading={!supply || !actualSupply} />
                    </Grid>
                    <Grid item lg={4} md={6} xs={10}>
                        <StatCard stat="Average Stake Length" amount={Math.round(stakingData.avg_days ?? 0)} suffix="Days" loading={loading} />
                    </Grid>
                    <Grid item lg={4} md={6} xs={10}>
                        <StatCard stat="Average Stake Amount" amount={Math.round(stakingData.avg_axn ?? 0)} suffix="AXN" loading={loading} />
                    </Grid>   
                    <Grid item lg={4} md={6} xs={10}>
                        <StatCard stat="High Five Club Stakes" amount={stakingData.total_active_stakes_5555} suffix="" loading={loading} bracketStat={Math.round(stakingData.total_axn_staked_5555)} bracketStatSuffix="AXN" tooltip="Stakes over 2.5m AXN for 5,555 days"/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default StakingStats;