from sqlalchemy import Column, Integer, String
from .db import Base

class Tile(Base):
    __tablename__ = "tiles"

    id = Column(Integer, primary_key=True, index=True)

    sku = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)

    material = Column(String, nullable=False)  # porcelain / ceramic
    size = Column(String, nullable=False)      # "13 x 13\"", "12\"", "8 x 8\""
    color = Column(String, nullable=False)     # black/white/beige/gray/multicolored
    finish = Column(String, nullable=False)    # matte/gloss

    # Physical location system
    zone = Column(String, nullable=False)      # POR
    bay = Column(String, nullable=False)       # B01
    side = Column(String, nullable=False)      # F or R
    section = Column(Integer, nullable=False)  # 1..3
    level = Column(String, nullable=False)     # T or B
    slot = Column(Integer, nullable=False)     # 1..5
