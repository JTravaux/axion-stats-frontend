import React from 'react';
import moment from 'moment';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Card, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';

const Event = ({ type, time, amount, shares, end, start, txID, block }) => {
    const openTx = () => window.open(`https://etherscan.io/tx/${txID}`, "_blank")

    return (
        <Card className="accordianHues" style={{ margin: '1%', padding: '1%', border: '1px solid var(--secondary-main-color)', textAlign: 'center' }} elevation={12}>
            <Grid container justify="space-between" alignItems="center">
                <Grid container item xs={3} justify="space-between" alignItems="center">
                    <Grid item xs={2}>
                        <Typography variant="subtitle1" color="primary" style={{ fontWeight: '500' }}>{type}</Typography>
                    </Grid>
                    <Grid item container>
                        <Grid item>
                            <Typography variant="subtitle2" color="secondary" style={{ fontStyle: 'italic' }}> {time ? moment(time).fromNow() : `Block: ${block.toLocaleString()}`}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" color="primary">{(amount / 1000000000000000000).toLocaleString()} AXN</Typography>
                    <Typography variant="subtitle2" color="secondary">Amount</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" color="primary">{(shares / 1000000000000000000).toLocaleString()}</Typography>
                    <Typography variant="subtitle2" color="secondary">Shares</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" color="primary">{moment.unix(end).diff(moment.unix(start), 'days')}</Typography>
                    <Typography variant="subtitle2" color="secondary">Days</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="View on Etherscan" classes={{ tooltip: 'tooltip' }} placement="right">
                        <IconButton onClick={() => openTx()}>
                            <OpenInNewIcon fontSize="small" style={{ color: "var(--primary-main-color)" }} />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Event;