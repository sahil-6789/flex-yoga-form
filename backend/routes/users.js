const router = require("express").Router();

const { registerUser, loginUser,getDashboard,updateSlot } = require("../controllers/users")





router.post('/register',registerUser)

router.get('/dashboard',getDashboard)
router.put('/update', updateSlot);

router.post('/',loginUser)

module.exports = router;
