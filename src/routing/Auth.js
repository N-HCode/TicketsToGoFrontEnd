const Auth = {
    authenticated: false,
    //Arrow functions does not support this. So you need to use a function
    status: null,
    login: function () {
        this.authenticated = true;

    },
    logout: function () {this.authenticated = false},
}

export  {Auth}
