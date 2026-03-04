from typing import Optional

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_

from .db import Base, engine, SessionLocal
from .models import Tile
from .schemas import TileOut
from .seed import seed_db
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Tile Store Organizer (Demo)")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event("startup")
def startup():
    db = SessionLocal()
    try:
        seed_db(db)
    finally:
        db.close()


@app.get("/tiles", response_model=list[TileOut])
def list_tiles(
    q: Optional[str] = None,
    material: Optional[str] = None,
    size: Optional[str] = None,
    color: Optional[str] = None,
    finish: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Tile)

    if q:
        like = f"%{q.strip()}%"
        query = query.filter(
            or_(Tile.name.ilike(like), Tile.sku.ilike(like))
        )

    if material:
        query = query.filter(Tile.material == material.lower())

    if size:
        query = query.filter(Tile.size == size)

    if color:
        query = query.filter(Tile.color == color.lower())

    if finish:
        query = query.filter(Tile.finish == finish.lower())

    return query.order_by(
        Tile.section.desc(),
        Tile.level.desc(),
        Tile.slot.asc()
    ).all()
