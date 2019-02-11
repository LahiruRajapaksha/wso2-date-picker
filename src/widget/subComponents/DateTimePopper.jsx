import React, { Component } from 'react'
import { Popover, Grid, Button, Paper } from '@material-ui/core';
import CustomTimeRangeSelector from './CustomTimeRangeSelector';

export class DateTimePopper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      granularityModeValue: 'none',
    }
  }

  render() {
    const quickRangeButtons = ['1 Min', '15 Min', '1 Hour', '1 Day', '7 Days', '1 Month', '3 Months', '6 Months', '1 Year']
    const customRangeButtons = ['Second', 'Minute', 'Hour', 'Day', 'Month', 'year']
    return (
      <Popover
        id={"popper"}
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        onClose={this.props.onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Grid container style={{ maxWidth: 750, maxHeight: 420 }}>
          <Grid item xs={2} style={{ margin: 2, padding: 2 }}>
            <span>Quick ranges</span>
            {quickRangeButtons.map(quickRangeButton =>
              <Button
                style={{ fontSize: 10 }}
                onClick={() => this.props.savingPickedGranularity(quickRangeButton)}
              >
                {quickRangeButton}
              </Button>
            )}
          </Grid>
          <Grid item xs={9}>
            <span>Custom range </span>
            <Grid item style={{ margin: 2, padding: 2 }}>
              {customRangeButtons.map(customRangeButton =>
                <Button size="small" style={{ fontSize: 10 }}
                >
                  {customRangeButton}
                </Button>
              )}
            </Grid>
            <Grid item>
              <CustomTimeRangeSelector
                options={this.props.options}
                theme={this.props.muiTheme}
                onChangeCustom={this.props.onChangeCustom} />
            </Grid>
            <Grid item xs={9}>
              <Paper>Time</Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper>Refresh Every</Paper>
            </Grid>
            <Grid item>
              <Button variant="contained">Apply</Button>
            </Grid>
          </Grid>

        </Grid>
      </Popover >
    )
  }
}

export default DateTimePopper
