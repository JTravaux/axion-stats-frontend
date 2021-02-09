import { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';

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
    }, [])

    return {
        stakingStats,
        stakingStatsLoading,
    }
}

export default useStakingData;