import React from 'react';
import { Card, CircularProgress, Divider, Typography } from "@material-ui/core";
import useDarkMode from 'use-dark-mode'

const AMOUNTS = {
    "Shrimp": {min: 1, max: 999, seperator: " to " },
    "Crabs": { min: 1000, max: 999999, seperator: " to " },
    "Fish": { min: 1000000, max: 9999999, seperator: " to " },
    "Octopuses": { min: 10000000, max: 49999999, seperator: " to " },
    "Dolphins": { min: 50000000, max: 99999999, seperator: " to " },
    "Tiger Sharks": { min: 100000000, max: 499999999, seperator: " to " },
    "Great Whites": { min: 500000000, max: 999999999, seperator: " to " },
    "Whales": { min: 1000000000, max: "", seperator: "+" }
}

const StatCard = ({ type, count, loading, emoji, isImage, src, imgWidth, total, ecoAxion, holders }) => {
    const darkMode = useDarkMode(false, { storageKey: "AxionStatsDark" });

    return(
        <Card className="card cardHue" elevation={darkMode.value ? 12 : 6}>
            {/* <img src={CardBG} width="100%" className="cardBG" alt="card background" /> */}

            <div style={{ textAlign: 'center', padding: '1%' }}>
                <div style={{margin: '1%'}}>
                    {isImage ? <img src={src} width={imgWidth} alt={type + "_logo"}/> : <Typography variant="h4">{emoji}</Typography>}
                </div>

                {loading ? <CircularProgress size={30} style={{ margin: '4% 0' }} /> : (
                    <div>
                        <Typography variant="h6" color="secondary" style={{ fontWeight: '400' }}>
                            {count?.toLocaleString()} {type}&nbsp;

                            {holders > 0 && (
                                <span style={{ fontWeight: '200', fontSize: '0.8rem', verticalAlign: 'middle' }}>
                                    ({(count / holders).toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 1 })})
                                </span>
                            )}
                        </Typography>

                        <Typography variant="subtitle1" color="secondary" style={{ fontWeight: '400' }}>
                            {total?.toLocaleString()} AXN&nbsp;

                            {ecoAxion > 0 && (
                                <span style={{ fontWeight: '200', fontSize: '0.7rem', verticalAlign: 'middle' }}>
                                    ({(total / ecoAxion).toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 })})
                                </span>
                            )}
                           
                        </Typography>

                        <Divider variant="middle" style={{margin: '2% auto', width: '75%'}}/>
                        <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400', fontStyle: 'italic' }}>
                            {`${AMOUNTS[type].min.toLocaleString()}${AMOUNTS[type].seperator}${AMOUNTS[type].max?.toLocaleString()} AXN`}
                        </Typography>
                    </div>
                )}
            </div>
          
        </Card>
    )
}

export default StatCard;