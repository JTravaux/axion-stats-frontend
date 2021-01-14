import { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';

const AXION_STAT_UPDATE_KEY = "AxionStats_AutoUpdate";

const useFreeclaimData = () => {
    const [freeclaimData, setFreeclaimData] = useState({});
    const [freeclaimDataLoading, setFreeclaimLoading] = useState(false);

    const _getFreeclaimStats = () => {
        setFreeclaimLoading(true);

        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/freeclaim/totals`).then(result => {
                result.json().then(res => {
                    setFreeclaimData(res);
                    resolve();
                })
            })
            .catch(err => reject(err))
            .finally(() => setFreeclaimLoading(false))
        })
    }

    useEffect(() => {
        _getFreeclaimStats();

        if (localStorage.getItem(AXION_STAT_UPDATE_KEY) === "1") {
            setInterval(() => {
                _getFreeclaimStats().catch(err => {
                    if (process.env.NODE_ENV === "development")
                        console.log("Auto Updating Error:", err)
                })
            }, 630000) // 10.5 mins
        }
    }, [])

    return {
        freeclaimData,
        freeclaimDataLoading,
    }
}

export default useFreeclaimData;