import Gyartok from "../models/GyartoModel.js"
import express from "express"
import { body, validationResult } from 'express-validator';
import Miniszterelnok from "../models/AutokModel.js"



const gyartoRouter = express.Router()


gyartoRouter.get("/", async (req,res)=>{
	const gyarto = await Gyartok.find()
	res.send(gyarto)
})

gyartoRouter.get("/getGyartoById",body('gyartoId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})


	Gyartok.findById(req.body.gyartoId).then(gyarto => res.json(gyarto)).catch(error => res.status(400).json({error: "Orszag not found!"}))



})

gyartoRouter.post("/createGyarto",body('name').notEmpty(),body('szarmazasihely').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})
	


	Gyartok.count({name:req.body.name},function(error,count){
		if(count!=0){
			res.status(500).json("Ez a gyártó már létezik!")
			return
		}else{
			Gyartok.create({
				name: req.body.name,
				szarmazasihely: req.body.szarmazasihely
			}).then(gyarto => res.json(gyarto)).catch(error => res.status(500).json(error))
		}

	})

	})

	


	gyartoRouter.delete("/deleteGyarto",body('gyartoId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})

		Gyartok.deleteOne({_id:req.body.gyartoId}).then(()=>{res.status(200).json("Deleted: "+req.body.gyartoId)}).catch(error => res.status(500).json(error))

})

gyartoRouter.patch("/updateOrszag",body('orszagId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})



		Gyartok.findByIdAndUpdate(req.body.gyartoId, req.body, {new: true}).then((gyarto) => {
		if (!gyarto) {
			return res.status(404).send();
		}
		res.send(gyarto);
	}).catch((error) => {
		res.status(500).send(error);
	})	

})

	


export default gyartoRouter