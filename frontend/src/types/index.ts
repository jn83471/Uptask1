import { z } from 'zod'

/* auth users */

const AuthSchema=z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string()
})

export type Auth = z.infer<typeof AuthSchema>
export type UserLoginForm=Pick<Auth,'email' | 'password'>
export type UserRegistrationForm=Pick<Auth,'email' | 'password'|'password_confirmation'|'name'>

/* Task */

export const TaskStatus = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])

export type TaskStatusInterfer=z.infer<typeof TaskStatus>

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatus,
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type Task = z.infer<typeof TaskSchema>

export type TaskFormData = Pick<TaskFormData, 'name' | 'description'>

export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

/* projects */

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(TaskSchema)
})

export const DashboarProjectShecma = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,

    })
)

export type Project = z.infer<typeof projectSchema>


