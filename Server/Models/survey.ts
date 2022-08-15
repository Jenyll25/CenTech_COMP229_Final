//Step 1 - Import Mongoose
import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema; //alias for mongoose.schema

//Step 2 - Create a schema that matches data
const SurveySchema = new Schema
({
    Title: String, 
    Owner: String,
    isActive: Boolean,
    StartDate: Date,
    EndDate: Date,
    QuestionType: String,
    Questions: Array
},
{
    collection: "surveys"
});

//Step 3 - Create a model using the schema
const Model = mongoose.model("Survey", SurveySchema);

//Step 4 - Export the model -> this makes the file a module
export default Model;