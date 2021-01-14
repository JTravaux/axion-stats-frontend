import React from 'react';
import { Card, CircularProgress, Typography, Tooltip } from "@material-ui/core";
import CardBG from '../../assets/img/card_bg.jpg';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const StatCard = ({ stat, amount=0, loading=true, suffix, bracketStat=null, bracketStatSuffix=null, tooltip }) => {
    return(
        <Card className="card cardHue" elevation={6}>
            <img src={CardBG} width="100%" className="cardBG" alt="card background"/>

            <div style={{ textAlign: 'center', padding: '1%' }}>           
                <div>
                    <Typography variant="h6" color="secondary" style={{ fontWeight: '400' }}>
                        {stat}
                        {tooltip && (
                            <sup>
                                <Tooltip title={tooltip} classes={{ tooltip: 'tooltip' }} placement="right">
                                    <InfoOutlinedIcon style={{ fontSize: '0.7rem', cursor: 'pointer' }} color="primary" />
                                </Tooltip>
                            </sup>
                        )}
                    </Typography>
                    {(loading || amount === 0) ? <CircularProgress size={23} /> : (
                        <Typography variant="subtitle1" color="secondary" style={{ fontWeight: '400' }}>
                            {amount.toLocaleString()} {suffix} {bracketStat ? `(${bracketStat.toLocaleString()} ${bracketStatSuffix})` : ""}
                        </Typography>
                    )}
                    
                </div>
            </div>
          
        </Card>
    )
}

export default StatCard;