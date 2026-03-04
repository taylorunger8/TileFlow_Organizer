from pydantic import BaseModel

class TileOut(BaseModel):
    id: int
    sku: str
    name: str
    material: str
    size: str
    color: str
    finish: str
    zone: str
    bay: str
    side: str
    section: int
    level: str
    slot: int

    class Config:
        from_attributes = True
