import { loginUser } from '../lib/auth'
import Router from 'next/router'

class LoginForm extends React.Component {

    state = {
        email: 'Sincere@april.biz',
        password: 'hildegard.org',
        error: '',
        isLoading: false
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({ isLoading: true, error: ''})

        const { email, password } = this.state

        loginUser(email, password).then(() => {
            Router.push('/profile')
        })
        .catch(this.handleError)
    }

    handleError = err => {
        console.log('error', err)
        const error = (err.response && err.response.data) || err.message

        this.setState({ isLoading: false, error })
    }

    render() {

        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <div><input type="email" name="email" placeholder="email" 
                onChange={this.handleChange} value={this.state.email} /></div>

                <div><input type="password" name="password" placeholder="password" 
                onChange={this.handleChange} value={this.state.password} /></div>

                <button type="submit" disabled={this.state.isLoading}>
                    {this.state.isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            { this.state.error && <p>{this.state.error}</p> }
            </div>
        )
    }
}

export default LoginForm