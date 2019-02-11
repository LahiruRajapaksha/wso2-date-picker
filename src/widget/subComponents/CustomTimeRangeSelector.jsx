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
import { MenuItem } from '@material-ui/core/MenuItem';
import Moment from "moment";
import { Grid } from '@material-ui/core';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import '../../../node_modules/rc-calendar/assets/index.css'
export default class CustomTimeRangeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputType: this.getDefaultGranularity(),
      invalidDateRange: false,
    };

    this.startTime = Moment()
      .subtract(1, 'days')
      .toDate();
    this.endTime = new Date();
  }

  getDefaultGranularity = () => {
    const { options } = this.props;
    const minGranularity = options.availableGranularities || 'From Second';
    let defaultGranularity = '';
    switch (minGranularity) {
      case 'From Second':
        defaultGranularity = 'second';
        break;
      case 'From Minute':
        defaultGranularity = 'minute';
        break;
      case 'From Hour':
        defaultGranularity = 'hour';
        break;
      case 'From Day':
        defaultGranularity = 'day';
        break;
      case 'From Month':
        defaultGranularity = 'month';
        break;
      case 'From Year':
        defaultGranularity = 'year';
        break;
      default:
      // do nothing
    }
    return defaultGranularity;
  }

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

  generateGranularityMenuItems = () => {
    return this.getSelectedGranularities().map(view => (
      <MenuItem value={view.toLowerCase()} primaryText={view} />
    ));
  }

  publishCustomTimeRang = () => {
    const { handleClose, onChangeCustom } = this.props;
    const { inputType } = this.state;
    handleClose();
    onChangeCustom('custom', this.startTime, this.endTime, inputType);
  }


  handleRangeChange = (range) => {
    console.log(range);
  }

  const
  render() {
    const { inputType } = this.state;
    const { theme } = this.props;
    return (
      <div style={{ fontSize: 13 }}>
        <RangeCalendar
          showToday={false}
          showDateInput={false}
        />
      </div>


      // {/* 
      //     {<DateTimePicker
      //       onChange={this.handleStartTimeChange}
      //       inputType={inputType}
      //       theme={theme}
      //       initTime={Moment().subtract(1, 'days')}
      //       inputName="startTime"
      //     />}
      //     <DateTimePicker
      //       onChange={this.handleEndTimeChange}
      //       inputType={inputType}
      //       theme={theme}
      //       initTime={Moment()}
      //       inputName="endTime"
      //       startTime={this.startTime}
      //     /> */}

      //         {
      //       this.state.invalidDateRange ? (
      //         <div style={{ color: '#dc3545', paddingTop: 10 }}>
      //           Invalid date range, Please select a valid date range.
      // {" "}
      //         </div>
      //       ) : (
      //         ''
      //       )
      //     }
      // {/* < RaisedButton
      //       primary
      //       style={{
      //         marginTop: 10,
      //         marginBottom: 10,
      //         float: 'right',
      //       }
      //       }
      //       disabled={this.state.invalidDateRange}
      //       onClick={this.publishCustomTimeRange}
      //     >
      //       Apply
      //     </RaisedButton> */}

    );
  }
}
