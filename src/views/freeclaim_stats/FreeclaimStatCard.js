import React from 'react';
import { Card, CircularProgress, Typography, Tooltip } from "@material-ui/core";
import CardBG from '../../assets/img/card_bg.jpg';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import useDarkMode from 'use-dark-mode'

const StatCard = ({ stat, amount = 0, loading = true, total, percent, suffix, tooltip }) => {
        const darkMode = useDarkMode(false, { storageKey: "AxionStatsDark" });

    return(
        <Card className="card cardHue" elevation={darkMode.value ? 12 : 6}>
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
                    {(loading || amount === 0) ? <CircularProgress size={23} /> : (<>
                        <Typography variant="subtitle1" color="secondary" style={{ fontWeight: '400' }}>{percent.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2})}</Typography>

                        <Typography variant="subtitle2" color="secondary" style={{ fontWeight: '500' }} display="inline">{amount.toLocaleString()}{suffix ? ` ${suffix}` : ""}</Typography>
                        <Typography variant="subtitle2" color="secondary" style={{ fontWeight: '400' }} display="inline">&nbsp;/&nbsp;{total.toLocaleString()} {suffix}</Typography>
                    </>)}
                    
                </div>

                {/* <PieChart
                    animate 
                    style={{ height: '100px' }}
                    data={[
                        { title: 'Claimed', value: amount, color: '#4c598e' },
                        { title: 'Unclaimed', value: total, color: '#6D7BB9' },
                    ]}
                /> */}
            </div>
          
        </Card>
    )
}

export default StatCard;