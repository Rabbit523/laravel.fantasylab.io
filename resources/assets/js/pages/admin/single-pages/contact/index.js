import {connect} from 'react-redux'
import Page from './Page'

const mapStateToProps = (state) => {
    return {
        lang: state.Auth.lang
    }
};

export default connect(mapStateToProps)(Page);