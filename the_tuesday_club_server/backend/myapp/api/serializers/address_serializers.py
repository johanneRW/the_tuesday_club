from ninja import Schema

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

