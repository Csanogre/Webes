import mongoose from "mongoose"

const Autok = mongoose.Schema({
	tipus: String,
	gyartasiev: Date,
	gyarto: {type: mongoose.Schema.Types.ObjectId, ref:'Gyarto'}
},{
	versionKey: false
})

export default mongoose.model('Autok', Autok,'Autok')