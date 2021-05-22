const Auth = {
    authenticated: false,
    //Arrow functions does not support this. So you need to use a function
    login: function (userData) {
        this.authenticated = true;
        this.userData = userData;

    },
    logout: function () {this.authenticated = false},
    userData: null
}

export  {Auth}
