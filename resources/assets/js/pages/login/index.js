import {connect} from 'react-redux'
import Page from './Page'

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
        isAdmin : state.Auth.isAdmin,
        lang: state.Auth.lang
    }
};

export default connect(mapStateToProps)(Page)