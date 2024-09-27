'use strict';
import { User } from "../models/index.js"; // Adjust the path as necessary

const getUsers = (res) => {
    // finds all users
    User.find({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        }); 
};

const createUser = (data, res) => {
    // creates a new user using JSON data POSTed in request body
    console.log(data);
    new User(data).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const updateUser = (req, res) => {
    // updates the user matching the email from the param using JSON data POSTed in request body
    console.log(req.body);
    User.findOneAndUpdate({ email_id: req.params.email_id }, req.body, { new: true })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const deleteUser = (req, res) => {
    console.log({ email_id: req.params.email_id });
    // deletes the user matching the email from the param
    User.findOneAndDelete({ email_id: req.params.email_id })
        .then(data => {
            if (data) {
                res.send({ result: 200, data: data });
            } else {
                res.send({ result: 404, message: 'User not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

export {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};

