//Step 1 - Import Mongoose
import mongoose, { model } from "mongoose";
const { ObjectId } = require('mongodb');
const Schema = mongoose.Schema; //alias for mongoose.schema

// create a model class
const QuestionSchema = new Schema({
    surveyid: ObjectId,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String
},
{
    collection: "questions"
});


//Step 3 - Create a model using the schema
const Model = mongoose.model("Question", QuestionSchema);

//Step 4 - Export the model -> this makes the file a module
export default Model;