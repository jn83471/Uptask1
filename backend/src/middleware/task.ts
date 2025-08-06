import type { Request, Response, NextFunction } from 'express'
import Project, { IProject } from '../models/Project'
import Task, { ITask } from '../models/Task'

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export const validateTaskExists: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskid } = req.params
        const task = await Task.findById(taskid)
        if (!task) {
            return res.status(404).json("Tarea no encontrada")
        }
        req.task = task
        return next()
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error' })
    }

}
export const taskBelongsToProject: any = async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (req.task.project.toString() !== req.project.id.toString()) {
            const error = new Error('Proyecto no valido')
            return res.status(404).json({ error: error.message })
        }
        return next();
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: 'Hubo un error' })
    }
}