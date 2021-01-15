import { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';

const useAuctionData = () => {
    const [auctions, setAuctions] = useState([]);
    const [countdown] = useState({});
    const [currentAuction, setCurrentAuction] = useState({});

    const _getAuctions = () => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/auction/auctions`).then(result => {
                result.json().then(res => {
                    setAuctions(res)
                    resolve();
                })
            }).catch(err => reject(err))
        })
    }

    const _getCurrentAuction = () => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/auction/current`).then(result => {
                result.json().then(res => {
                    setCurrentAuction(res)
                    resolve();
                })
            }).catch(err => reject(err))
        })
    }

    useEffect(() => {
        _getAuctions();
        _getCurrentAuction();
        const UPDATER = setInterval(() => _getCurrentAuction(), (1000 * 60) * 2)
        
        return (() => clearInterval(UPDATER))
    // eslint-disable-next-line
    }, [])

    return {
        auctions,
        countdown,
        currentAuction
    }
}

export default useAuctionData;