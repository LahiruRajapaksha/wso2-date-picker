/* eslint-disable react/prop-types */
/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import Moment from "moment";
import { Button } from '@material-ui/core';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar'
import '../../../node_modules/rc-calendar/assets/index.css'
import TimePicker from './TimePicker';
import { convertHexToRGB } from 'material-ui/utils/colorManipulator';
import color from '@material-ui/core/colors/lightGreen';
import { orange } from '@material-ui/core/colors';
export default class CustomTimeRangeSelector extends React.Component {

  state = {
    // inputType: this.getDefaultGranularity,
    invalidDateRange: false,
    customGranularityMode: 'second',
  };
  startTime = Moment()
    .subtract(1, 'days')
    .toDate();
  endTime = new Date();

  getSelectedGranularities = () => {
    const { options } = this.props;
    let granularities = [];
    const minGranularity = options.availableGranularities || 'From Second';
    switch (minGranularity) {
      case 'From Second': this.state.monthRange[0], this.state.monthRange[1]
        granularities = ['Second', 'Minute', 'Hour', 'Day', 'Month', 'Year'];
        break;
      case 'From Minute':
        granularities = ['Minute', 'Hour', 'Day', 'Month', 'Year'];
        break;
      case 'From Hour':
        granularities = ['Hour', 'Day', 'Month', 'Year'];
        break;
      case 'From Day':
        granularities = ['Day', 'Month', 'Year'];
        break;
      case 'From Month':
        granularities = ['Month', 'Year'];
        break;
      case 'From Year':
        granularities = ['Year'];
        break;
      default:
      // do nothing
    }
    return granularities;
  }

  handleStartTimeChange = (date) => {
    this.startTime = date;
    if (
      Moment(this.startTime, 'YYYY-MM-DD HH:mm:ss.000').unix()
      >= Moment(this.endTime, 'YYYY-MM-DD HH:mm:ss.000').unix()
    ) {
      this.setState({ invalidDateRange: true });
    } else {
      this.setState({ invalidDateRange: false });
    }
  }

  handleEndTimeChange = (date) => {
    this.endTime = date;
    if (
      Moment(this.startTime, 'YYYY-MM-DD HH:mm:ss.000').unix()
      >= Moment(this.endTime, 'YYYY-MM-DD HH:mm:ss.000').unix()
    ) {
      this.setState({ invalidDateRange: true });
    } else {
      this.setState({ invalidDateRange: false });
    }
  }

  /*Publishing the custom time range
  onChangeCustom()=>handleGranularityChangeForCustom(mode, startTime, endTime, granularity)
  mode:custom
  granularity:second,minute,hour,day,month,year
  */
  publishCustomTimeRange = () => {
    const { handleClose, onChangeCustom } = this.props;
    const { customGranularityMode } = this.state;
    console.log('customGranularityMode', customGranularityMode)
    handleClose()
    onChangeCustom('custom', this.startTime, this.endTime, customGranularityMode);
  }

  /**
   * Change the granularity by setting the state
   * @param {String} mode:'second','minute', 'hour',etc
   */
  changeCustomRangeGranularity = (mode) => {
    this.setState({
      customGranularityMode: mode
    })
  }

  /**
   * Setting the date range which is selected form the calendar
   * @param {moment} dateRange
   */
  setCustomDateRange = (dateRange) => {
    this.startTime = dateRange[0].toDate()
    this.endTime = dateRange[1].toDate()
  }

  /**
   * Assigning the months to the start and end dates
   * @param {moment} month
   */
  setCustomMonthRange = (monthRange) => {
    this.startTime = new Date(monthRange[0].year(), monthRange[0].month())
    this.endTime = new Date(monthRange[1].year(), monthRange[1].month())
  }

  /**
   * Displaying the calender according to granularity :'second','minute' etc
   * Date calendar will show only for 'second','minute','hour','day' granularities
   * Month and year calendar show according to month and year granularities respectively
   */
  showCalendarModes = () => {
    const calendarMode = this.state.customGranularityMode
    switch (calendarMode) {
      case 'second':
      case 'minute':
      case 'hour':
      case 'day':
        return (
          <RangeCalendar
            mode={['date', 'date']}
            showClear={true}
            showToday={false}
            onSelect={this.setCustomDateRange}
          />
        );
        break;
      case 'month':
      case 'year':
        return (
          <RangeCalendar
            mode={[calendarMode, calendarMode]}
            showClear={true}
            showToday={false}
            onPanelChange={this.setCustomMonthRange}
          />
        );
        break;
    }

  }

  render() {
    const customRangeButtons = ['Second', 'Minute', 'Hour', 'Day', 'Month', 'Year']
    const { inputType } = this.state;
    const customRangeContainer = {
      display: 'flex',
      flexDirection: 'column'
    }
    const customRangeButtonContainer = {
      display: 'flex',
    }
    const customButtons = {
      fontSize: 10,
      margin: 5,
      padding: 0.5,
    }
    const calendar = {
      display: 'flex',
    }
    const timePicker = {
      display: 'flex',
      justifyContent: 'space-around',
    }
    const footerButtons = {
      ...customButtons,
      padding: 10
    }

    return (
      <div style={customRangeContainer} >
        <div style={customRangeButtonContainer} >
          {customRangeButtons.map((customRangeButtons, index) =>
            <Button
              key={index}
              variant="outlined"
              style={customButtons}
              onClick={() => this.changeCustomRangeGranularity(customRangeButtons.toLocaleLowerCase())}
            >
              {customRangeButtons}
            </Button>
          )}
        </div>
        <div style={calendar} ref={this.myref}>
          {this.showCalendarModes()}
        </div>
        <div style={timePicker}>
          <TimePicker
            onChange={this.handleStartTimeChange}
            inputType={this.state.customGranularityMode}
            initTime={Moment().subtract(1, 'days')}
            inputName="startTime"
            // theme={theme}
            initTime={Moment().subtract(1, 'days')}
          />
          <TimePicker
            onChange={this.handleStartTimeChange}
            inputType={this.state.customGranularityMode}
            initTime={Moment()}
            inputName="endTime"
            startTime={this.startTime}
            // theme={theme}
            initTime={Moment().subtract(1, 'days')}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant='outlined' style={footerButtons}
            onClick={this.publishCustomTimeRange}
          >
            Apply
          </Button>
          <Button
            variant='outlined'
            style={footerButtons}
            onClick={this.props.handleClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}
