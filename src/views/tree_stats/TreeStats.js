import React, { useEffect, useState } from 'react';
import { Typography, Card, CircularProgress, Accordion, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CountUp from 'react-countup';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import eden from '../../assets/img/eden.jpg';
import edenLoogo from '../../assets/img/eden-logo.png';
import { BASE_URL } from '../../constants';

const MESSAGE = {
    col1:[
        'I am wildly passionate about reforestation, biodiversity, saving animals, and creating a healthy and thriving planet for future generations. When I see plastics, pollutants, and deforestation running rampant in our world, animals dying, and ecosystems going extinct, it pains me more than anything else.',
        'Around the world, animals are helpless to the destructive effects of humanity. As a species, we have become the catalysts of mass - extinction, and it’s only going to get worse, unless we do something about it.',
        'I believe that reforestation is the key. Creating an ecosystem, where animals are free to live without human interference not only benefits the animals, but the soil, the frequency of rainfall, and can absolutely transform the landscape. Humans rely on animals a lot more than we’d like to admit, it’s in our best interest. Deserts can be turned into lush forests, it just takes intentional effort.',
    ],
    col2: [
        'This 1% does not affect anything involved in the Axion ecosystem, it is not part of the 80% for buybacks and staking, and it does not require anyone to donate, nor to have any opportunity-loss.',
        'Just know that when you enter that auction, you are not only carving out a better future for yourself, but for the world around you as well.'
    ]
}
const TreeStats = () => {
    const [numTrees, setNumTrees] = useState(0);
    const [amountDonated, setAmountDonated] = useState(0);
    const [ethDonated, setEthDonated] = useState(0);

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const isMedium = useMediaQuery(theme.breakpoints.down('md'));

    const _fetchTreeCount = async () => {
        let res = await fetch(`${BASE_URL}/auction/trees`);
        let res_json = await res.json();
        setNumTrees(res_json.trees)
        setAmountDonated(res_json.amount)
        setEthDonated(res_json.eth)
    }
    useEffect(() => {
        _fetchTreeCount();
    }, [])

    return (
        <div style={{ padding: '2%', paddingBottom: 0 }}>            
            <Typography variant="h4" align="center" color="secondary" style={{ fontWeight: '100' }}>Axion's Tree Pledge</Typography>
         
            <div style={{ width: isSmall ? '80%' : (isMedium ? '60%' : '40%'), margin: '2% auto'}}>

                          
                <Accordion className="accordianHues" elevation={6} style={{ marginTop: '2%' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" color="textPrimary">The Pledge</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: 'block' }}>
                        <Typography variant="subtitle2" color="primary" style={{ marginBottom: '2%', fontWeight: 400 }}>
                                I personally pledge that 1% of all ETH that goes into the auction will be donated to <span style={{ fontWeight: 'bold' }} className="textLink" onClick={() => window.open("https://edenprojects.org/", "_blank")}>The Eden Reforestation Project</span>,
                                where $0.10 ensures that a tree is planted, and cared for until full maturity. In the process, this employs thousands of
                                people living in poverty in developed nations, and gives them newfound hope in their lives. The Eden Reforestation Program is absolutely incredible.
                            </Typography>
                        {MESSAGE.col2.map(m => <Typography key={m} variant="subtitle2" color="primary" style={{ marginBottom: '2%', fontWeight: 400 }}>{m}</Typography>)}
                        <Typography variant="subtitle2" color="primary" style={{ marginBottom: '2%', fontWeight: 400 }}>I highly suggest giving <span style={{ fontWeight: 'bold' }} className="textLink" onClick={() => window.open("https://youtu.be/goKinj8ya-E", "_blank")}>this video</span> a watch.</Typography>
                        <Typography align="right" color="textPrimary" variant="subtitle2" style={{ fontWeight: 400 }}>~ Axion Founder, Jack (<span className="textLink" onClick={() => window.open("https://i.imgur.com/ZbIqRap.png", "_blank")}>source</span>)</Typography>
                    </AccordionDetails>
                </Accordion>
                  
                <Accordion className="accordianHues" elevation={6} style={{ marginTop: '4%' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" color="textPrimary">A Message From Axion's Founder</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: 'block' }}>
                        {MESSAGE.col1.map(m => <Typography key={m} variant="subtitle2" color="primary" style={{ marginBottom: '2%', fontWeight: 400 }}>{m}</Typography>)}
                        <Typography align="right" color="textPrimary" variant="subtitle2" style={{ fontWeight: 400 }}>~ Axion Founder, Jack (<span className="textLink" onClick={() => window.open("https://i.imgur.com/ZbIqRap.png", "_blank")}>source</span>)</Typography>
                    </AccordionDetails>
                </Accordion>

                <Card className="card accordianHues" elevation={6} style={{margin: '25px 0'}}>
                    <img src={eden} style={{ width: '100%' }} alt="card background" />
                    <div style={{ textAlign: 'center', padding: '1%' }}>
                        {amountDonated !== 0 && (<div style={{ margin: '2%', padding: '1%' }}>
                            <Typography variant="subtitle2" color="secondary" style={{ fontWeight: '400' }}>
                                Since November 14th of 2020, a total of <strong>{ethDonated.toLocaleString()} ETH</strong>&nbsp;({amountDonated.toLocaleString("en-US", { style: "currency", currency: "USD" })}) has been pledged to reforestation,
                                where $0.10 ensures that a tree is planted, and cared for until full maturity. 
                            </Typography>
                            <Typography variant="subtitle2" color="secondary" style={{ fontWeight: '400', margin: '2%' }}>
                                In the process, this employs thousands of people living in poverty in developed nations, and gives them newfound hope in their lives.
                            </Typography>
                        </div>)}
                    </div>
                </Card>
            </div>

         
        </div>
    )
}

export default TreeStats;