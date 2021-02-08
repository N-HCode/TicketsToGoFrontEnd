const Auth = {
    authenticated: false,
    login: () => {this.authenticated = true},
    logout: () => {this.authenticated = false},
}

export default Auth
