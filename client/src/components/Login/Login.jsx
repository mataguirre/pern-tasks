import { Button, Card, Input, Label } from "../UI"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const { signin } = useAuth();

  const requiredErrorMessage = "Este campo es requerido"

  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
    navigate("/profile");
  })

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold text-center">Login</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor="email">
            Email
          </Label>
          <Input type="email" placeholder="Email" {...register("email", {
            required: true
          })}/>

          {
            errors.email && <p className="text-red-500">{requiredErrorMessage}</p>
          }

          <Label htmlFor="password">
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
            <p>¿Aún no tienes una cuenta?</p>
            <Link to="/register" className="font-bold">Registrate</Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Login