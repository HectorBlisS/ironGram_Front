import React, {Component} from 'react'
import logo from '../../logo.svg'
import axios from 'axios'
import toastr from 'toastr'
import { getUserData } from '../../services/userService';


class PublicProfile extends Component{

    state = {
        user:{}
    }

    componentWillMount(){
       const {id} = this.props.match.params
       this.getUserData(id)
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

    render(){
        const {user} = this.state
        return(
            <div>
                <img style={{borderRadius:'50%'}} src={user.photoURL || logo} width="200" alt="user"/>
                <h1>{user.username}</h1>
                <p>{user.email}</p>
                <button onClick={this.getPrivateInfo} >Bajate mi pack privado ;)</button>

            </div>
        )
    }
}

export default PublicProfile