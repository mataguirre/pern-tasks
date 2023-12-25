from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    password: str

users_list = [
    User(id=1, first_name="Matias", last_name="Aguirre", email="mataguirre.dev@gmail.com", password="1q2w3E*"),
    User(id=2, first_name="Ana", last_name="Gomez", email="ana.gomez@example.com", password="abc123"),
    User(id=3, first_name="Juan", last_name="Rodriguez", email="juan.rodriguez@example.com", password="pass123"),
    User(id=4, first_name="Maria", last_name="Lopez", email="maria.lopez@example.com", password="secret@123"),
    User(id=5, first_name="Carlos", last_name="Martinez", email="carlos.martinez@example.com", password="qwerty"),
    User(id=6, first_name="Laura", last_name="Hernandez", email="laura.hernandez@example.com", password="password123"),
]

# functions
def getUserList():
    try:
        return users_list
    except:
        return { "status" : "error", "message" : "Users not found" }

def getUser(id: int):
    try:
        user = filter(lambda u: u.id == id, users_list)
        return list(user)[0]
    except:
        return { "status" : "error", "message" : "User not found" }

# obtener lista de usuarios
@app.get("/api/users")
async def getListAsync():
    return getUserList()

# obtener id por path
@app.get("/api/user/{id}")
async def getUserAsync(id: int):
    return getUser(id)
    
# obtener id por query params
@app.get("/api/user")
async def getUserAsync(id: int):
   return getUser(id)

# create user
@app.post("/api/user", status_code=201)
async def createUserAsync(user: User):
    if(type(getUser(user.id)) == User):
        raise HTTPException(status_code = 409, detail = "Este usuario ya existe" )
    
    users_list.append(user)
    return user
    
# update user
@app.put("/api/user")
async def updateUserAsync(user: User):
    
    found = False

    # obtengo el indice del usuario a modificar
    for index, saved_user in enumerate(users_list):
        if(saved_user.id == user.id):
            userIndex = index
            found = True
    
    if(not found):
        return { "status" : "error", "message" : "No se ha podido actualizar el usuario" }
    
    users_list[userIndex] = user
    
    return user

# delete user
@app.delete("/api/user")
async def deleteAsync(id: int):
    found = False

    for index, saved_user in enumerate(users_list):
        if(saved_user.id == id):
            userIndex = index
            found = True
    
    if not found:
         return { "status" : "error", "message" : "No se ha podido eliminar el usuario" }
    
    users_list.remove(users_list[userIndex])

    return users_list