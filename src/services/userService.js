import axios from 'axios'

const url = "http://localhost:3000/"

export const getUserData = (id) => {
    return axios.get(url + 'users/' + id)
    .then(res=>{
        return res.data
    })
    .catch(e=>e)
}

export const uploadPic = (file) => {
    const form = new FormData
    form.append('file', file)
    const token = localStorage.getItem('token')
    return axios.post(url + 'pictures/', form, {
        headers:{
            "Authorization":token
        }
    })
    .then(picture=>picture)
    .catch(e=>e)
}