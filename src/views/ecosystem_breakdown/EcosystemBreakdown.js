import React from 'react';
import moment from 'moment';
import StatCard from './EcosystemStatCard.js';
import Shrip from '../../assets/img/shrimp.png';
import useHolderData from '../../hooks/useHolderData';
import TigerShark from '../../assets/img/tigershark.png';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Grid, Typography, Tooltip, Checkbox, FormControlLabel } from '@material-ui/core';

const EcosystemBreakdown = () => {
    const { 
        data, 
        onCheck, 
        circChecked,
        circDisabled,
        stakedChecked, 
        stakedDisabled,
    } = useHolderData();
    
    const ecosystem = [
        { key: "shrimp", type: "Shrimp", count: data?.shrimp?.count, img: true, src: Shrip, width: 30, totalAXN: data?.shrimp?.totalAxn },
        { key: "crab", type: "Crabs", count: data?.crab?.count, emoji: "🦀", totalAXN: data?.crab?.totalAxn },
        { key: "fish", type: "Fish", count: data?.fish?.count, emoji: "🐠", totalAXN: data?.fish?.totalAxn },
        { key: "octopus", type: "Octopuses", count: data?.octopus?.count, emoji: "🐙", totalAXN: data?.octopus?.totalAxn },
        { key: "dolphin", type: "Dolphins", count: data?.dolphin?.count, emoji: "🐬", totalAXN: data?.dolphin?.totalAxn },
        { key: "tigerShark", type: "Tiger Sharks", count: data?.tigerShark?.count, img: true, src: TigerShark, width: 50, totalAXN: data?.tigerShark?.totalAxn },
        { key: "greatWhite", type: "Great Whites", count: data?.greatWhite?.count, emoji: "🦈", totalAXN: data?.greatWhite?.totalAxn },
        { key: "whale", type: "Whales", count: data?.whale?.count, emoji: "🐳", totalAXN: data?.whale?.totalAxn },
    ]

    return (
        <div style={{ padding: '2%', paddingBottom: 0 }}>
            <Typography variant="h4" align="center" color="secondary" style={{ fontWeight: '100' }}>
                Axion Ecosystem  
                {data?.totals && (
                   <sup>
                        <Tooltip title={`Last Updated: ${moment(data.totals.last_updated).format("MMM Do, YYYY, h:mm a")}. Ecosystem is updated every 10 minutes.`} classes={{ tooltip: 'tooltip' }} placement="right">
                            <InfoOutlinedIcon style={{ fontSize: '0.7rem', cursor: 'pointer' }} color="primary" />
                        </Tooltip>
                   </sup>
                )}
            </Typography>

            {data?.totals && (
                <>
                    <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }} align="center">NOTE: Liquid holder data has NOT been updated since migration.<br/>Updates coming soon.</Typography>
                    <br />
                    <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }} align="center"><strong>{data.totals.holders.toLocaleString()}</strong> addresses hold at least 1 AXN.</Typography>
                    <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }} align="center">Ecosystem Total: <strong>{Math.round(data.totals.held_axn).toLocaleString()}</strong> AXN</Typography>
                    <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400', fontStyle: 'italic' }} align="center">Does not include contracts or dev fund</Typography>

                    <div style={{textAlign: 'center', marginTop: '5px'}}>
                        <Tooltip title={stakedDisabled ? "Currently unavailable. API is down" : ""} classes={{tooltip: 'tooltip'}} placement="top">
                            <FormControlLabel disabled={stakedDisabled} labelPlacement="end" control={<Checkbox color="secondary" size="small" name="staked" checked={stakedChecked} onChange={onCheck} />} label={<Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }} >Staked Axion</Typography>} />
                        </Tooltip>
                        
                        <Tooltip title={circDisabled ? "Currently unavailable. API is down" : ""} classes={{tooltip: 'tooltip'}} placement="top">
                            <FormControlLabel disabled={circDisabled} labelPlacement="end" control={<Checkbox color="secondary" size="small" name="liquid" checked={circChecked} onChange={onCheck} />} label={<Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }} >Liquid Axion</Typography>} />
                        </Tooltip>
                    </div>
                </>
            )}
          
            <div style={{margin: '2%'}}>
                <Grid container justify="space-evenly" spacing={3}>
                    {ecosystem.map(e => (
                        <Grid item lg={3} md={6} xs={10} key={e.type}>
                            <StatCard 
                                type={e.type} 
                                count={e.count} 
                                loading={!data} 
                                emoji={e.emoji} 
                                isImage={e.img ?? false} 
                                src={e.img ? e.src : null} 
                                imgWidth={e.width} 
                                total={e.totalAXN} 
                                ecoAxion={data?.totals?.held_axn} 
                                holders={data?.totals?.holders}
                            />
                        </Grid>
                    ))}
                </Grid>

            </div>
        </div>
    )
}

export default EcosystemBreakdown;