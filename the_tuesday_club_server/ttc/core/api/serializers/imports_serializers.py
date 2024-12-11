from ninja import Schema


class FindImageInput(Schema):
    album_id: str

class FindImageOutput(Schema):
    image_url: str

class ErrorOutput(Schema):
    error: str