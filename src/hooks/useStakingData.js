import { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';

const AXION_STAT_UPDATE_KEY = "AxionStats_AutoUpdate";

const useStakingData = () => {
    const [stakingStats, setStakingStats] = useState([]);
    const [stakingStatsLoading, setStakingStatsLoading] = useState(false);

    const _getStakingStats = () => {
        setStakingStatsLoading(true);

        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/staking/totals`).then(result => {
                result.json().then(res => {
                    setStakingStats(res);
                    resolve();
                })
            })
            .catch(err => reject(err))
            .finally(() => setStakingStatsLoading(false))
        })
    }

    useEffect(() => {
        _getStakingStats();

        if (localStorage.getItem(AXION_STAT_UPDATE_KEY) === "1") {
            setInterval(() => {
                _getStakingStats().catch(err => {
                    if (process.env.NODE_ENV === "development")
                        console.log("Auto Updating Error:", err)
                })
            }, 330000) // 5 mins
        }
    }, [])

    return {
        stakingStats,
        stakingStatsLoading,
    }
}

export default useStakingData;