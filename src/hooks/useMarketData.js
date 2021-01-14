import { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';

const AXION_STAT_UPDATE_KEY = "AxionStats_AutoUpdate";

const useMarketData = (autoUpdating=true) => {
    const [axnPerEth, setAxnPerEth] = useState(0);
    const [usdtPerAxn, setUsdtPerAxn] = useState(0);
    const [volumeUsd, setVolumeUsd] = useState(0);
    const [volumeEth, setVolumeEth] = useState(0);
    const [marketCap, setMarketCap] = useState(0);
    const [circSupply, setCircSupply] = useState(0);
    const [fixedCircSupply, setFixedCircSupply] = useState(0);

    const [lastUpdated, setLastUpdated] = useState(Date.now());
    const [statUpdater, setStatUpdater] = useState(null);

    const _getMarketStats = () => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/stats/volume`).then(result => {
                result.json().then(res => {
                    const VOLUME_USD = res.usd
                    const VOLUME_ETH = res.eth

                    setVolumeUsd(VOLUME_USD);
                    setVolumeEth(VOLUME_ETH);
                    resolve();
                })
            }).catch(err => reject(err))
        })
    }

    const _getAxnPerEth = () => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/stats/axn-eth`).then(result => {
                result.json().then(res => {
                    setAxnPerEth(res.axn);
                    resolve();
                })
            }).catch(err => reject(err))
        })
    }

    const _getUsdtPerAxn = () => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/stats/usdt-axn`).then(result => {
                result.json().then(res => {
                    setUsdtPerAxn(res.usdt);
                    document.title = `Axion Stats | $${res.usdt} USDT`; 
                    resolve();
                })
            }).catch(err => reject(err))
        })
    }

    const _getMarketCap = () => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/stats/market-cap`).then(result => {
                result.json().then(async (res) => {
                    setMarketCap(res.market_cap)
                    resolve();
                })
            }).catch(err => reject(err))
        })
    }

    const _getTotalCirculatingSupply = () => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/stats/total-supply`).then(result => {
                result.json().then(async (res) => {
                    setCircSupply(res.total_supply)
                    resolve();
                })
            }).catch(err => reject(err))
        })
    }

    const _getTotalCirculatingSupplyAdjusted = () => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/stats/fixed-supply`).then(result => {
                result.json().then(async (res) => {
                    setFixedCircSupply(res.adjusted_liquid)
                    resolve();
                })
            }).catch(err => reject(err))
        })
    }

    useEffect(() => {
        _getAxnPerEth();
        _getUsdtPerAxn();
        _getMarketStats();
        _getMarketCap();
        _getTotalCirculatingSupply();
        _getTotalCirculatingSupplyAdjusted();
        
        if (!statUpdater && localStorage.getItem(AXION_STAT_UPDATE_KEY) === "1" && autoUpdating) {
            startAutoUpdating();
            if (process.env.NODE_ENV === "development")
                console.log("Started stat updater.")
        }
    // eslint-disable-next-line
    }, [])

    const startAutoUpdating = () => {
        const updater = setInterval(() => {
            const settingConfirm = localStorage.getItem(AXION_STAT_UPDATE_KEY)
            if (settingConfirm === "1") {
                Promise.all([
                    _getMarketCap(), 
                    _getAxnPerEth(),
                    _getUsdtPerAxn(), 
                    _getMarketStats(), 
                    _getTotalCirculatingSupply(),
                    _getTotalCirculatingSupplyAdjusted()
                ]).then(res => {
                    setLastUpdated(Date.now())
                    if (process.env.NODE_ENV === "development")
                        console.log("Completed stat update")
                }).catch(err => {
                    if (process.env.NODE_ENV === "development")
                        console.log("Auto Updating Error:", err)
                })
            }
        }, 15000) // 15 secs

        setStatUpdater(updater);
        localStorage.setItem(AXION_STAT_UPDATE_KEY, "1")
    }

    const stopAutoUpdating = () => {
        clearInterval(statUpdater);
        setStatUpdater(null);
        localStorage.setItem(AXION_STAT_UPDATE_KEY, "0")
    }

    const toggleAutoUpdating = () => {
        if (statUpdater)
            stopAutoUpdating();
        else
            startAutoUpdating();
    }

    return {
        volumeUsd,
        volumeEth,
        axnPerEth,
        marketCap,
        circSupply,
        usdtPerAxn,
        lastUpdated,
        fixedCircSupply,
        autoUpdating: Boolean(statUpdater),
        stopAutoUpdating,
        startAutoUpdating,
        toggleAutoUpdating,
    }
}

export default useMarketData;