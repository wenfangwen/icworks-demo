import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from '../actions/user';

export default connect(
  state => state.user,
  dispatch => bindActionCreators(action, dispatch)
);
