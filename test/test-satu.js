const request = require('supertest');
var chai = require ('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs')

const assert = require ('chai').assert

describe('API Test for "reqres.in"', () => {
    it ('GET USER', async () => {
        const response = await request ("https://reqres.in/api/").get("users/2")

        assert.equal(response.statusCode, 200)
        assert.equal(response.body.data.first_name, "Janet");

        console.log(response.statusCode);
        console.log(response.body)

        const schemaPath = "resource/jsonSchema/get-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)

    });

    it('POST USER', async () => {
        const response = await request ("https://reqres.in/api/").post("users")
        .send({
            "data": {
                "email": "akun.baru@reqres.in",
                "first_name": "akun",
                "last_name": "baru",
                "avatar": "https://reqres.in/img/faces/2-image.jpg"
            }
        })

        assert.equal(response.statusCode, 201)
        assert.equal(response.body.data.first_name, "akun");

        console.log(response.statusCode);
        console.log(response.body)

        const schemaPath = "resource/jsonSchema/post-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)

    });

    it ('PUT USER', async () => {
        const response = await request ("https://reqres.in/api/").put("users/2")
        .send ({
            "name": "morpheus",
            "job": "zion resident"
        })

        console.log(response.statusCode);
        console.log(response.body)

        const schemaPath = "resource/jsonSchema/put-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
        assert.equal(response.statusCode, 200)
        assert.equal(response.body.name, "morpheus");

    });

    it ('DELETE USER', async () => {
        const response = await request ("https://reqres.in/api/").delete("users/2")
        
        assert.equal(response.statusCode, 204)

        console.log(response.statusCode);
        console.log(response.body)


    });
});