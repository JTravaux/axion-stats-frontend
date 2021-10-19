import React, { useState } from 'react';
import useDarkMode from 'use-dark-mode';
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { AXION_ADDRESS } from '../../constants';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import metamaskLogo from '../../assets/img/metamask-logo.png';
import ConnectFinancialModal from './ConnectFinancialModal';
import { Typography, AppBar, Toolbar, IconButton, Grid, Menu, MenuItem, Button, Tooltip } from '@material-ui/core';

const DARK_MODE_KEY = "AxionStatsDark";
const isDarkModeEnabled = true;

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [connectModalOpen, setConnectModalOpen] = useState(false);

    const toggleDarkMode = () => {
        document.documentElement.style.setProperty("--main-bg-color", (darkMode.value ? '#233035' : '#EAEEF7'));
        document.documentElement.style.setProperty("--primary-main-color", (darkMode.value ? '#FFFFFF' : '#00A6E8'));
        document.documentElement.style.setProperty("--text-secondary-color", (darkMode.value ? '#FFFFFF' : 'rgba(0,0,0, 0.54)'));
        document.documentElement.style.setProperty("--card-bg-hue", (darkMode.value ? '#25353c' : '#f7faff'));
        document.documentElement.style.setProperty("--secondary-main-color", (darkMode.value ? '#FFFFFF' : '#0086CD'));
        document.documentElement.style.setProperty("--card-accordian-hue", (darkMode.value ? '#25353c' : '#f7faff'));
        document.documentElement.style.setProperty("--text-primary-color", (darkMode.value ? '#FFFFFF' : 'rgba(0,0,0, 0.87)'));
        document.documentElement.style.setProperty("--stake-row-bg", (darkMode.value ? '#25353c' : '#f7faff'));
    }
    
    const theme = useTheme();
    const history = useHistory();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const darkMode = useDarkMode(false, { storageKey: DARK_MODE_KEY, onChange: toggleDarkMode });
  
    const handleClose = () => { setAnchorEl(null) }
    const handleClick = (event) => { setAnchorEl(event.currentTarget) }
    const openWebsite = () => window.open("https://axion.network", "_blank");
    const openPortal = () => window.open("https://stake.axion.network/staking", "_blank");
    const openConnect = () => {
        setConnectModalOpen(true);
        setAnchorEl(null)
    }

    const addToMM = () => {
        if(window.ethereum) {
            window.ethereum.sendAsync({
                method: 'wallet_watchAsset',
                id: Math.round(Math.random() * 10000),
                params: {
                    'type': 'ERC20',
                    'options': {
                        'address': "0xD2c149B14ed7684f8D4981E567CE894f9E0F89eb", // Polygon
                        'symbol': "AXN",
                        'decimals': 18,
                        'image': 'https://stake.axion.network/metamask-axn-logo.png',
                    },
                }
            })
        } else
            alert(`There was an error communicating with Metamask. ${isSmall ? "If you are not using the built-in MetaMask browser, please switch to that." : ""}`)
    }

    return (
        <div>
            <AppBar position="static" className="navBar" elevation={10} >
                <Toolbar>
                    {!isSmall && isDarkModeEnabled && (
                        <Tooltip classes={{ tooltip: 'tooltip' }} title={`Switch to ${darkMode.value ? "light" : "dark"} theme™`} placement="left">
                            <div style={{ cursor: 'pointer', position: 'absolute', right: 12 }} onClick={darkMode.toggle}>
                                {darkMode.value ? <Brightness5Icon /> : <Brightness2Icon />}
                            </div>
                        </Tooltip>
                    )}

                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h5" align="center" style={{ fontWeight: '500', color: "#FFF", cursor: 'pointer' }} onClick={() => history.push('/')}>Axion Stats</Typography>
                        </Grid>
                        <Grid item>
                            {!isSmall && (
                                <div className="headerLinks" style={{marginRight: isDarkModeEnabled ? '25px' : 0}}>
                                    <Typography onClick={() => history.push("/")} variant="subtitle2" style={{ color: "#FFF" }} display="inline" className="clickableLink noselect">Stats</Typography>
                                    <Typography onClick={() => window.open('https://axion.network/how-to-buy-axion/accelerator')} variant="subtitle2" style={{ color: "#FFF" }} display="inline" className="clickableLink noselect">Acceleratror</Typography>
                                    <Typography onClick={() => history.push("/stakes")} variant="subtitle2" style={{ color: "#FFF" }} display="inline" className="clickableLink noselect">Stakes</Typography>
                                    <Typography onClick={openPortal} variant="subtitle2" style={{ color: "#FFF" }} display="inline" className="clickableLink noselect">Stake AXN</Typography>
                                    <Typography onClick={addToMM} variant="subtitle2" style={{ color: "#FFF" }} display="inline" className="clickableLink noselect">
                                        Add to MM
                                    </Typography>

                                    <Button onClick={openConnect} variant="contained" color="secondary" className="connectButton" style={{marginLeft: '15px'}}>
                                        <Typography variant="subtitle2">Axion Credit Card</Typography>
                                    </Button>
                                  
                                </div>
                            )}

                            {isSmall && (<>
                                <IconButton edge="start" color="inherit" onClick={handleClick}>
                                    <MenuIcon />
                                </IconButton>

                                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} style={{padding: 0, margin: 0}}>
                                    <MenuItem style={{ color: "#FFF" }} onClick={() => history.push("/")}>Home</MenuItem>
                                    <MenuItem style={{ color: "#FFF" }} onClick={() => history.push("/auctions")}>Auctions</MenuItem>
                                    <MenuItem style={{ color: "#FFF" }} onClick={() => history.push("/stakes")}>Stake Explorer</MenuItem>
                                    <MenuItem style={{color: "#FFF"}} onClick={openWebsite}>Axion Website</MenuItem>
                                    <MenuItem style={{color: "#FFF"}} onClick={openPortal}>Staking Portal</MenuItem>
                                    <MenuItem style={{ color: "#FFF" }} onClick={addToMM}><img alt="metamask logo" src={metamaskLogo} width={20} />&nbsp;Add to MetaMask</MenuItem>
                                    <MenuItem style={{ color: "#FFF" }} onClick={darkMode.toggle}>{darkMode.value ? <Brightness5Icon /> : <Brightness2Icon />}&nbsp;{darkMode.value ? "Light" : "Dark"} Mode</MenuItem>
                                    <MenuItem style={{ color: "#F18A00", fontWeight: 'bold'}} onClick={openConnect}>Axion Credit Card</MenuItem>
                                </Menu>
                            </>)}
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>

            <ConnectFinancialModal isOpen={connectModalOpen} close={() => setConnectModalOpen(false)} isDarkMode={darkMode.value}/>
        </div>
    )
}

export default Header;