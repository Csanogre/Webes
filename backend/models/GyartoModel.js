import mongoose from "mongoose"

const Gyarto = mongoose.Schema({
	name: String,
	szarmazasihely: String
},{
	versionKey: false
})


export default mongoose.model('Gyarto', Gyarto, 'Gyartok')