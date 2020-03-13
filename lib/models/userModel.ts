import * as mongoose from 'mongoose';
import * as bcrypt from 'mongoose-bcrypt';
// user schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    accountName: {
        type: String,
        required: 'Enter a account name.'
    },
    email: {
        type: String          
    },
    password: {
        type: String
    }
}, {
    timestamps: true
});

// bcrypt package added for mongoose
UserSchema.plugin(bcrypt);
export default  mongoose.model('User', UserSchema);