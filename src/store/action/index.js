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


export {
    // set_data,
    facebook_login
}