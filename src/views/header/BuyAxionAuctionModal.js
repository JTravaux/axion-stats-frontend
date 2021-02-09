import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { AXION_ADDRESS } from '../../constants';
import { Button, Dialog, DialogContent, Divider, IconButton, Typography } from '@material-ui/core';

const BuyAxionAuctionModal = ({ isOpen, close, isDarkMode }) => {
    const openUniswap = () => window.open(`https://app.uniswap.org/#/swap?outputCurrency=${AXION_ADDRESS}`, "_blank");
    const openReferral = () => window.open("https://stake.axion.network/auction?ref=0xbE42d298d31b2551aE9E6e88B838A3ba5Dc1D6CD", "_blank");

    return (
        <Dialog open={isOpen} onClose={close} classes={{ paper: "accordianHues"}} scroll="body">
            <div style={{ margin: '1%', padding: '2%' }}>
                <Typography variant="h6" color="primary">Axion's 10% Referral Bonus</Typography>

                <div style={{ position: 'absolute', top: "5px", right: "10px"}}>
                    <IconButton onClick={close}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </div>

            <DialogContent>
                <Typography variant="subtitle1" color="textSecondary">By purchasing Axion from the daily auction using my link, you will get a <strong>10% bonus</strong>. Axion from the auction will be automatically staked for 60 days and you must manually claim it afterwards.</Typography>
                <br />
                <Typography variant="subtitle1" color="textSecondary">Example: If you receive 100,000 AXN from the auction, you will earn a bonus of 10,000 AXN. You will get the total of 110,000 AXN along with any rewards from the stake after you claim it.</Typography>
                <br />
                <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: 400 }}>Upon entering auction, Axion will pledge 1% of your deposit to <span className="textLink" onClick={() => window.open("https://edenprojects.org/", "_blank")}>The Eden Reforestation Project</span>, where $0.10 ensures that a tree is planted, and cared for until full maturity. Learn more about the pledge below!</Typography>
            </DialogContent>
            
            <div style={{margin: '2% auto', width: '85%'}}>
                <Button variant="contained" color="secondary" className="referralButton" onClick={openReferral} autoFocus style={{ textTransform: 'none', margin: '0 !important', width: '94%'}}>
                    Buy From Auction &amp; Get 10% Bonus AXN
                </Button>
                <Button fullWidth onClick={openUniswap} style={{ textTransform: 'none', color: 'var(--text-primary-color)'}}>Buy From Uniswap Instead, Instantly</Button>
            </div>

            <Divider style={{ margin: '0 4% 1% 4%' }} />

            <div style={{ margin: '2% 5%'}}>
                <Typography variant="caption" color="textSecondary">There is no guarantee that AXN will be cheaper in the auction compared to Uniswap. You will be able to see the current "bid" (price) on the auction page before participating. Keep in mind, this can change until the auction closes.</Typography>
            </div>

        </Dialog>
    )
}

export default BuyAxionAuctionModal;