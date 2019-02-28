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
    valueof: ''
  };
  startTime = Moment()
    .subtract(1, 'days')
    .toDate();
  endTime = new Date();
  myref = React.createRef();

  // getDefaultGranularity = () => {
  //   const { options } = this.props;
  //   const minGranularity = options.availableGranularities || 'From Second';
  //   let defaultGranularity = '';
  //   switch (minGranularity) {
  //     case 'From Second':
  //       defaultGranularity = 'second';
  //       break;
  //     case 'From Minute':
  //       defaultGranularity = 'minute';
  //       break;
  //     case 'From Hour':
  //       defaultGranularity = 'hour';
  //       break;
  //     case 'From Day':
  //       defaultGranularity = 'day';
  //       break;
  //     case 'From Month':
  //       defaultGranularity = 'month';
  //       break;
  //     case 'From Year':
  //       defaultGranularity = 'year';
  //       break;
  //     default:
  //     // do nothing
  //   }
  //   return defaultGranularity;
  // }

  getSelectedGranularities = () => {
    const { options } = this.props;
    let granularities = [];
    const minGranularity = options.availableGranularities || 'From Second';
    switch (minGranularity) {
      case 'From Second':
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
    // handleClose(); error saying this is not a function
    onChangeCustom('custom', this.startTime, this.endTime, customGranularityMode);
  }

  changeCustomRangeGranularity = (mode) => {
    this.setState({
      customGranularityMode: mode
    })
  }
  setCustomDateRange = (dateRange) => {
    this.startTime = dateRange[0].toDate()
    this.endTime = dateRange[1].toDate()
  }
  setCustomMonthRange = (monthRange) => {
    this.setState({
      valueOf: monthRange[0]
    })
    console.log('ref', this.myref.current)
    console.log('monthRange1', typeof monthRange)
    console.log('monthRange2', monthRange)

  }

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
          // <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          //   <MonthCalendar style={{ border: 0, }}
          //     onSelect={this.setCustomMonthRange}
          //   />
          //   <MonthCalendar style={{ border: 0, }}

          //   />
          // </div>
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
          <Button variant='outlined' style={footerButtons}
            onClick={this.publishCustomTimeRange}
          >
            Apply
          </Button>
          <Button variant='outlined' style={footerButtons}>Cancel</Button>
        </div>
      </div>
    );
  }
}
