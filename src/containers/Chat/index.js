import React from 'react'
import { connect } from 'react-redux'
import {get_users} from '../../store/action'
import firebase from '../../config/firebase'



class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            chat_user: {},
            chats: [],
            message: ""
        }
    }

    chat = (user) => {
        this.setState({
            chat_user: user
        })
        let current_user = this.props.current_user;
        let merge_uid = this.uid_merge(current_user.uid, user.uid);
        this.get_messages(merge_uid)
        

    }

    get_messages=(uid)=>{
        firebase.database().ref('/').child('chats/${uid}').on('child_added',(messages)=>{
            this.state.chats.push(messages.val())
            this.setState({
                chats: this.state.chats
            })
        })
    }


    componentDidMount(){
        this.props.get_users()
    }

    uid_merge(uid1, uid2) {
        if (uid1 < uid2) {
            return uid1 + uid2
        } else{
            return uid2 + uid1
        }
    }

    send_message= ()=>{
        let user = this.props.current_user;
        let chat_user = this.state.chat_user;
        let merge_uid = this.uid_merge(user.uid,chat_user.uid);

        firebase.database().ref('/').child(`chats/${merge_uid}`).push({
            message: this.state.message,
            name: user.name,
            uid: user.uid

        })
                           
        this.setState({
            message: ""
        })
    }
    render() {
       let user = this.props.current_user;
        return (
            <div>
                <h4>Welcome! {user.name}</h4>
                <img src={user.profile} alt="" />
                <h6>Email: {user.email}</h6>
                <div style={{sisplay: 'flex'}}>
                    <div style={{backgroundColor: "grey"}}>
                        <h4>Chat Users:</h4>
                        <ul>
                        {this.props.users.map((v,i)=>{
                            return v.uid !== user.uid && <li key={i}>
                                <img src={v.profile} alt="" width="20" /> 
                                {v.name} <button onClick={() => this.chat(v)}>Chat</button></li>
                        })}
                        </ul>
                    </div>
                    <div style={{width: 400 ,backgroundColor: "yellow "}}>
                        <h4>Chat</h4>
                        {Object.keys(this.state.chat_user).lenght ?
                        <div>
                                 
                            <h4><img src={this.state.chat_user.profile} alt="" width="20" />{this.state.chat_user.name}</h4>
                            <ul>
                                {this.state.chats.map((v,i) => {
                                    return <li style={{color: v.uid === user.uid ? "red" : "green"}} key={i}>{v.message}</li>
                                })}
                            </ul>
                            <input value={this.state.message} onChange={(e)=>this.setState({message: e.target.value})} type="text"  placeholder="Enter your message"/>
                
                        <button onClick={() => this.send_message()}>Send</button>

                        </div>
                        :
                        <h4>No User</h4>

                        
                    }

                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    current_user: state.current_user,
    users: state.users
})

const mapDispatchToProps = (dispatch) => ({
    get_users: () => dispatch(get_users())
   
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
