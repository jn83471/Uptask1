import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/projectController'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/taskController'
import { validateProjectExists } from '../middleware/project'
import { taskBelongsToProject, validateTaskExists } from '../middleware/task'

const router = Router()

router.param("projectId", validateProjectExists)
router.param("taskid", validateTaskExists)
router.param("taskid", taskBelongsToProject)

router.get('/',
    ProjectController.getAllProjects)
router.post('/',
    body('projectName').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('clientName').notEmpty().withMessage("El cliente es obligatorio"),
    body('description').notEmpty().withMessage("La descripcion es obligatoria"),
    handleInputErrors,
    ProjectController.createProjects)
router.get('/:id',
    param('id').isMongoId().withMessage("ID no valido"),
    handleInputErrors,
    ProjectController.getProyectById)


router.put('/:id',
    param('id').isMongoId().withMessage("ID no valido"),
    body('projectName').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('clientName').notEmpty().withMessage("El cliente es obligatorio"),
    body('description').notEmpty().withMessage("La descripcion es obligatoria"),
    handleInputErrors,
    ProjectController.updateProyect)
//{projectName,clientName,description}

router.delete('/:id',
    param('id').isMongoId().withMessage("ID no valido"),
    handleInputErrors,
    ProjectController.deleteProyect)

// routes for tasks

router.post('/:projectId/tasks',
    param('projectId').isMongoId().withMessage('ID no valido'),
    body('name').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('description').notEmpty().withMessage("La descripcion es obligatoria"),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    param('projectId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    //validateProjectExists,
    TaskController.getAllTask)

router.get('/:projectId/tasks/:taskid',
    param('projectId').isMongoId().withMessage('ID no valido'),
    param('taskid').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.getTaskById)

router.put('/:projectId/tasks/:taskid',
    param('projectId').isMongoId().withMessage('ID no valido'),
    param('taskid').isMongoId().withMessage('ID no valido'),
    body('name').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('description').notEmpty().withMessage("La descripcion es obligatoria"),
    handleInputErrors,
    TaskController.updateTask)

router.delete('/:projectId/tasks/:taskid',
    param('projectId').isMongoId().withMessage('ID no valido'),
    param('taskid').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.deleteTaskById)

router.post('/:projectId/tasks/:taskid/status',
    param('taskid').isMongoId().withMessage('ID no valido'),
    body('status').notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus)


export default router