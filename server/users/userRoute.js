const express = require ('express')
const router = express.Router()
const {
    Register,
    Login,
     } = require('../users/userController')

    // const {protect} =  require('../middleware/authMiddleware')

router.post('/register',Register)
router.post('/login', Login)


module.exports= router


