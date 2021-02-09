import React from 'react';
import { Card, CircularProgress, Typography } from "@material-ui/core";
import moment from 'moment'
import useDarkMode from 'use-dark-mode'

const AuctionCard = ({auction, loading}) => {
    const darkMode = useDarkMode(false, { storageKey: "AxionStatsDark" });

    return(
        <Card className="card cardHue" elevation={darkMode.value ? 12 : 6}>
            {/* <img src={CardBG} width="100%" className="cardBG" alt="card background"/> */}

            <div style={{ textAlign: 'center', padding: '1%' }}>           
                <div>
                    {loading ? <CircularProgress size={23} /> : (<>
                        <Typography variant="subtitle1" color={auction.isWeekly ? 'primary' : 'secondary'} style={{ fontWeight: auction.isWeekly ? 'bold' : '400' }}>Auction #{auction.id}</Typography>
                        <Typography variant="subtitle2" color="secondary" style={{ fontWeight: '400' }}>{auction.eth.toLocaleString()} ETH</Typography>
                        <Typography variant="subtitle2" color="secondary" style={{ fontWeight: '400' }}>{auction.axn.toLocaleString()} AXN</Typography>
                        <br/>
                        <Typography variant="subtitle2" color="secondary" style={{ fontWeight: '400' }}>
                            {moment.unix(auction.start).format("MMM Do, YYYY h:mm A")}
                            &nbsp;-&nbsp;
                            {moment.unix(auction.end).format("MMM Do, YYYY h:mm A")}
                        </Typography>
                    </>)}
                </div>
            </div>
          
        </Card>
    )
}

export default AuctionCard;