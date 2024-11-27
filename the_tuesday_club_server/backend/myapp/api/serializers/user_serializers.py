from ninja import Schema
from pydantic import EmailStr, field_validator

class UserCreateSchema(Schema):
    username: str
    password: str
    email: EmailStr
    first_name: str
    last_name: str

    @field_validator("password")
    def validate_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        return value

    def to_user_data(self):
        """Returere alle data untagen password."""
        return self.dict(exclude={"password"})

    def to_all_data(self):
        """Retunere alle data inkl. password."""
        return self.dict()


class AddressCreateSchema(Schema):
    street: str
    city: str
    postal_code: int
    country: str
    
    def to_dict(self):
        return self.dict()


class AddressResponseSchema(Schema):
    street: str
    city: str
    postal_code: int
    country: str

    class Config:
        orm_mode = True


class UserResponseSchema(Schema):
    username: str
    email: str
    first_name: str
    last_name: str
    address: AddressResponseSchema  # Relateret adresse

    class Config:
        orm_mode = True
  
        
class LoginSchema(Schema):
    username: str
    password: str
