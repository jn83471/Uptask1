import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "../../components/projects/ProjectForm"
import type { ProjectFormData } from "../../types"
import { CreateProject } from "../../api/ProjectApi"
import { toast } from 'react-toastify'




export const CreateProjectsView = () => {
  const navigate = useNavigate()
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
  }
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues
  })

  /*const mutation = useMutation({
    mutationFn: CreateProject,
    onError: () => {

    },
    onSuccess: (responce) => {
      //const responce = await CreateProject(data)
      toast.success(responce)
      navigate('/')
    }
  })*/
  const { mutate } = useMutation({
    mutationFn: CreateProject,
    onError: (responce) => {
      toast.error(responce.message)
    },
    onSuccess: (responce) => {
      //const responce = await CreateProject(data)
      toast.success(responce)
      navigate('/')
    }
  })

  /*const handleForm = async (data: ProjectFormData) => {
    /*const responce = await CreateProject(data)
    toast.success(responce)
    navigate('/')
    //await mutation.mutateAsync(data)
    mutation.mutate(data)
  }*/
  const handleForm = async (data: ProjectFormData) => mutate(data)

  return (
    <>
      <h1 className="text-5xl font-black">
        Crear proyectos
      </h1>
      <p className="text-2xl font-light text-gray-500">
        Llena el siguiente formulario de proyecto
      </p>
      <nav className="my-5">
        <Link className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl
      font-bold cursor-pointer transition-colors" to='/'>
          Volver a proyectos
        </Link>
      </nav>

      <form
        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
        onSubmit={handleSubmit(handleForm)}
        noValidate>
        <ProjectForm register={register}
          errors={errors} />
        <input type="submit"
          value="Crear proyecto"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors" />
      </form>


    </>
  )
}
