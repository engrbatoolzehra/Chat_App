import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { facebook_login } from '../../store/action'


 class Home extends React.Component {
    
    // static getDerivedStateFromProps(props, state){
    //     console.log("props==>",props)
    //     return{

    //     }
    // }
    render(){
        return (
            <div>
                <h1>Home</h1>
                <button onClick={() => this.props.facebook_login(this.props.history)}>FACEBOOK LOGIN</button>
               
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users,
})

const mapDispatchToProps = (dispatch) => ({
    // set_data: (data) => dispatch(set_data(data)),
    facebook_login: (history) => dispatch(facebook_login(history)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
