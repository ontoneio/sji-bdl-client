import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardHeader,
  CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

const ExpandableCard = (props) => {
  const reports = props.reports.map((report) => {
    return <Paper zDepth={3} rounded={false} key={report._id} >
      <Card className="card-container">
        <CardHeader
          title={report.title}
          titleStyle={{
            font: '3em "Open Sans"',
          }}
          subtitle="May 17, 2017"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          {report.content}
        </CardText>
      </Card>
    </Paper>
  });

  return (
    <ul>
      {reports}
    </ul>
  )
};

export default ExpandableCard;