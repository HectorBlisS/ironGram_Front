import React, {Component} from 'react'
import logo from '../../logo.svg'
import axios from 'axios'
import toastr from 'toastr'
import {uploadPic, getUserPics} from '../../services/userService'
import Gallery from './Gallery';


class Profile extends Component{

    state = {
        user:{},
        pics:[]
    }

    componentWillMount(){
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user) return this.props.history.push('/login')
        this.setState({user})
        //pedimos las fotos correspondientes al usuario
        this.getPics()
    }

    getPics = () => {
        getUserPics()
        .then(pics=>{
            this.setState({pics})
        })
        .catch(e=>toastr.error("no pude traer tus pics"))
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

    uploadPhoto = () => {
        this.refs.input.click()
    }

    onChangeFile = (e) => {
        console.log(e.target.files[0])
        uploadPic(e.target.files[0])
        .then(pic=>console.log(pic))
        .catch(e=>toastr.error('Error'))
    }

    render(){
        const {user, pics} = this.state
        return(
            <div>
                <img style={{borderRadius:'50%'}} src={user.photoURL || logo} width="200" alt="user"/>
                <h1>{user.username}</h1>
                <p>{user.email}</p>
                <button onClick={this.getPrivateInfo} >Bajate mi pack privado ;)</button>
                <input accept="image/*" onChange={this.onChangeFile} ref="input" hidden type="file" />
                <br/>
                <img style={{cursor:"pointer"}} width="100" onClick={this.uploadPhoto} src="https://cdn.onlinewebfonts.com/svg/img_212908.png" />
            
                <Gallery pics={pics} />
            </div>
        )
    }
}

export default Profile