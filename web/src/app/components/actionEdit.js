import React, { Component } from 'react';
import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import ModeEditor, { Avatar } from '../../../modes';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ActionDelete from 'material-ui/svg-icons/action/highlight-off';
import pick from 'lodash/pick';

class ActionEdit extends Component {
	render() {
		var deleteIcon = {
				position: 'absolute',
				right: 0,
				bottom: 18
			},
			title = this.props.action;

		if ( this.props.duration ) {
			title += ' for ' + this.props.duration / 1000 + ' seconds';
		}
		title += ' on ' + this.props.id;

		return (
			<Card key={ this.props.index } style={ { marginTop: '20px' }} >
				<CardHeader
					title={ title }
					actAsExpander={ true }
					showExpandableButton={ true }
					avatar={ <Avatar { ...pick( this.props, [ 'state', 'mode' ] ) }>{ this.props.index }</Avatar> }
				/ >
				<CardText expandable={ true }>
					{ 	this.props.duration ?
						<TextField
							defaultValue={ this.props.duration }
							floatingLabelText="Duration (ms)"
							floatingLabelFixed={true}
							onChange={ ( e, val ) => {
								if ( val && val !== '' ) {
									this.props.dispatch( { duration: val } );
								}
							} }
						/> : <span></span>
					}
					<ModeEditor mode={ this.props.mode } fetching={ false } dispatch={ ( color ) => this.props.dispatch( { state: color } ) } state={ this.props.state } />
				</CardText>
				<CardActions expandable={ true }>
					<FlatButton style={ deleteIcon } label='Delete' onTouchTap={ this.props.delete } icon={ <ActionDelete /> } />
				</CardActions>
			</Card>
			);
	}
}

export default ActionEdit;

