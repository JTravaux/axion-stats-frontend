import React from 'react';
import { Card, CircularProgress, Typography, Tooltip } from "@material-ui/core";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import useDarkMode from 'use-dark-mode'

const StatCard = ({ stat, amount, suffix, percent, tooltip, loading }) => {
    const darkMode = useDarkMode(false, { storageKey: "AxionStatsDark" });

    return (
        <Card className="card cardHue" elevation={darkMode.value ? 12 : 6}>
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
                    {loading ? <CircularProgress size={23} /> : (
                        <Typography variant="subtitle1" color="secondary" style={{ fontWeight: '400' }}>{Number(amount).toLocaleString('en-US', { maximumFractionDigits: percent ? 6 : 2}) ?? 0} {suffix}</Typography>
                    )}

                </div>
            </div>

        </Card>
    )
}

export default StatCard;