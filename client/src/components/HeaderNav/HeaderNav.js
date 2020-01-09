import React from 'react';
import './HeaderNav.sass';
import Modal from '../Modals/Modal';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Navigation from './Navigation/Navigation';
import ProfilePicCrop from '../PhotoCrop/ProfilePicCrop';

function popupModal(e){
    const button = e.target;
    const modalPopup = document.querySelector(`.modal-${button.getAttribute('data-modal')}`);
    if(!modalPopup.classList.contains("active")){
        modalPopup.classList.add("active");
    }
}
const HeaderNav =  (props) =>{
    const {user} = props;
    return(
        <React.Fragment>
            <div id = 'HeaderNav'>
                <div className = 'user-header'>
                    {user == null ? <LoginScreen LoginUser = {props.LoginUser} RegisterUser = {props.RegisterUser} /> : <UserLogged user = {user} logout = {props.logout} />}
                </div>
                {user == null? null :
                    <div className = 'navigation'>
                        <Navigation />
                    </div>
                }
            </div>
            {user == null ? null : <Modal name='change-profile-pic'><ProfilePicCrop changeUserPic = {props.changeProfilePic} user = {user} /></Modal>}
        </React.Fragment>
    )
}

const LoginScreen = (props) =>{
    return(
        <React.Fragment>
            <div className = 'login-portal'>
                <div className = 'login'>
                    <button onClick = {(e)=>popupModal(e)} id = 'login' data-modal = 'login'>Login</button>
                </div>
                <div className = 'sign-up'>
                    <button onClick = {(e)=>popupModal(e)} id = 'signUp' data-modal = 'sign-up'>Sign up</button>
                </div>
            </div>
            <Modal name='login'><Login LoginUser = {props.LoginUser} /></Modal>
            <Modal name = 'sign-up'><SignUp RegisterUser = {props.RegisterUser} /></Modal>
        </React.Fragment>
    )
}

const UserLogged = (props) =>{
    const { user } = props;
    function profilePicCropActivate(){
        document.querySelector(".modal.modal-change-profile-pic").classList.add("active");
    }
    return(
        <div className = 'user-logged-in'>
            <div className = 'left-side'>
                <div className = 'profile-pic'>
                    <img onClick = {profilePicCropActivate} src = {user.profilePic.url} alt = 'profile-pic'/>
                </div>
            </div>
            <div className = 'right-side'>
                <p className = 'user-name'>{user.name}</p>
                <p className = 'logout' onClick={props.logout}>Logout</p>
            </div>
        </div>
    )
}
export default HeaderNav;