const basicAuth = require('express-basic-auth');

const users = {
    'username': 'password',
    'username2': 'password2',
    'username3': 'password3',
    'username4': 'password4',

};

const basicAuthMiddleware = basicAuth({
    users,
    unauthorizedResponse: 'Unauthorized Access'
});

module.exports = basicAuthMiddleware;
