import UserModel from '../model/user'
import { NextFunction, Request, Response } from 'express'
import { compareSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import moment from 'moment';


/**
 * @typedef SuccessLogIn
 * @property {boolean} success - - eg: true
 * @property {string} token - - eg: 
 * @property {enum} role - - eg: user,manager,admin
 * @property {string} expiresIn - Date when the token expires in - eg: 2022-09-23T16:40:48.859Z
 */

/**
 * @typedef UnauthorizedLogIn
 * @property {boolean} success - - eg: false
 * @property {string} message - - eg: The provided username or password is incorrect
 */

/**
 * @typedef BadRequestLogIn
 * @property {boolean} success - - eg: false
 * @property {string} message - - eg: You need to pass a correct username to log in succesfully
 */

const secret = process.env.SECRET || "secret";

const logIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username && password) {
        let user: any = await UserModel.findOne({ username }).catch((err) => {
            console.error(err);
            return undefined;
        })
        if (user) {
            let succesfulPass = compareSync(password, user.password);
            if (succesfulPass) {
                
                let token = sign({ data: { username } }, secret, { expiresIn: '1d' });
                let expiresIn = moment().add(1, 'days').toDate();
                return res.status(200).json({
                    success: true,
                    token: token,
                    role: user.role,
                    expiresIn: expiresIn.toISOString()
                })
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: req.t('wrongUsernameOrPassword')
                })
            }
        }
        else {
            return res.status(401).json({
                success: false,
                message: req.t('wrongUsernameOrPassword')
            })
        }
    }
    else {
        const str=`${!username && !password ? "userAndPassword" : (!username ? "username" : "password")}`;
        return res.status(400).json({
            success: false,
            message: req.t('wrongUserAndPassword',{str:req.t(str)})
        })
    }
}

/**
 * @typedef SuccessRegister
 * @property {boolean} success - - eg: true
 * @property {string} createdUser - The username from the recently created user - eg: username
 */

/**
 * @typedef ErroneousRegister
 * @property {boolean} success - - eg: false
 * @property {string} error - The error that caused the failed registration - eg: Error message
 */

/**
 * @typedef ForbiddenRegister
 * @property {boolean} success - - eg: false
 * @property {string} message - The reason why the registration is forbidden - eg: User username already exists on the system please select a different one
 */

/**
 * @typedef BadRequestRegister
 * @property {boolean} success - - eg: false
 * @property {string} message - - eg: You need to pass a correct username to be registered succesfully
 */

const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username && password) {
        const userExisting = await UserModel.findOne({ username }).catch(err => { return undefined });
        if (!userExisting) {
            let newUser = new UserModel({ username, password });
            let saved: any = await newUser.save().catch(err => {
                console.error(err);
                return { error: err };
            })
            if (!saved.error) {
                return res.status(201).json({
                    success: true,
                    createdUser: username
                })
            }
            else {
                return res.status(500).json({
                    success: false,
                    error: saved.error
                })
            }
        }
        else {
            return res.status(403).json({
                success: false,
                message:  req.t('userExists',{username:username})
            })
        }
    }
    else {
        const str=`${!username && !password ? "userAndPassword" : (!username ? "username" : "password")}`;
        return res.status(400).json({
            success: false,
            message: req.t('wrongUserAndPassword',{str:req.t(str)})
        })
    }
}

/**
 * @typedef UnauthorizedAccess
 * @property {string} message - - eg: In order to access this resource you need to pass a correct authentication bearer token in the 'Authorization' header like this: Bearer <token>
 */

    
const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    if(authHeader){
        let authParts = authHeader.split(" ");
        if(authParts.length > 1){
            let token = authParts[1];
            let decoded = undefined;
            try{
                decoded = verify(token, secret);
            }
            catch(err){
                decoded = undefined;
            }
            if(decoded){
                next()
            }
            else {
                
                return res.status(401).json({
                    
                    message: req.t('badToken')
                })
            }
        }
        else {
            return res.status(401).json({
                message:  req.t('badToken')
            })
        }
    }
    else {
        return res.status(401).json({
            message: req.t('badToken')
        })
    }
}




export { logIn, register, checkAuth }