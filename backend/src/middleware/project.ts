import type { Request, Response, NextFunction } from 'express'
import Project, { IProject } from '../models/Project'

declare global{
    namespace Express{
        interface Request{
            project:IProject
        }
    }
}

export const validateProjectExists:any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId } = req.params
        const project = await Project.findById(projectId)
        if (!project) {
            return res.status(404).json("Proyecto no encontrado")
        }
        req.project=project
        return next()
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error' })
    }
    
}