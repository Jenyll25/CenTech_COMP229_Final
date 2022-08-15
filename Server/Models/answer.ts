//Step 1 - Import Mongoose
import mongoose, { model } from "mongoose";
const { ObjectId } = require('mongodb');
const Schema = mongoose.Schema; //alias for mongoose.schema

// create a model class for submitted survey document
let AnswerSchema = new Schema({
    surveyId:String,
    answer: Array 
},
{
    collection: "answers"
});

//Step 3 - Create a model using the schema
const Model = mongoose.model("Answer", AnswerSchema);

//Step 4 - Export the model -> this makes the file a module
export default Model;