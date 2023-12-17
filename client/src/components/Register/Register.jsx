import { Button, Card, Input } from "../UI"
import { useForm } from "react-hook-form"
import axios from "axios";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const requiredErrorMessage = "Este campo es requerido"

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const response = await axios.post("http://localhost:3000/api/register", data, {
      withCredentials: true
    });
    console.log(response);
  })

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold">Register</h3>

        <form onSubmit={onSubmit}>
          <Input type="text" placeholder="Luis" {...register("name",
          {
            required: true
          })}/>

          {
            errors.name && <p className="text-red-500">{requiredErrorMessage}</p>
          }

          <Input type="text" placeholder="González" {...register("surname", 
          {
            required: true
          })}/>

          {
            errors.surname && <p className="text-red-500">{requiredErrorMessage}</p>
          }

          <Input type="email" placeholder="lgonzalez@gmail.com" {...register("email", {
            required: true
          })}/>

          {
            errors.email && <p className="text-red-500">{requiredErrorMessage}</p>
          }

          <Input type="password" placeholder="**********" 
          {...register("password", {
            required: true
          })}/>

          {
            errors.password && <p className="text-red-500">{requiredErrorMessage}</p>
          }

          <Button>Guardar</Button>
        </form>
      </Card>
    </div>
  )
}

export default RegisterPage