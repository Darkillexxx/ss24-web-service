import {jest, test, expect, describe} from "@jest/globals";
import app from './app.js'
import request from "supertest";
describe('avatar api', () =>{
    const TEST_DATA = {
        "avatarName": "max",
        "childAge": 8,
        "skinColor": "#ffff00",
        "hairstyle": "bald",
        "headShape": "round",
        "upperClothing": "shirt",
        "lowerClothing": "shorts"
    }
    const TEST_USER = {
        "name": "alex",
        "userName": "alex@home.edu",
        "password": "1234"
    }
    test('create avatar', async () =>{
        const createResponse = await request(app)
            .post('/api/avatars')
            .auth('maria@home.edu', '123')
            .send(TEST_DATA)
            .set('Accept', 'application/json')
            .expect(201);
        expect(createResponse.body).toMatchObject(TEST_DATA)
        expect(createResponse.body.createdAt).toBeDefined()

        const newAvatarId = createResponse.body.id

        const getOneResponse = await request(app)
            .get(`/api/avatars/${newAvatarId}`)
            .auth('maria@home.edu', '123')
            .set('Accept', 'application/json')
            .expect(200);
        expect(getOneResponse.body).toMatchObject(TEST_DATA)
    })

    test('get all', async () =>{
        const getAllResponse = await request(app)
        .get(`/api/avatars`)
        .set('Accept', 'application/json')
        .expect(200);

        const createResponse = await request(app)
            .post('/api/avatars')
            .send(TEST_DATA) // x-www-form-urlencoded upload
            .set('Accept', 'application/json')
            .expect(201);

        const getAllWithNewResponse = await request(app)
            .get(`/api/avatars`)
            .set('Accept', 'application/json')
            .expect(200)
            expect(getAllResponse.body.length + 1).toEqual(getAllWithNewResponse.body.length)
            expect(getAllWithNewResponse.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: createResponse.body.id
                    })
                ])
            )
    })

    test('delete by id', async () =>{
        const getAllResponse = await request(app)
            .get(`/api/avatars`)
            .set('Accept', 'application/json')
            .expect(200);

        const createResponse = await request(app)
            .post('/api/avatars')
            .send(TEST_DATA) // x-www-form-urlencoded upload
            .set('Accept', 'application/json')
            .expect(201);

        const deleteResponse = await request(app)
            .delete(`/api/avatars/${createResponse.body.id}`)
            .expect(204)

        const afterDeletetion = await request(app)
            .get(`/api/avatars`)
            .set('Accept', 'application/json')
            .expect(200)
        expect(getAllResponse.body.length).toEqual(afterDeletetion.body.length)

    })

    test('update by id', async () =>{
        const getAllResponse = await request(app)
            .get(`/api/avatars`)
            .set('Accept', 'application/json')
            .expect(200);

        const createResponse = await request(app)
            .post('/api/avatars')
            .send(TEST_DATA) // x-www-form-urlencoded upload
            .set('Accept', 'application/json')
            .expect(201);

        const updatedInfo = {
            "avatarName": "Pod",
            "childAge": 10,
            "skinColor": "#f00f00",
            "hairstyle": "bald",
            "headShape": "round",
            "upperClothing": "hoodie",
            "lowerClothing": "pants"
        }
        const updatedId = await request(app)
            .put(`/api/avatars/${createResponse.body.id}`)
            .send(updatedInfo)
            .expect(204)
        expect(createResponse.body).toMatchObject(updatedId.body)


    })


    test('create avatar requires at least avatar name and child\'s age', async () => {

        const testData = {
            "skinColor": "#0000ff",
            "hairstyle": "short",
            "headShape": "oval",
            "upperClothing": "jacket",
            "lowerClothing": "shorts"
        }

        const createResponse = await request(app)
            .post('/api/avatars')
            .send(testData)
            .set('Accept', 'application/json')
            .expect(400);
    });

    test('create user', async () =>{

        const createResponse = await request(app)
            .post('/api/users')
            .send(TEST_USER)
            .set('Accept', 'application/json')
            .expect(400);

    })
})
