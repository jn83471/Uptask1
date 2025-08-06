import { Request, Response } from "express";
import Project from "../models/Project";
import colors from 'colors'

export class ProjectController {

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const project = await Project.find({})
            res.json(project)
        }
        catch (error) {
            res.send("El proyecto no se ha generdo debido a algun error")
        }
    }
    static createProjects = async (req: Request, res: Response) => {
        //const {projectName,clientName,description}=req.body
        const project = new Project(req.body)
        //res.send(project.projectName)
        try {
            await project.save()
            res.send("Proyecto generado correctamente")
        }
        catch (error) {
            console.log(colors.red(error))
            res.send("El proyecto no se ha generdo debido a algun error")
        }
    }
    static getProyectById: any = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const project = await Project.findById(id).populate('tasks')
            if (!project) {
                return res.status(404).json("Proyecto no encontrado")
            }
            res.json(project)
        }
        catch (error) {
            res.send("El proyecto no se ha generdo debido a algun error")
        }
    }
    static updateProyect: any = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const project = await Project.findById(id)
            if (!project) {
                return res.status(404).json("Proyecto no encontrado")
            }
            const p=await Project.findByIdAndUpdate(id,req.body)
            await project.save()
            res.send("Proyecto generado modificado")
        }
        catch (error) {
            res.send("El proyecto no se ha generdo debido a algun error")
        }
    }
    static deleteProyect:any= async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const project = await Project.findById(id)
            if (!project) {
                return res.status(404).json("Proyecto no encontrado")
            }
            await project.deleteOne()
            res.send("Proyecto eliminado")
        }
        catch (error) {
            res.send("El proyecto no se ha generdo debido a algun error")
        }
    }


}