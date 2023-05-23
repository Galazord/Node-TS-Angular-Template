import AModel from '../model/aModel';
import { Request, Response } from 'express';
import {v4} from 'uuid';

const getAllAdatas = async (req: Request, res: Response) => {
    const adatas = await AModel.find().catch((err) => {
        console.error(err);
        return undefined;
    });
    if (adatas) {
        res.status(200).json(adatas);
    } else {
        res.status(204).send();
    }
};

const getAdata = async (req: Request, res: Response) => {
    const adata = await AModel.findOne({ id: req.params.id }).catch((err) => {
        console.error(err);
        return undefined;
    });
    if (adata) {
        res.status(200).json(adata);
    } else {
        res.status(204).send();
    }
};

/**
 * @typedef CreateSuccessResponse
 * @property {boolean} success.required - true or false - eg: true
 * @property {string} id.required - error message - eg: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b"
 */

/**
 * @typedef CreateErrorResponse
 * @property {boolean} success.required - true or false - eg: false
 * @property {string} error.required - error message - eg: "error message"
 */

const createAdata = async (req: Request, res: Response) => {
    if(!req.body.id){
        req.body.id = v4();
    }
    const adata = new AModel(req.body);
    let result : any = await adata.save().catch((err) => {
        console.error(err);
        return {error: err};
    });
    if (!result.error) {
        res.status(201).json({ success: true, id: result.id });
    } else {
        return res.status(400).json({ success: false, error: result.error });
    }
}

/**
 * @typedef UpdateSuccessResponse
 * @property {boolean} success.required - true or false - eg: true
 */

/**
 * @typedef UpdateErrorResponse
 * @property {boolean} success.required - true or false - eg: false
 * @property {string} error.required - error message - eg: "error message"
 */


const updateAdata = async (req: Request, res: Response) => {
    const adata: any = await AModel.findOneAndUpdate({ id: req.params.id }, req.body).catch((err) => {
        console.error(err);
        return{error:err};
    });
    if (!adata.error) {
        res.status(200).json({ success: true });
    } else {
        return res.status(400).json({ success: false, error: adata.error });
    }
};

/**
 * @typedef DeleteSuccessResponse
 * @property {boolean} success.required - true or false - eg: true
 */

/**
 * @typedef DeleteErrorResponse
 * @property {boolean} success.required - true or false - eg: false
 * @property {string} error.required - error message - eg: "error message"
 */

const deleteAdata = async (req: Request, res: Response) => {
    const adata: any = await AModel.findOneAndDelete({ id: req.params.id }).catch((err) => {
        console.error(err);
        return{error:err};
    });
    if (!adata.error) {
        res.status(200).json({ success: true });
    } else {
        return res.status(400).json({ success: false, error: adata.error });
    }
};

export { getAllAdatas, getAdata, createAdata, updateAdata, deleteAdata };