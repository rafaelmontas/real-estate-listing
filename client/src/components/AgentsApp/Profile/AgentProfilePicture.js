import React from 'react'
import axios from 'axios';

class AgentProfilePicture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profilePicture: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    console.log(e.target.files[0])
    this.setState({profilePicture: e.target.files[0]}, () => {
      const formData = new FormData()
      formData.append('profileImg', this.state.profilePicture)
      axios.post('/agents/1/profile-pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
            .then(res => {
              console.log(res.data.msg)
            })
            .catch(err => {
              console.log(err.response.data.msg)
            })
    })
  }
  
  render() {
    return (
      <form>
        <input type="file" id="agent-profile-picture"
               onChange={this.handleChange}
               accept="image/*" />
        <label htmlFor="agent-profile-picture">Editar</label>
      </form>
    )
  }
}

export default AgentProfilePicture