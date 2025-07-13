import express from "express"
import {getWord,getSpecificWord} from "../controllers/user.controller.js"

const router=express.Router()

router.get("/getword",getWord)
router.get("/getSpecificWord/:word",getSpecificWord)

export default router