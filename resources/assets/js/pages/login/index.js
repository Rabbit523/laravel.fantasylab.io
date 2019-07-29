import {connect} from 'react-redux'
import Page from './Page'

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
        isAdmin : state.Auth.isAdmin,
    }
};

export default connect(mapStateToProps)(Page)