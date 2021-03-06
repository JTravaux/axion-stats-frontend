import React from 'react';
import { Grid, Button} from '@material-ui/core';
import Select from '../auctions/SelectBox';

// Icons
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const TableControls = ({
    sm,
    rows,
    page,
    gotoPage,
    rowStyle,
    pageSize,
    nextPage,
    pageIndex,
    pageCount,
    pageOptions,
    setPageSize,
    canNextPage,
    previousPage,
    canPreviousPage,
    hidePageSize,
    hidePageCount,
    hideResultCount
}) => {
    const changePageSize = ev => {
        setPageSize(Number(ev.target.value))
    }

    return (
        <div className="tableControls" style={{...rowStyle}}>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <Button size="small" color="secondary" title="First Page" variant="outlined" onClick={() => gotoPage(0)} disabled={!canPreviousPage}><SkipPreviousIcon style={{color: "#FFF"}}/></Button>&nbsp;
                    <Button size="small" color="secondary" title="Previous Page" variant="outlined" onClick={() => previousPage()} disabled={!canPreviousPage}><NavigateBeforeIcon style={{color: "#FFF"}}/></Button>
                </Grid>

                <Grid item container direction={sm ? "row" : 'column'} xs={4} justify="space-evenly" alignItems="center">
                    {!hidePageSize && (
                        <Grid item xs={12}>
                            <center>
                                <Select
                                    value={pageSize}
                                    onChange={changePageSize}
                                    data={[
                                        { value: 5, title: "5 per page" },
                                        { value: 10, title: "10 per page" },
                                        { value: 25, title: "25 per page" },
                                        { value: 9999, title: "Show All" }
                                    ]}
                                />
                            </center>
                        </Grid>
                    )}
                </Grid>
                
                <Grid item>
                    <Button size="small" color="secondary" title="Next Page" variant="outlined" onClick={() => nextPage()} disabled={!canNextPage}><NavigateNextIcon style={{color: "#FFF"}} /></Button>&nbsp;
                    <Button size="small" color="secondary" title="Last Page" variant="outlined" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><SkipNextIcon style={{color: "#FFF"}} /></Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default TableControls;