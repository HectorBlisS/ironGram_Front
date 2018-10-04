import React, {Component} from 'react'
import logo from '../../logo.svg'


class Profile extends Component{

    state = {
        user:{}
    }

    componentWillMount(){
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user) return this.props.history.push('/login')
        this.setState({user})
    }

    render(){
        const {user} = this.state
        return(
            <div>
                <img style={{borderRadius:'50%'}} src={user.photoURL || logo} width="200" alt="user"/>
                <h1>{user.username}</h1>
                <p>{user.email}</p>

            </div>
        )
    }
}

export default Profile