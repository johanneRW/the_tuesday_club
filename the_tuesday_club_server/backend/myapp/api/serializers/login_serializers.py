from ninja import Schema

class LoginSchema(Schema):
    username: str
    password: str
    
    
    

class UserSchema(Schema):
    username: str
    isAuthenticated: bool
    isSuperuser: bool
