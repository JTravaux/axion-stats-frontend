import { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';

const DEFAULT_DATA = {
    "shrimp": { count: 0, totalAxn: 0 },
    "crab": { count: 0, totalAxn: 0 },
    "fish": { count: 0, totalAxn: 0 },
    "octopus": { count: 0, totalAxn: 0 },
    "dolphin": { count: 0, totalAxn: 0 },
    "tigerShark": { count: 0, totalAxn: 0 },
    "greatWhite": { count: 0, totalAxn: 0 },
    "whale": { count: 0, totalAxn: 0 },
    "totals": { held_axn: 0, holders: 0, last_updated: 0 },
}

const useHolderData = () => {
    const [data, setData] = useState(null);
    const [bothData, setBothData] = useState(null);
    const [stakingData, setStakingData] = useState(null);
    const [circulatingData, setCirculatingData] = useState(null);

    const [stakedChecked, setStakedChecked] = useState(true);
    const [circChecked, setCircChecked] = useState(true);

    const [stakedDisabled, setStakedDisabled] = useState(false);
    const [circDisabled, setCircDisabled] = useState(false);

    const _fetchInfo = () => {
        fetch(`${BASE_URL}/eco/totals`).then(result => {
            result.json().then(res => {
                setData(res.combined_ecosystem)
                setBothData(res.combined_ecosystem);
                setStakingData(res.staking_ecosystem);
                setCirculatingData(res.liquid_ecosystem);

                if (res.liquid_ecosystem.totals.holders === 0) {
                    setCircChecked(false)
                    setCircDisabled(true)
                }
                if (res.staking_ecosystem.totals.holders === 0) {
                    setStakedChecked(false)
                    setStakedDisabled(true)
                }
            })
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        _fetchInfo()    
    }, [])

    const _changeData = selected => {
        if(selected.liquid && selected.staked)
            setData(bothData)
        else if (selected.liquid)
            setData(circulatingData)
        else if (selected.staked)
            setData(stakingData)
        else 
            setData({...DEFAULT_DATA})
    }

    const onCheck = ev => {
        if (ev.target.name === "staked") {
            setStakedChecked(ev.target.checked)
            _changeData({ staked: ev.target.checked, liquid: circChecked })
        }
        else if (ev.target.name === "liquid") {
            setCircChecked(ev.target.checked)
            _changeData({ staked: stakedChecked, liquid: ev.target.checked })
        }
    }

    return {
        data,
        onCheck,
        circChecked,
        circDisabled,
        stakedChecked,
        stakedDisabled,
    }
}


export default useHolderData;