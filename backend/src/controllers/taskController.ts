import type { Request, Response } from 'express'
import colors from 'colors'
import Project from '../models/Project'
import Task from '../models/Task'

export class TaskController {
    static getAllTask = async (req: Request, res: Response) => {
        try {
            const task = await Task.find({ project: req.project.id }).populate('project')
            res.json(task)
        }
        catch (error) {
            res.send("Hubo un error")
        }
    }
    static createTask: any = async (req: Request, res: Response) => {
        try {

            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await Promise.allSettled([
                task.save(),
                req.project.save()
            ])
            res.send("tarea generado correctamente")
        }
        catch (error) {

        }
    }
    static getTaskById: any = async (req: Request, res: Response) => {
        try {
            /*const { taskid } = req.params
            const task = await Task.findById(taskid)
            if (!task) {
                const error = new Error('Tarea no encontrada')
                return res.status(404).json({ error: error.message })
            }*/
            /*if (req.task.project.toString() !== req.project.id) {
                const error = new Error('Proyecto no valido')
                return res.status(404).json({ error: error.message })
            }*/
            return res.json(req.task)
        } catch (error) {
            return res.status(404).send("Hubo algun error en la base de datos")
        }
    }
    static updateTask: any = async (req: Request, res: Response) => {
        try {
            req.task.name=req.body.name
            req.task.description=req.body.description
            await req.task.save()
            return res.send('Tarea actualizada correctamente')
        } catch (error) {
            return res.status(404).send("Hubo algun error en la base de datos")
        }
    }
    static deleteTaskById: any = async (req: Request, res: Response) => {
        try {
            
            req.project.tasks = req.project.tasks.filter(x => x.id.toString() !== req.task.id.toString())

            await Promise.allSettled([
                req.task.deleteOne(),
                req.project.save()
            ])
            return res.send('Tarea eliminado correctamente')
        } catch (error) {
            return res.status(404).send("Hubo algun error en la base de datos")
        }
    }
    static updateStatus: any = async (req: Request, res: Response) => {
        try {
            //const { taskid } = req.params
            const { status } = req.body
            /*const task = await Task.findById(taskid, req.body)
            if (!task) {
                const error = new Error('Tarea no encontrada')
                return res.status(404).json({ error: error.message })
            }*/
            
            req.task.status=status;
            await req.task.save()
            return res.send('Tarea actualizada correctamente')
        } catch (error) {
            console.log(error.message)
            return res.status(404).send("Hubo algun error en la base de datos")
        }
    }

}