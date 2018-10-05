import React, {Component} from 'react'
import logo from '../../logo.svg'
import axios from 'axios'
import toastr from 'toastr'
import { getUserData, toggleFollow } from '../../services/userService';
import Gallery from '../auth/Gallery';


class PublicProfile extends Component{

    state = {
        user:{pictures:[]},
        loggedUser:{}
    }

    componentWillMount(){
       const {id} = this.props.match.params
       this.getUserData(id)
       const user = JSON.parse(localStorage.getItem('user'))
       this.setState({loggedUser:user})
    }

    getUserData = (id) => {
        getUserData(id) //esto es un servicio
        .then(user=>{
            this.setState({user})
        })
        .catch(e=>toastr.error("no se pudo, intenta mas tarde"))
    }

    getPrivateInfo = () => {
        axios.get('http://localhost:3000/private', {
            headers:{
                "Authorization" : localStorage.getItem('token') 
            }
        })
        .then(res=>{
            console.log(res)
        })
        .catch(e=>toastr.error("algo falló", e.message))
    }

    doFollow =() => {
        toggleFollow(this.state.user._id)
        .then(user=>{
            this.setState({loggedUser:user})
        })
        .catch(e=>toastr.error("No se puede seguir"))
    }

    render(){
        const {user, loggedUser} = this.state
        const follow = loggedUser.following.find(id=>id === user._id)
        console.log(user)
        return(
            <div>
                <img style={{borderRadius:'50%'}} src={user.photoURL || logo} width="200" alt="user"/>
                <br/>
                <button onClick={this.doFollow} >{follow ? "Unfollow" : "Follow"}</button>
                <h1>{user.username}</h1>
                <p>{user.email}</p>
                <button onClick={this.getPrivateInfo} >Bajate mi pack privado ;)</button>
                
                <Gallery pics={user.pictures} />
            </div>
        )
    }
}

export default PublicProfile