import express from 'express'
import fs from 'fs'
import Joi from 'joi'
import avatarSchema from './avatar.schema.js'
import {v4 as uuid} from 'uuid'
import passport from 'passport'
import {Strategy} from 'passport-http-bearer'
import {BasicStrategy} from 'passport-http'
import bcrypt from "bcrypt";

import {isParent} from "./roles.js";
import {isChild} from "./roles.js";

const app = express()

const __dirname = "./src" //works for testing app.test.js
//const __dirname = "." //will work for postman

const user_file = fs.readFileSync(`${__dirname}/users.json`, 'utf-8')


passport.use(new BasicStrategy(
    async function(userid, password, done) {
        try{
            const users = JSON.parse(user_file)
            const user = users.find(user => user.userName === userid);
            if(user){
                const isCorrect = await bcrypt.compare(password, user.password)
                if(isCorrect){
                    done(null, user);
                }else{
                    done(null, false)
                }
            }else{
                done(null, false)
            }}
        catch (err){
            done(err);
        }
    }
))



app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.post('/api/avatars', passport.authenticate('basic', {session: false}), isParent, async (req, res) => {

    console.log(req.body)

    const {error, value} = avatarSchema.validate(req.body)

    if(error){
        res.status(400).send(error)
        return
    }
    const avatar = {
        id: uuid(),
        createdAt: new Date().toISOString(),
        avatarName: req.body.avatarName,
        childAge: req.body.childAge,
        skinColor: req.body.skinColor,
        hairstyle: req.body.hairstyle,
        headShape: req.body.headShape,
        upperClothing: req.body.upperClothing,
        lowerClothing: req.body.lowerClothing
    }

    console.log(avatar)
    try {
        const data = fs.readFileSync(`${__dirname}/avatars.json`)
        const currentAvatars = JSON.parse(data)

        currentAvatars.push(avatar)

        await fs.writeFileSync(`${__dirname}/avatars.json`, JSON.stringify(currentAvatars))
        res.status(201).set("Location", `/api/avatars/${avatar.id}`).send(avatar)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)

    }

})

app.get('/api/avatars', passport.authenticate('basic', {session: false}), isChild, async (req, res) => {
    try {
        const data = fs.readFileSync(`${__dirname}/avatars.json`);
        const avatars = JSON.parse(data)
        res.send(avatars)
    }
    catch (error) {
        console.error('Error:', error)
        res.sendStatus(500)
    }
})

app.get('/api/avatars/:id', (req, res) => {
    try {
        const data = fs.readFileSync(`${__dirname}/avatars.json`)
        const avatars = JSON.parse(data)

        const avatar = avatars.find(a => a.id === (req.params.id))

        if (!avatar) {
            return res.sendStatus(404)
        }
        res.send(avatar)

    } catch (error) {
        console.error('Error:', error)
        res.sendStatus(500)
    }
})

app.put('/api/avatars/:id', passport.authenticate('basic', {session: false}), isParent, async (req, res) => {
    try {
        const {error, value} = avatarSchema.validate(req.body, {abortEarly: false});

        if(error){
            res.status(400).send(error)
            return
        }


        const avatarId = req.params.id
        const data = fs.readFileSync(`${__dirname}/avatars.json`)
        let avatars = JSON.parse(data)

        const avatarIndex = avatars.findIndex(avatar => avatar.id === avatarId)
        if (avatarIndex === -1) {
            return res.sendStatus(404)
        }

        avatars[avatarIndex] = {
            ...avatars[avatarIndex], ...req.body
        }

        await fs.writeFileSync(`${__dirname}/avatars.json`, JSON.stringify(avatars))
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
})

app.delete('/api/avatars/:id', passport.authenticate('basic', {session: false}), isParent, async (req, res) => {
    try {
        const avatarId = (req.params.id)
        const data = fs.readFileSync(`${__dirname}/avatars.json`)
        let avatars = JSON.parse(data)

        const avatarIndex = avatars.findIndex(avatar => avatar.id === avatarId)
        if (avatarIndex === -1) {
            return res.sendStatus(404)
        }

        avatars.splice(avatarIndex, 1)

        await fs.writeFileSync(`${__dirname}/avatars.json`, JSON.stringify(avatars));
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
});

app.post('/api/users', passport.authenticate('basic', {session: false}), isParent, async (req, res) => {
    console.log(req.body)
    const {error, value} = avatarSchema.validate(req.body)

    if(error){
        res.status(400).send(error)
        return
    }
    const user = {
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password,
        roles: req.body.roles
    }
    console.log(user)
    try {
        const data = fs.readFileSync(`${__dirname}/avatars.json`)
        const currentAvatars = JSON.parse(data)
        currentAvatars.push(user)

        await fs.writeFileSync(`${__dirname}/avatars.json`, JSON.stringify(currentAvatars))
        res.status(201).set("Location", `/api/avatars/${user.id}`).send(user)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


export default app;