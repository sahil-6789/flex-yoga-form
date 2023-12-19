const router = require("express").Router();
const cors = require("cors")
const { registerUser, loginUser,getDashboard,updateSlot } = require("../controllers/users")

router.use(cors());


router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.post('/register',registerUser)

router.get('/dashboard',getDashboard)
router.put('/update', updateSlot);

router.post('/',loginUser)

module.exports = router;
