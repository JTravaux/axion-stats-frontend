import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Divider } from '@material-ui/core';
import useMarketData from '../../hooks/useMarketData';

const OFFICIAL_LINKS = [
    { link: "https://axion.network/", title: "Homepage" },
    { link: "https://stake.axion.network/staking?ref=0xbe42d298d31b2551ae9e6e88b838a3ba5dc1d6cd", title: "Staking Portal" },
    { link: "https://axion.network/pdf/axion-whitepaper.pdf", title: "Whitepaper" },
    { link: "https://axion.network/pdf/axion-audit.pdf", title: "Hacken Audit" },
    { link: "https://axion.network/pdf/certik-audit-report.pdf", title: "Certik Audit" },
]

const SOCIAL_LINKS = [
    { link: "https://axionnetwork.medium.com/", title: "Blog" },
    { link: "https://twitter.com/axion_network", title: "Twitter" },
    { link: "https://t.me/axionofficial", title: "Telegram" },
    { link: "https://discord.gg/axion", title: "Discord" },
    { link: "https://github.com/Rock-n-Block/axion-contracts", title: "GitHub" },
]

const VIDEO_LINKS = [
    { link: "https://www.youtube.com/watch?v=2i0pSmWL_hk&feature=youtu.be&ab_channel=CryptoBrick", title: "What is Axion?", length: "2:04" },
    { link: "https://www.youtube.com/watch?v=qfCftkf-svQ", title: "Axion Promotional Video", length: "0:29" },
    { link: "https://www.youtube.com/watch?v=hj5ZewGkAOA", title: "Axion Intro for Beginners", length: "11:00" },
    { link: "https://www.youtube.com/watch?v=B4lzW02pwew&ab_channel=AxionToken", title: "Whitepaper Explained", length: "50:29" },
]

const LIVE_CHARTS = [
    { link: "https://www.dextools.io/app/uniswap/pair-explorer/0xaadb00551312a3c2a8b46597a39ef1105afb2c08", title: "DexTools.io" },
    { link: "https://chartex.pro/?symbol=UNISWAP:AXN&theme=Dark", title: "ChartEx.pro" },
    { link: "https://www.coingecko.com/en/search?query=axion ", title: "CoinGecko" },
]

const openWindow = url => { 
    const newURL = url.includes("dextools") ? url : url + "?utm_source=AxionStats.info";
    window.open(newURL, "_blank") 
}

const LinkHeader = ({title}) => {
    return (
        <>
            <Divider variant="middle" style={{ margin: '2%' }} />
            <Typography variant="subtitle1" align="center" color="secondary" style={{ fontWeight: '400' }}>{title}</Typography>
            <Divider variant="middle" style={{ margin: '2%' }} />
        </>
    )
}

const CustomAccordion = ({title, children}) => {
    return (
        <Accordion className="accordianHues" elevation={6} style={{marginBottom: '2%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" color="textPrimary">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{display: 'block'}}>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

const FreeClaims = () => {
    const { usdtPerAxn } = useMarketData(false);

    return (
        <CustomAccordion title="How Do HEX Freeclaims Work?">
            <Typography variant="subtitle2" color="textSecondary">
                HEX Freeclaims will be available over a 350 day period, beginning at launch of mainnet.
                Each ETH address containing HEX on May 28th, 2020, staked or unstaked, will be able to claim <strong>free Axion</strong> at a value of 1:1 for your HEX balance with a <strong>maximum cap of 10 million tokens</strong>.
                At today's prices, that's up to ${Number(10000000 * usdtPerAxn).toLocaleString()}!
            </Typography>
            <br />
            <Typography variant="subtitle2" color="textSecondary">
                Day 1 claims will begin at a rate of 100% of your HEX balance, with each successive week decreasing by cumulative 2% (0.2857% penalty applied daily).
                If you missed the available freeclaim period (After Day 350), you would receive 0% (0 Axion) and all of your freeclaim amount would be sent to the auction pool.
            </Typography>
            <br />
            <Typography variant="subtitle1" align="center" color="textSecondary" style={{ border: '1px dashed rgba(0,0,0, 0.54)', borderRadius: '10px', padding: '1%' }}>
                Penalty = (HEX + Shares amount) * (days since freeclaim starts/350)
            </Typography>
            <br />
            <Typography variant="subtitle2" color="textSecondary">
                Example: If your ETH address contained Hex balance of 100,000 and you choose to claim on Day #1 you will receive 100,000 Axion and no Axion will be sent to the auction pool.
                If you wait to claim until Day #14 you would receive 96% or 96,000 Axion and remaining 4,000 Axion would be sent to the auction pool. Day #21 = 94%, Day #28 = 92%, and so on.
            </Typography>
            <br/>
            <Typography variant="subtitle2" className="textLink" style={{ fontWeight: '400' }} align="center" onClick={() => window.open("https://stake.axion.network/claim", "_blank")}>If you're eligible, the claim section will appear on this page.</Typography>
        </CustomAccordion>  
    )
}

const BigPayDays = () => {
    return (
        <CustomAccordion title="What Are Big Pay Days (BPD)?">
            <Typography variant="subtitle2" color="textSecondary">
                Axion has 5 different "BigPayDays".
                The concept of having a BigPayDay is to allocate the unclaimed freeclaim Axion tokens to the stakers at the BigPayDays. Each of these days is exactly 350 days apart.
                BigPayDay funding comes from 0.2857% (1/350) of the unclaimed Axion.
                            </Typography>
            <br />
            <Typography variant="subtitle2" color="textSecondary">
                On BigPayDays which happen once every year (for 5 years), all tokens in the BigPayDay pool are added to the Payout Pool for that day.
                Stakers who are staked on that day are entitled to payout based on how much of the share pool they own.
                            </Typography>
            <br />
            <Typography variant="subtitle2" color="textSecondary">
                Only stakes which are staked for periods above 350 days, and are active once BPD hits, will be eligible for the BigPayDay Payout.
                This means if you stake 3 days before the BPD, for a total period of at LEAST 350 days, you would be eligible for the BigPayDay, and will recieve that bonus when your stake ends.
                            </Typography>
            <LinkHeader title="Distribution Amounts" />
            <Typography variant="subtitle2" color="textSecondary" align="center">Year 1: 10% of the BPD Tokens are distributed</Typography>
            <Typography variant="subtitle2" color="textSecondary" align="center">Year 2: 15% of the BPD Tokens are distributed</Typography>
            <Typography variant="subtitle2" color="textSecondary" align="center">Year 3: 20% of the BPD Tokens are distributed</Typography>
            <Typography variant="subtitle2" color="textSecondary" align="center">Year 4: 25% of the BPD Tokens are distributed</Typography>
            <Typography variant="subtitle2" color="textSecondary" align="center">Year 5: 30% of the BPD Tokens are distributed</Typography>
        </CustomAccordion>
    )
}

const Links = () => {
    return (
        <CustomAccordion title="A Lot of Helpful Links...">
            <Grid container>
                <Grid item xs={12}><LinkHeader title="Official Links" /></Grid>
                {OFFICIAL_LINKS.map(l => <Grid item xs={6} key={l.title}><Typography onClick={() => openWindow(l.link)} align="center" variant="subtitle2" color="textSecondary" className="linksSectionLink">{l.title}</Typography></Grid>)}

                <Grid item xs={12}><LinkHeader title="Social Links" /></Grid>
                {SOCIAL_LINKS.map(l => <Grid item xs={6} key={l.title}><Typography onClick={() => openWindow(l.link)} align="center" variant="subtitle2" color="textSecondary" className="linksSectionLink">{l.title}</Typography> </Grid>)}

                <Grid item xs={12}><LinkHeader title="Videos from the Community" /></Grid>
                {VIDEO_LINKS.map(l => <Grid item xs={12} key={l.title}><Typography onClick={() => openWindow(l.link)} align="center" variant="subtitle2" color="textSecondary" className="linksSectionLinkDense">{l.title} ({l.length})</Typography></Grid>)}

                <Grid item xs={12}><LinkHeader title="Live Charts" /></Grid>
                {LIVE_CHARTS.map(l => <Grid item xs={6} key={l.title}><Typography onClick={() => openWindow(l.link)} align="center" variant="subtitle2" color="textSecondary" className="linksSectionLink">{l.title}</Typography></Grid>)}
            </Grid>
        </CustomAccordion>
    )
}

const Wallets = () => {
    return (
        <CustomAccordion title="Which Wallets Can I Use?">
            <Typography variant="subtitle2" color="textSecondary">
                Axion's mainnet token is ERC20. 
                Our recommended wallet would be <span className="textLink" onClick={() => openWindow("https://metamask.io/")}>Metamask</span> as it will be <strong>the only supported wallet initially</strong>. 
                Other wallets will be supported after. As for mobile users, use the Metamask mobile app.
            </Typography>
        </CustomAccordion>
    )
}

const Supply = () => {
    return (
        <CustomAccordion title="What is the Maximum Supply?">
            <Typography variant="subtitle2" color="textSecondary">
                Max supply of the presale token HEX2T is 250 Billion, which will be converted 1:1 on mainnet launch, and another 250 Billion will be allocated to HEX freeclaims &amp; auctions, for a initial total supply of 500 Billion Axion. 
            </Typography>
            <br/>
            <Typography variant="subtitle2" color="textSecondary">
                Following a seriously unfortunate event (the <span className="textLink" onClick={() => openWindow("https://cointelegraph.com/news/certik-dissects-the-axion-network-incident-and-subsequent-price-crash")}>exploit</span>), HEX3T was issued via airdrop after a rollback. Everyone holding HEX2T or AXN before the hack received 1:1 compensation in HEX3T. The only function of HEX3T is to convert it to AXN.
            </Typography>
            <br />
            <Typography variant="subtitle2" color="textSecondary">
                The additional 250B for freeclaims and auctions will enter the supply slowly. 
                The only other coins that will come into existence after distribution phase are the coins created by the 8% inflation rate, 100% of coins created through inflation are given to stakers.
            </Typography>
        </CustomAccordion>
    )
}

const Tokenomics = () => {
    return (
        <CustomAccordion title="Axion Tokenomics Overview">
            <Typography variant="subtitle2" color="textSecondary" style={{marginBottom: '2%'}}>If HEX3T converted Axion tokens go unclaimed, they go up for auction.</Typography>
            <Typography variant="subtitle2" color="textSecondary" style={{marginBottom: '2%'}}>Every week that HEX3T tokens go unconverted, the HEX3T holder loses 2% of the total amount they receive from conversion.</Typography>
            <Typography variant="subtitle2" color="textSecondary" style={{marginBottom: '2%'}}>This 2% is added into the auction.</Typography>
            <Typography variant="subtitle2" color="textSecondary" style={{marginBottom: '2%'}}>People can bid ETH into the auction pool to purchase the Axion. Whatever % of the auction pool value they have bid, that is the % of the Axion pool they will earn.</Typography>
            <Typography variant="subtitle2" color="textSecondary" style={{marginBottom: '2%'}}>80% of all ETH bid into the auction pool is used to buy back Axion tokens on exchanges, increasing the value.</Typography>
            <Typography variant="subtitle2" color="textSecondary" style={{marginBottom: '2%'}}>The tokens that are bought back, are then distributed to stakers.</Typography>
        </CustomAccordion>
    )
}

const LinksAndResources = () => {
    return (
        <div style={{ padding: '2%', paddingBottom: 0 }}>
            <Typography variant="h4" align="center" color="primary" style={{ fontWeight: '100' }}>Links &amp; FAQ</Typography>
            <Grid container spacing={2} style={{ width: '90%', margin: '2% auto' }}>
                <Grid item md={6} xs={12} container direction="column">
                    <Wallets/>
                    <Supply/>
                    <Links/>
                </Grid>
                <Grid item md={6} xs={12} container direction="column">
                    <FreeClaims />
                    <BigPayDays />
                    <Tokenomics/>
                </Grid>
            </Grid>
        </div>
    )
}

export default LinksAndResources;