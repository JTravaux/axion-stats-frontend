import React from 'react';
import EcosystemBreakdown from './views/ecosystem_breakdown/EcosystemBreakdown';
import MarketStats from './views/market_stats/MarketStats';
import Header from './views/header/Header'
import { Typography } from '@material-ui/core';
import StakingStats from './views/staking_stats/StakingStats';
import useMarketData from './hooks/useMarketData';
import useStakingData from './hooks/useStakingData';

const VERSION = "v4.0";

const Home = () => {
    const { stakingStats, stakingStatsLoading } = useStakingData();
    const { volumeUsd, marketCap, circSupply, fixedCircSupply, axnPerEth, usdtPerAxn, lastUpdated, autoUpdating, toggleAutoUpdating } = useMarketData();

    return (
        <div>
            <Header/>
            <MarketStats 
                stakingData={stakingStats}
                toggleAutoUpdating={toggleAutoUpdating}
                stakingDataLoading={stakingStatsLoading}
                marketData={{
                    volumeUsd,
                    marketCap,
                    axnPerEth,
                    usdtPerAxn,
                    circSupply,
                    lastUpdated,
                    autoUpdating,
                }} 
            />
            <StakingStats stakingData={stakingStats} loading={stakingStatsLoading} supply={circSupply} actualSupply={fixedCircSupply} />
            <EcosystemBreakdown/>

            <div style={{ margin: '1%', textAlign: 'right', marginTop: 0, opacity: 0.85 }}>
                <Typography variant="subtitle2" color="textPrimary" style={{ fontWeight: 200 }}>{VERSION} ✳️</Typography>
                <Typography variant="subtitle2" color="textPrimary" style={{ fontWeight: 200 }}>By Some Greenish Guy</Typography>
                <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: 200 }}>Unofficial Stats. Find the official stats on stake.axion.network</Typography>
            </div>
        </div>
    )
}

export default Home;