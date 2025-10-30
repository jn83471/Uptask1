import { Router } from "express"
import { AuthController } from "../controllers/AuthController"
import { handleInputErrors } from "../middleware/validation"
import { body, param } from "express-validator"


const router=Router()

router.post('/createAuth',
    body('name').notEmpty().withMessage('El nombre no puede ir vacio')
    ,body('password').isLength({min:8}).withMessage('El password es muy corto, minimo necesita tener 8 caracteres')
    ,body('password_confirmation').custom((value,{req})=>{
        if(req.body.password!==value){
            throw new Error('Las passwords no son iguales')
        }
        return true
    })
    ,body('email').isEmail().withMessage('E-mail no valido')
    ,handleInputErrors
    ,AuthController.createAccount)

router.post('/confirm-account'
    ,body('token').notEmpty().withMessage("El token no puede ir vacio")
    ,handleInputErrors
    ,AuthController.ConfirmAccount
)

router.post('/login'
    ,body('email').isEmail().withMessage('E-mail no valido')
    ,body('password').isLength({min:8}).withMessage('El password es muy corto, minimo necesita tener 8 caracteres')
    ,handleInputErrors
    ,AuthController.Login
)
router.post('/request-code'
    ,body('email').isEmail().withMessage('E-mail no valido')
    ,handleInputErrors
    ,AuthController.requestConfirmationCode
)
router.post('/validateToken'
    ,body('token').notEmpty().withMessage("El token no puede ir vacio")
    ,handleInputErrors
    ,AuthController.ValidateToken
)

router.post('/update-password/:token'
    //,param('token').isNumeric().withMessage("Token no valido")
    , body('password').isLength({ min: 8 }).withMessage('El password es muy corto, minimo necesita tener 8 caracteres')
    , body('password_confirmation').custom((value, { req }) => {
        if (req.body.password !== value) {
            throw new Error('Las passwords no son iguales')
        }
        return true
    })
    ,handleInputErrors
    ,AuthController.updatePassword
)


router.post('/forgot-password'
    ,body('email').isEmail().withMessage('E-mail no valido')
    ,handleInputErrors
    ,AuthController.forgetPassword
)

export default router