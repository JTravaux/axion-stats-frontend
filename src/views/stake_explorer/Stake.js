import React from 'react';
import moment from 'moment';
import { Card, Grid, Typography } from "@material-ui/core";

const ONE_EIGHTEEN = 1000000000000000000;

const Stake = ({ amount, shares, start, end, type }) => {
    const START = moment.unix(start);
    const END = moment.unix(end);
    const NOW = moment();

    const activeIsComplete = END.toDate() < NOW.toDate() && type === "stake";
    const isComplete = END.toDate() > NOW.toDate() && type === "complete";

    return(
        <Card className="stakeRow" elevation={6}>
            <Grid container justify="space-evenly">
                <Grid item md={2} xs={12}>
                    <Typography variant="subtitle2" align="center" color="textPrimary">{(amount / ONE_EIGHTEEN).toLocaleString()} AXN</Typography>
                </Grid>
                <Grid item md={2} xs={12}>
                    <Typography variant="subtitle2" align="center" color="textPrimary">{Math.round(shares / ONE_EIGHTEEN).toLocaleString()} Shares</Typography>
                </Grid>
                <Grid item md={2} xs={12}>
                    <Typography variant="subtitle2" align="center" color="textPrimary">{START.format("MMM Do, YYYY H:mm")}</Typography>
                </Grid>
                <Grid item md={2} xs={12}>
                    <Typography variant="subtitle2" align="center" color="textPrimary">{END.format("MMM Do, YYYY H:mm")}</Typography>
                </Grid>
                <Grid item md={2} xs={12}>
                    <Typography variant="subtitle2" align="center" color="textPrimary">{moment.duration(END.diff(START)).asDays().toFixed(0)} days</Typography>
                </Grid>


                {activeIsComplete && (
                    <Grid item md={2} xs={12}>
                        <Typography variant="subtitle2" align="center" color="textPrimary">Pending Withdrawal</Typography>
                    </Grid>
                )}

                {isComplete && (
                    <Grid item md={2} xs={12}>
                        <Typography variant="subtitle2" align="center" color="textPrimary">{moment.duration(END.diff(NOW)).asDays().toFixed(0)} days until end</Typography>
                    </Grid>
                )}
               
            </Grid>
        </Card>
    )
}

export default Stake;