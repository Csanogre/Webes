import Autok from "../models/AutokModel.js"
import Gyarto from "../models/GyartoModel.js"
import express from "express"
import { body, validationResult } from 'express-validator';

const autokRouter = express.Router()

autokRouter.get("/", async (req,res)=>{
	const autok = await Autok.find().populate('gyarto')
	res.send(autok)
})


//Igen tudom, hogy visszalehetne adni, de egyszerűen annyit kopott az Mongoose tudásom, hogy fiiingom sincsen, hogy hogy lehet a modelbe belerakni
//az ország modelt és a response-be visszaadni az országot is -.-", úgyhogy frontenden lesz megoldva :)
autokRouter.get("/getAutoById",body('autoId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})


	Autok.findById(req.body.autoId).populate('gyarto').then(
		auto => {
			if(auto!=null)
				res.json(auto)
		}
		).catch(error => {
			res.status(500).json({error: "Autó nem található!"})
		})

})

autokRouter.post("/createAuto",body('tipus').notEmpty(),body('gyartasiev').notEmpty(),body('gyartoId'),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})
	


	Autok.count({tipus:req.body.tipus},function(error,count){
		if(count!=0){
			res.status(500).json("Ez az autó már létezik!")
			return
		}else{
			Autok.create({
				tipus: req.body.tipus,
				gyarto: req.body.gyartoId,
                gyartasiev: Date.parse(req.body.gyartasiev)
			}).then(auto => res.json(auto)).catch(error => res.status(500).json(error))
		}

	})

})

autokRouter.delete("/deleteAuto",body('autoId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})

	Autok.deleteOne({_id:req.body.autoId}).then(()=>{res.status(200).json("Deleted: "+req.body.autoId)}).catch(error => res.status(500).json(error))

})

autokRouter.patch("/updateAuto",body('autoId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})



	Autok.findByIdAndUpdate(req.body.autoId, req.body, {new: true}).then((auto) => {
		if (!auto) {
			return res.status(404).send();
		}
		res.send(auto);
	}).catch((error) => {
		res.status(500).send(error);
	})	

})

export default autokRouter