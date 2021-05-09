import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { AXION_ADDRESS } from '../../constants';
import { Button, Dialog, DialogContent, Divider, IconButton, Typography } from '@material-ui/core';
import AxionCardImage from '../../assets/img/AxionCreditCard.png';

const ConnectFinancialModal = ({ isOpen, close, isDarkMode }) => {
    const openRegister = () => window.open("http://cnfi.me/sgg", "_blank");
    const openInfo = () => window.open("https://support.axion.network/en/articles/5210454-the-axion-card-connect-financial", "_blank");

    return (
        <Dialog open={isOpen} onClose={close} classes={{ paper: "accordianHues"}} scroll="body">
            <div style={{ margin: '1%', padding: '2%' }}>
                <Typography variant="h6" color="primary">Introducing the Axion Credit Card!</Typography>

                <div style={{ position: 'absolute', top: "5px", right: "10px"}}>
                    <IconButton onClick={close} style={{color: 'var(--text-primary-color)'}}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </div>

            <DialogContent>
                <img src={AxionCardImage} style={{ width: '100%', marginBottom: 10}}/>
                <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: 400, marginBottom: 15 }}>
                    Axion's first and most influential partnership came through a deal with Connect Financial, 
                    a company that is working endlessly to bring truly accessible cryptocurrency credit Card. 
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: 400, marginBottom: 15 }}>
                    Other similar "crypto card" projects are essentially prepaid debit cards, 
                    requiring you to liquidate your cryptocurrency and load your card as fiat, which can have severe limitations on usage or acceptance. 
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: 400, marginBottom: 15 }}>
                    With Connect, you can convert your currency at the time of spending, or carry it forward and pay it off later when the account balance is due.
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: 400, marginBottom: 15 }}>
                    The card is not quite shipping yet, but you can register below and request a spot on the waiting list.
                </Typography>
            </DialogContent>
            
            <div style={{margin: '2% auto', width: '85%'}}>
                <Button variant="contained" color="secondary" className="connectButton" onClick={openRegister} autoFocus style={{ textTransform: 'none' }} fullWidth>
                    Register &amp; Join Waiting List
                </Button>
                <Button fullWidth onClick={openInfo} style={{ textTransform: 'none', color: 'var(--text-primary-color)'}}>Want to learn more? Click here!</Button>

            </div>
            
        </Dialog>
    )
}

export default ConnectFinancialModal;