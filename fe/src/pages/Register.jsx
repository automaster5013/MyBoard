import { Component } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8000/users/register/'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            error: null,
            success: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const target = event.target
        this.setState({
            [target.name]: target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ error: null, success: false })

        axios
            .post(API_URL, {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                password2: this.state.password2,
            })
            .then((response) => {
                console.log(response.data)
                this.setState({ success: true })
            })
            .catch((err) => {
                const data = err.response?.data
                this.setState({
                    error: typeof data === 'object' ? JSON.stringify(data) : '회원가입에 실패했습니다.',
                })
            })
    }

    render() {
        const { username, email, password, password2, error, success } = this.state

        return (
            <div className="register">
                <h1>회원가입</h1>
                {success && <p className="success">회원가입이 완료되었습니다.</p>}
                {error && <p className="error">{error}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        사용자명
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                    <label>
                        이메일
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                    <label>
                        비밀번호
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                    <label>
                        비밀번호 확인
                        <input
                            type="password"
                            name="password2"
                            value={password2}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                    <button type="submit">가입하기</button>
                </form>
            </div>
        )
    }
}

export default Register
