import {Document, model, Schema} from 'mongoose'
import {hash} from 'bcrypt';

enum RolEnum {
    admin = "admin",
    manager = "manager",
    user = "user"
}

interface IUser extends Document {
    username: string;
    password: string;
    role: string;
}

/**
 * @typedef User
 * @property {string} username.required - The user username to log in with
 * @property {string} password.required - The user password to log in with
 */ 

const userSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: "user", enum: ["admin","manager","user"]}
});

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

userSchema.pre('save', async function (next){
    (this.password as any) = await hash(this.password, saltRounds).catch(err => {
        console.error(err)
        return {error: err}
    });

    if ((this.password as any).error)
        return next((this.password as any).error);
    return next();
})

export default model('User', userSchema);