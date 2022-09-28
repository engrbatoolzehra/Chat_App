import firebase from '../../config/firebase'


const facebook_login = (history) => {
    return (dispatch) => {
        var provider = new firebase.auth.FacebookAuthProvider();


        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
  
    var token = result.credential.accessToken;

    var user = result.user;
    
    let create_user = {   
      name: user.displayName,
      email: user.email,
      profile: user.photoURL,
      uid: user.uid
    }

    firebase.database().ref('/').child(`users/${user.uid}`).set(create_user) //send data to firebase
    .then(()=>{
      dispatch({ type: "SETUSER", payload: create_user })
      alert("User login succesful!")
      history.push('/chat')
    })



    
})
  .catch(function (error) {
   
    var errorCode = error.code;
    var errorMessage = error.message;
   
    console.log("error" ,errorMessage)
  });
    }
}


const get_users = () => {
  return (dispatch) => {
    let users = [];
    firebase.database().ref('/').child('users').on('child_added', (data)=>{
      users.push(data.val())
      

    })
    dispatch({type: "SETFIREBASEUSERS", payload: users})

  }
}

export {
    // set_data,
    facebook_login,
    get_users
}