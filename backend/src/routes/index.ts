import { Router } from 'express';
import { getAllAdatas, getAdata, createAdata, updateAdata, deleteAdata } from '../controller/aController';
import { checkAuth, logIn, register } from '../controller/authController';

const router = Router();

/**
 * Get every adata example model documents
 * @route GET /datas
 * @group Adata - Operations about adata example model documents
 * @returns {Array<AType>} 200 - An array of adata example model documents
 * @returns 204 - No content
 */
router.get('/datas', getAllAdatas);

/**
 * Get adata example model document by id
 * @route GET /datas/{id}
 * @group Adata - Operations about adata example model documents
 * @param {string} id.path.required - adata example model document id
 * @returns {AType.model} 200 - Adata example model document
 * @returns 204 - No content
 */
router.get('/datas/:id', getAdata);

/**
 * Add a new adata example model document
 * @route POST /datas
 * @group Adata - Operations about adata example model documents
 * @param {AType.model} adata.body.required - the adata example model document to add
 * @returns {CreateSuccessResponse.model} 201 - Adata example model document created
 * @returns {CreateErrorResponse.model} 400 - Bad request
 * @returns {UnauthorizedAccess.model} 401 - Unauthorized
 * @security JWT
 */
router.post('/datas', checkAuth, createAdata);

/**
 * Update a adata example model document
 * @route PUT /datas/{id}
 * @group Adata - Operations about adata example model documents
 * @param {string} id.path.required - adata example model document id
 * @param {AType.model} adata.body.required - the adata example model document to update
 * @returns {UpdateSuccessResponse.model} 200 - Adata example model document updated
 * @returns {CreateErrorResponse.model} 400 - Bad request
 */
router.put('/datas/:id', updateAdata);

/**
 * Delete a adata example model document
 * @route DELETE /datas/{id}
 * @group Adata - Operations about adata example model documents
 * @param {string} id.path.required - adata example model document id
 * @returns {UpdateSuccessResponse.model} 200 - Adata example model document deleted
 * @returns {CreateErrorResponse.model} 400 - Bad request
 */
router.delete('/datas/:id', deleteAdata);

/**
 * Logs an user in and if succesful returns an authorization token
 * @route POST /login
 * @group Authorization - Operations about user management and authorization
 * @param {User.model} payload.body.required
 * @returns {SuccessLogIn.model} 200 - Successful log in
 * @returns {BadRequestLogIn.model} 400 - Bad request
 * @returns {UnauthorizedLogIn.model} 401 - Unauthorized
 */

router.post('/login', logIn)

/**
 * Registers a new user on the system
 * @group Authorization - Operations about user management and authorization
 * @route POST /register
 * @param {User.model} payload.body.required
 * @returns {SuccessRegister.model} 200 - Succesful registration
 * @returns {BadRequestRegister.model} 400 - Bad Request
 * @returns {ForbiddenRegister.model} 403 - Forbidden
 * @returns {ErroneousRegister.model} 500 - Internal server error
 */

router.post('/register', register)

export default router;