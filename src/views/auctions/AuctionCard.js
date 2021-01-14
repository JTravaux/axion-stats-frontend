import React from 'react';
import { Card, CircularProgress, Typography } from "@material-ui/core";
import CardBG from '../../assets/img/card_bg.jpg';
import moment from 'moment'

const AuctionCard = ({auction, loading}) => {

    return(
        <Card className="card cardHue" elevation={6}>
            <img src={CardBG} width="100%" className="cardBG" alt="card background"/>

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