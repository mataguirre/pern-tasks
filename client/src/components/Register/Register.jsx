import { Button, Card, Input } from "../UI"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Label } from "../UI";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  
  const { signup } = useAuth();
 
  const requiredErrorMessage = "Este campo es requerido"

  const onSubmit = handleSubmit(async(data) => {
    await signup(data);
    navigate("/profile");
  })

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold text-center">Register</h3>

        <form onSubmit={onSubmit} className="mt-4">
          <Label htmlFor="Name">
            Name
          </Label>
          <Input type="text" placeholder="Name" {...register("name",
          {
            required: true
          })}/>

          {
            errors.name && <p className="text-red-500">{requiredErrorMessage}</p>
          }

          <Label htmlFor="Surname">
            Surname
          </Label>
          <Input type="text" placeholder="Surname" {...register("surname", 
          {
            required: true
          })}/>

          {
            errors.surname && <p className="text-red-500">{requiredErrorMessage}</p>
          }

          <Label htmlFor="Name">
            Email
          </Label>
          <Input type="email" placeholder="Email" {...register("email", {
            required: true
          })}/>

          {
            errors.email && <p className="text-red-500">{requiredErrorMessage}</p>
          }

          <Label htmlFor="Name">
            Password
          </Label>
          <Input type="password" placeholder="**********" 
          {...register("password", {
            required: true
          })}/>

          {
            errors.password && <p className="text-red-500">{requiredErrorMessage}</p>
          }

          <Button>Guardar</Button>

          <div className="flex justify-between gap-1">
            <p>¿Ya tienes una cuenta?</p>
            <Link to="/login" className="font-bold">Inicia sesión</Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default RegisterPage