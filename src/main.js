const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.post('/api/avatars', async (req, res) => {
    console.log(req.body)
    const avatar = {
        id: Date.now(),
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
        const data = fs.readFileSync(`${__dirname}/public/avatars.json`)
        const currentAvatars = JSON.parse(data)

        currentAvatars.push(avatar)

        await fs.writeFileSync(`${__dirname}/public/avatars.json`, JSON.stringify(currentAvatars))
        res.status(201).set("Location", `/api/avatars/${avatar.id}`).send(avatar)
    }
    catch (error) {
        res.sendStatus(500)
    }
})

app.get('/api/avatars', async (req, res) => {
    try {
        const data = fs.readFileSync(`${__dirname}/public/avatars.json`);
        const avatars = JSON.parse(data)
        res.send(avatars)
    }
    catch (error) {
        console.error('Error:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/api/avatars/:id', (req, res) => {
    try {
        const data = fs.readFileSync(`${__dirname}/public/avatars.json`)
        const avatars = JSON.parse(data)

        const avatar = avatars.find(a => a.id === parseInt(req.params.id))

        if (!avatar) {
            return res.sendStatus(404)
        }

        res.send(`<h1>Avatar Details</h1>
                  <p>Name: ${avatar.avatarName}</p>
                  <p>Age: ${avatar.childAge}</p>
                  <p>Skin Color: ${avatar.skinColor}</p>
                  <p>Hairstyle: ${avatar.hairstyle}</p>
                  <p>Head Shape: ${avatar.headShape}</p>
                  <p>Upper Clothing: ${avatar.upperClothing}</p>
                  <p>Lower Clothing: ${avatar.lowerClothing}</p>`)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.put('/api/avatars/:id', async (req, res) => {
    try {
        const avatarId = parseInt(req.params.id)
        const data = fs.readFileSync(`${__dirname}/public/avatars.json`)
        let avatars = JSON.parse(data)

        const avatarIndex = avatars.findIndex(avatar => avatar.id === avatarId)
        if (avatarIndex === -1) {
            return res.sendStatus(404)
        }

        avatars[avatarIndex] = {
            ...avatars[avatarIndex], ...req.body
        }

        await fs.writeFileSync(`${__dirname}/public/avatars.json`, JSON.stringify(avatars))
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
})

app.delete('/api/avatars/:id', async (req, res) => {
    try {
        const avatarId = parseInt(req.params.id)
        const data = fs.readFileSync(`${__dirname}/public/avatars.json`)
        let avatars = JSON.parse(data)

        const avatarIndex = avatars.findIndex(avatar => avatar.id === avatarId)
        if (avatarIndex === -1) {
            return res.sendStatus(404)
        }

        avatars.splice(avatarIndex, 1)

        await fs.writeFileSync(`${__dirname}/public/avatars.json`, JSON.stringify(avatars));
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
});


app.listen(3001, () => {
    console.log('Server is running...')
})
