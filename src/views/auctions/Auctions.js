import React, { useMemo } from 'react';
import moment from 'moment';
import Header from '../header/Header.js';
import { Card, CircularProgress, Grid, Typography } from '@material-ui/core';
import useAuctionData from '../../hooks/useAuctionData.js';
import { useSortBy, useTable, usePagination } from 'react-table';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import TableControls from './TableControls.js';
import StatCard from './AuctionStatCard.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const Auctions = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { auctions, currentAuction } = useAuctionData();
    const {
        rows,
        page,
        gotoPage,
        nextPage,
        pageCount,
        prepareRow,
        setPageSize,
        pageOptions,
        canNextPage,
        previousPage,
        headerGroups,
        canPreviousPage,
        state: { pageIndex, pageSize }
    } = useTable({
        initialState: {
            pageIndex: 0, 
            pageSize: 10, 
            sortBy: [{ id: 'id', desc: true }] 
        },
        data: useMemo(() => auctions || [], [auctions]),
        columns: useMemo(() => [
            { Header: 'ID', accessor: 'id', width: 2 },
            { Header: 'Start', accessor: 'start', width: 2 },
            { Header: 'End', accessor: 'end', width: 2 },
            { Header: 'AXN Pool', accessor: 'axn', width: 2 },
            { Header: 'ETH Pool', accessor: 'eth', width: 2 },
        ], []),
    }, useSortBy, usePagination)

    const tableProps = {
        rows,
        page,
        gotoPage,
        pageSize,
        nextPage,
        pageIndex,
        pageCount,
        setPageSize,
        pageOptions,
        canNextPage,
        previousPage,
        canPreviousPage,
    }

    return (
        <div>
            <Header/>

            {/* C U R R E N T  */}
            <div style={{ margin: '2% auto' }}>
                <Typography variant="h4" align="center" color="secondary" style={{ fontWeight: '100' }}>Today's Auction</Typography>
                <Typography color="textPrimary" variant="subtitle2" style={{ fontWeight: 100 }} align="center">Last Updated: {moment(currentAuction.timestamp).format("MMM Do, YYYY h:mm a")}</Typography>
            </div>

            <div style={{ margin: '2%' }}>
                <Grid container spacing={3} justify="center">
                    <Grid item lg={4} md={6} xs={10}>
                        <StatCard stat="AXN Pool" amount={currentAuction.axn} suffix="AXN" loading={!currentAuction.axn} />
                    </Grid>
                    <Grid item lg={4} md={6} xs={10}>
                        <StatCard stat="ETH Pool" amount={currentAuction.eth} suffix="ETH" loading={!currentAuction.eth} />
                    </Grid>
                    <Grid item lg={4} md={6} xs={10}>
                        <StatCard stat="Next Weekly Auction" amount={currentAuction.next_weekly} suffix="AXN" loading={!currentAuction.next_weekly} />
                    </Grid>
                </Grid>
            </div>

            <div style={{ margin: '2% auto' }}>
                <Typography variant="h4" align="center" color="secondary" style={{ fontWeight: '100' }}>Past/Future Auctions</Typography>
                <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: '400' }} align="center">Below is a sortable table containing all past Axion auctions along with tomorrow's.</Typography>
            </div>

            <div style={{ padding: '0 2%', margin: '0 auto', marginBottom: '2%' }}>
                {/* H E A D E R */}
                {headerGroups.map(({ headers }) => (
                    <Grid container key="container" justify="space-between" className="tableControls">
                        {headers.map((header, idx) => (
                            <Grid item container direction="row" xs={2} key={header + " " + idx} alignItems="center" justify="center">
                                <Grid item>
                                    <Typography variant="subtitle1" {...header.getHeaderProps(header.getSortByToggleProps())} style={{ color: '#FFF', cursor: 'pointer' }} >{header.Header}</Typography>
                                </Grid>

                                {!isMobile && (
                                    <Grid item>
                                        {header.isSorted
                                            ? header.isSortedDesc
                                                ? <KeyboardArrowDownIcon style={{ fontSize: '20px', marginLeft: '5px', color: "#FFF" }} />
                                                : <KeyboardArrowUpIcon style={{ fontSize: '20px', marginLeft: '5px', color: "#FFF" }} />
                                            : ''}
                                    </Grid>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                ))}

                {/* A U C T I O N S */}
                {auctions.length === 0 && (
                    <div style={{ margin: '5% auto' }}>
                        <center>
                            <CircularProgress color="primary" size={30} />
                        </center>
                    </div>
                )}

                {auctions.length > 0 && page.map((row, idx) => {
                    prepareRow(row)
                    const NOW = Date.now()
                    const CURRENT = NOW > Number(row.values.start) * 1000 && NOW < Number(row.values.end) * 1000;
                    return (
                        <Card elevation={6} key={row.id} className="stakeRow" style={{ margin: '1% 0', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0.05)', border: CURRENT ? "2px solid var(--primary-main-color)" : "" }}>
                            <Grid container justify="space-between" key={row.id} alignItems="center">
                                <Grid item xs={2}>
                                    <Typography color="textPrimary" variant="subtitle2" align="center">{row.values.id}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography color="textPrimary" variant="subtitle2" align="center">
                                        {isMobile ? moment.unix(row.values.start).format("MM/DD/YYYY") : moment.unix(row.values.start).format("MMM Do, YYYY h:mm a")}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography color="textPrimary" variant="subtitle2" align="center">
                                        {isMobile ? moment.unix(row.values.end).format("MM/DD/YYYY") : moment.unix(row.values.end).format("MMM Do, YYYY h:mm a")}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography color="textPrimary" variant="subtitle2" align="center">
                                        {isMobile ? Math.round(row.values.axn).toLocaleString() : row.values.axn.toLocaleString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography color="textPrimary" variant="subtitle2" align="center">
                                        {isMobile ? Number(row.values.eth).toFixed(1).toLocaleString() : row.values.eth.toLocaleString()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    )
                })}

                <TableControls {...tableProps} />
            </div>
        </div>
    )
}

export default Auctions;