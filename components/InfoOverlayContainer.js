import React from 'react';
import InfoOverlay from './InfoOverlay';
import { EventEmitter } from 'fbemitter';

let status = null;
const emitter = new EventEmitter();

emitter.addListener('change', value => {
  status = value;
});

function updateStatus(status) {
  emitter.emit('change', status);
}

export default class InfoOverlayContainer extends React.Component {
  state = {
    status,
  };

  static updateStatus = updateStatus;

  componentWillMount() {
    this._subscription = emitter.addListener(
      'change',
      this._handleChangeStatus
    );
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  render() {
    return <InfoOverlay status={this.state.status} />;
  }

  _handleChangeStatus = status => {
    this.setState({ status });
  };
}
