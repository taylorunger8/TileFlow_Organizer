from sqlalchemy.orm import Session
from .models import Tile

SEED_TILES = [
    # Front / Section 3
    dict(sku="684012", name="Antique Aurea Nero Trastevere", material="porcelain", size='12 x 12"', color="black", finish="matte", zone="POR", bay="B01", side="F", section=3, level="T", slot=5),
    dict(sku="683562", name="Pisa Nero", material="porcelain", size='13 x 13"', color="black", finish="matte", zone="POR", bay="B01", side="F", section=3, level="T", slot=4),
    dict(sku="684287", name="Marmi Imperiali Zenobia", material="porcelain", size='12"', color="black", finish="matte", zone="POR", bay="B01", side="F", section=3, level="T", slot=3),
    dict(sku="684368", name="Marquina Classic Matte", material="porcelain", size='10"', color="black", finish="matte", zone="POR", bay="B01", side="F", section=3, level="T", slot=2),
    dict(sku="683376", name="Montgomery Black", material="porcelain", size='13 x 13"', color="black", finish="matte", zone="POR", bay="B01", side="F", section=3, level="T", slot=1),

    dict(sku="683561", name="Pisa Gris", material="porcelain", size='13 x 13"', color="white", finish="matte", zone="POR", bay="B01", side="F", section=3, level="B", slot=5),
    dict(sku="683142", name="Colorato Blanco", material="ceramic", size='12 x 12"', color="white", finish="gloss", zone="POR", bay="B01", side="F", section=3, level="B", slot=4),
    dict(sku="683143", name="Colorato Negro", material="ceramic", size='12 x 12"', color="black", finish="gloss", zone="POR", bay="B01", side="F", section=3, level="B", slot=3),
    dict(sku="683378", name="Carrara White", material="porcelain", size='13 x 13"', color="white", finish="matte", zone="POR", bay="B01", side="F", section=3, level="B", slot=2),
    dict(sku="683592", name="Alexandria White", material="ceramic", size='16 x 16"', color="gray", finish="matte", zone="POR", bay="B01", side="F", section=3, level="B", slot=1),

    # Front / Section 2
    dict(sku="684614", name="Keystone Grey Matte", material="porcelain", size='12"', color="gray", finish="matte", zone="POR", bay="B01", side="F", section=2, level="T", slot=5),
    dict(sku="684616", name="Keystone White Matte", material="porcelain", size='12"', color="white", finish="matte", zone="POR", bay="B01", side="F", section=2, level="T", slot=4),
    dict(sku="684285", name="Marmi Imperiali Aurelia", material="porcelain", size='12"', color="white", finish="matte", zone="POR", bay="B01", side="F", section=2, level="T", slot=3),
    dict(sku="484062", name="Portsea Grey", material="porcelain", size='8 x 8"', color="white", finish="matte", zone="POR", bay="B01", side="F", section=2, level="T", slot=2),
    dict(sku="681000", name="Trentino Decoro Fassa", material="porcelain", size='8 x 8"', color="multicolored", finish="matte", zone="POR", bay="B01", side="F", section=2, level="T", slot=1),

    dict(sku="681684", name="Rombos", material="ceramic", size='18 x 18"', color="black", finish="matte", zone="POR", bay="B01", side="F", section=2, level="B", slot=5),
    dict(sku="684286", name="Marmi Imperiali Domitia", material="porcelain", size='12"', color="gray", finish="matte", zone="POR", bay="B01", side="F", section=2, level="B", slot=4),
    dict(sku="684013", name="Antique Aurea Bianco Navona", material="porcelain", size='12 x 12"', color="beige", finish="matte", zone="POR", bay="B01", side="F", section=2, level="B", slot=3),
    dict(sku="683212", name="Antique Beige", material="porcelain", size='13 x 13"', color="beige", finish="matte", zone="POR", bay="B01", side="F", section=2, level="B", slot=2),
    dict(sku="684618", name="Keystone Bone Matte", material="porcelain", size='12"', color="beige", finish="matte", zone="POR", bay="B01", side="F", section=2, level="B", slot=1),

    # Front / Section 1
    dict(sku="684367", name="Calacatta Classic Matte", material="porcelain", size='10"', color="white", finish="matte", zone="POR", bay="B01", side="F", section=1, level="T", slot=5),
    dict(sku="681576", name="Bolshoi Navy", material="porcelain", size='8 x 8"', color="multicolored", finish="matte", zone="POR", bay="B01", side="F", section=1, level="T", slot=4),
    dict(sku="681539", name="Artisan Conte Gris", material="porcelain", size='8 x 8"', color="multicolored", finish="matte", zone="POR", bay="B01", side="F", section=1, level="T", slot=3),
    dict(sku="681575", name="Bolshoi Taupe", material="porcelain", size='8 x 8"', color="beige", finish="matte", zone="POR", bay="B01", side="F", section=1, level="T", slot=2),
    dict(sku="681577", name="Bolshoi Negro", material="porcelain", size='8 x 8"', color="multicolored", finish="matte", zone="POR", bay="B01", side="F", section=1, level="T", slot=1),

    dict(sku="683141", name="Belato Gris", material="ceramic", size='12 x 12"', color="gray", finish="matte", zone="POR", bay="B01", side="F", section=1, level="B", slot=5),
    dict(sku="683377", name="Aurelia Ice", material="porcelain", size='13 x 13"', color="gray", finish="matte", zone="POR", bay="B01", side="F", section=1, level="B", slot=4),
    dict(sku="683140", name="Belato Blanco", material="ceramic", size='12 x 12"', color="beige", finish="matte", zone="POR", bay="B01", side="F", section=1, level="B", slot=3),
    dict(sku="684615", name="Keystone Nero Matte", material="porcelain", size='12"', color="gray", finish="matte", zone="POR", bay="B01", side="F", section=1, level="B", slot=2),
    dict(sku="681259", name="Horton Grey", material="porcelain", size='18 x 18"', color="beige", finish="matte", zone="POR", bay="B01", side="F", section=1, level="B", slot=1),
]

def seed_db(db: Session) -> None:
    if db.query(Tile).count() > 0:
        return
    db.add_all([Tile(**row) for row in SEED_TILES])
    db.commit()
