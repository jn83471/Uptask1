import {z} from 'zod'

/* projects */

export const projectSchema=z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
})

export const DashboarProjectShecma=z.array(
    projectSchema.pick({
        _id:true,
        projectName:true,
        clientName:true,
        description:true
    })
)

export type Project=z.infer<typeof projectSchema>
/* Task */

export const TaskStatus=z.enum(['pending','onHold','inProgress','underReview','completed'])

export const TaskSchema=z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatus
})

export type Task= z.infer<typeof TaskSchema>

export type TaskFormData=Pick<Task,'name' | 'description'>

export type ProjectFormData=Pick<Project,'clientName' | 'projectName' | 'description'>