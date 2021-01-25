const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];  //contain all origins
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;

    // if incoming request header contains an origin feed,check whitelist
    if(whitelist.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin: true }; // origin in incoming request is in whitelist.
    }
    else{
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors(); //reply back with access control allowOrigin with the wild cards toll
exports.corsWithOptions = cors(corsOptionsDelegate);