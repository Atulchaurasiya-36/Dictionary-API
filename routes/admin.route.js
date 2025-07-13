import express from "express"
import { signup,login,logout ,addWords,deleteWords} from "../controllers/adminController.js"
import { verifyAdmin } from "../middleware/verifyAdmin.js"

const router=express.Router()

router.post("/register",signup)
router.post("/login",login)
router.get("/logout",logout)
router.post("/addwords",verifyAdmin,addWords)
router.delete("/delete/:id",deleteWords)

export default router