const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const verifyCallback = async (username, password, done) => {
    
}

const strategy = LocalStrategy(verifyCallback);