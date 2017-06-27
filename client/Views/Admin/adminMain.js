import React, {Component}  from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router'
import axios from 'axios';

import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover/Popover';
import RaisedButton from 'material-ui/RaisedButton';

import AdminResourceForm from './adminResourceForm'
import Footer from '../../footer'
import ReportsTable from './reportsTable'
import Header from '../../header'

export default class AdminMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      open: false,
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom',
      },
      targetOrigin: {
        horizontal: 'left',
        vertical: 'bottom',
      },
    }

    this.fetchReports = this.fetchReports.bind(this);
  }

  fetchReports() {
    const jwt = sessionStorage.getItem('auth');

    const config = {
      headers: { 'x-auth': jwt }
    }

    axios.get('https://sj-bdl-api.herokuapp.com/api/admins/reports', config)
      .then((response) => {
        this.setState({
          reports: response.data
        })
      })
      .catch((error) => {
        console.log('There was an error ', error)
      })
  }

  componentDidMount() {
    this.fetchReports()
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  setAnchor = (positionElement, position) => {
      const {anchorOrigin} = this.state;
      anchorOrigin[positionElement] = position;

      this.setState({
        anchorOrigin: anchorOrigin,
      });
    };

    setTarget = (positionElement, position) => {
      const {targetOrigin} = this.state;
      targetOrigin[positionElement] = position;

      this.setState({
        targetOrigin: targetOrigin,
      });
    };

  render() {

    return (
      <div>
        <ReportsTable reports={this.state.reports} fetchReports={this.fetchReports} />
        <RaisedButton
          label="Add Resource"
          primary={true}
          onTouchTap={this.handleTouchTap}
        />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={this.state.anchorOrigin}
            targetOrigin={this.state.targetOrigin}
            onRequestClose={this.handleRequestClose} >
            <AdminResourceForm />
          </Popover>
        <Link to="/"><RaisedButton
          label="Log Out"
          primary={false} /></Link>
      </div>
    )
  }

}