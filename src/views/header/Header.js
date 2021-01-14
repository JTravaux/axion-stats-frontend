import React, { useState } from 'react';
import useDarkMode from 'use-dark-mode';
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/core/styles';
import BuyAxionAuctionModal from './BuyAxionAuctionModal';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import metamaskLogo from '../../assets/img/metamask-logo.png';
import { Typography, AppBar, Toolbar, IconButton, Grid, Menu, MenuItem, Button, Tooltip } from '@material-ui/core';

const DARK_MODE_KEY = "AxionStatsDark";
const isDarkModeEnabled = true;

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    
    const toggleDarkMode = () => {
        document.documentElement.style.setProperty("--main-bg-color", (darkMode.value ? '#232839' : '#EAEEF7'));
        document.documentElement.style.setProperty("--primary-main-color", (darkMode.value ? 'rgb(239 232 255)' : '#4c598e'));
        document.documentElement.style.setProperty("--text-secondary-color", (darkMode.value ? 'rgb(239 232 255)' : 'rgba(0,0,0, 0.54)'));
        document.documentElement.style.setProperty("--card-bg-hue", (darkMode.value ? '#02104a' : '#e6eaf7'));
        document.documentElement.style.setProperty("--secondary-main-color", (darkMode.value ? '#f1f1ff' : '#6D7BB9'));
        document.documentElement.style.setProperty("--card-accordian-hue", (darkMode.value ? '#46507b' : '#e7eaf7'));
        document.documentElement.style.setProperty("--text-primary-color", (darkMode.value ? 'rgba(255,255,255, 0.87)' : 'rgba(0,0,0, 0.87)'));
        document.documentElement.style.setProperty("--stake-row-bg", (darkMode.value ? '#33384c' : '#e7eaf7'));
    }
    
    const theme = useTheme();
    const history = useHistory();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const darkMode = useDarkMode(false, { storageKey: DARK_MODE_KEY, onChange: toggleDarkMode });
  
    const handleClose = () => { setAnchorEl(null) }
    const handleClick = (event) => { setAnchorEl(event.currentTarget) }
    const openWebsite = () => window.open("https://axion.network", "_blank");
    const openPortal = () => window.open("https://stake.axion.network/staking?ref=0xbe42d298d31b2551ae9e6e88b838a3ba5dc1d6cd", "_blank");
    const openReferral = () => {
        setModalOpen(true);
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
                        'address': "0x71F85B2E46976bD21302B64329868fd15eb0D127",
                        'symbol': "AXN",
                        'decimals': 18,
                        'image': 'https://axionstats.info/img/axion-icon.svg',
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
                        <Tooltip classes={{ tooltip: 'tooltip' }} title={`Switch to ${darkMode.value ? "light" : "dark"} theme (beta™)`} placement="left">
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
                                    <Typography onClick={() => history.push("/auctions")} variant="subtitle2" style={{ color: "#FFF" }} display="inline" className="clickableLink noselect">Auctions</Typography>
                                    <Typography onClick={() => history.push("/stakes")} variant="subtitle2" style={{ color: "#FFF" }} display="inline" className="clickableLink noselect">Stakes</Typography>
                                    <Typography onClick={openPortal} variant="subtitle2" style={{ color: "#FFF" }} display="inline" className="clickableLink noselect">Stake AXN</Typography>
                                    <Typography onClick={addToMM} variant="subtitle2" style={{ color: "#FFF" }} display="inline" className="clickableLink noselect">
                                        Add to MM
                                    </Typography>

                                    <Button onClick={openReferral} variant="contained" color="secondary" className="referralButton">
                                        <Typography variant="subtitle2">Buy Axion, Get 10% Bonus</Typography>
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

                                    <MenuItem style={{ color: "rgb(255 126 235)", fontWeight: 'bold'}} onClick={openReferral}>Buy Axion - 10% Bonus</MenuItem>
                                </Menu>
                            </>)}
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>

            <BuyAxionAuctionModal isOpen={modalOpen} close={() => setModalOpen(false)} isDarkMode={darkMode.value}/>
        </div>
    )
}

export default Header;