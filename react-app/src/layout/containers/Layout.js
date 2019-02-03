import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  layoutExample,
  layoutMap,
  incrementalSearch,
  layoutStart,
  layoutStop,
} from '../actions';
import { Layout } from '../components/Layout';

function mapStateToProps(state) {
  return {
    layout: state.layout,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    layoutExample,
    layoutMap,
    incrementalSearch,
    layoutStart,
    layoutStop,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
