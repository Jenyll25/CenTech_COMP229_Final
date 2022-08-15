//Step 1 - Import Mongoose
import mongoose, { PassportLocalSchema } from "mongoose";
const Schema = mongoose.Schema; //alias for mongoose.schema
import passportLocalMongoose from 'passport-local-mongoose';

//Step 2 - Create a schema that matches data
const UserSchema = new Schema
({
    DisplayName : String,
    username : String,
    EmailAddress : String,
    Created: 
    {
        type: Date,
        default: Date.now()
    },
    Update:
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "users"
});

declare global 
{
    export type UserDocument = mongoose.Document &
    {
        username: String,
        EmailAddress: String,
        DisplayName: String
    }
}

//Step 3 - plugin the passport local mongoose
UserSchema.plugin(passportLocalMongoose);

//Step 4 - Create a model using the schema
const Model = mongoose.model("User", UserSchema as PassportLocalSchema);

//Step 5 - Export the model -> this makes the file a module
export default Model;