import React, { Component } from 'react'
import { Popover, Grid, Button, Typography } from '@material-ui/core';
import { black } from 'material-ui/styles/colors';
import CustomTimeRangeSelector from './CustomTimeRangeSelector';

export class DateTimePopper extends Component {

  state = {
    granularityModeValue: 'none',
    calendarMode: 'date',
    timeGranularityMode: 'second'
  }

  render() {
    const { onChangeCustom, onClose } = this.props
    const quickRangeButtons = ['1 Min', '15 Min', '1 Hour', '1 Day', '7 Days', '1 Month', '3 Months', '6 Months', '1 Year']
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
        style={{ height: 550 }}
      >
        <Grid container
          style={{ maxWidth: 630, height: 445 }}
        >
          <Grid item xs={2}>
            <Typography style={{ fontSize: 14, padding: 0.5, margin: 4 }}>Quick Ranges</Typography>
            {quickRangeButtons.map((quickRangeButtons, index) =>
              <Button
                key={index}
                variant="outlined"
                onClick={() => this.props.changeQuickRangeGranularities(quickRangeButtons)}
                style={{
                  fontSize: 10,
                  margin: 4,
                  padding: 0.5
                }}
              >
                {quickRangeButtons}
              </Button>
            )}
          </Grid>
          <Grid item xs={10}>
            <Typography style={{ fontSize: 14, padding: 0.5, margin: 4 }}>Custom Ranges</Typography>
            <CustomTimeRangeSelector
              onChangeCustom={onChangeCustom}
              handleClose={onClose}
            />
          </Grid>
        </Grid>
      </Popover >
    )
  }
}
export default DateTimePopper
