var imageMap = new Map();

function MapImage(name) {
	imageMap.set(name, LoadImage("img/" + name + ".png"));
}

// terrain
MapImage("Grass");
MapImage("Water");

// entities
MapImage("Dude");
MapImage("Boulder");

MapImage("rockMiddle");
MapImage("rockBottomRight");
MapImage("rockBottomLeft");
MapImage("rockTopRight");
MapImage("rockTopLeft");

MapImage("stonePathMiddle");
MapImage("stonePathTopLeftCorner");

MapImage("Bed");

// items
MapImage("BlueOrbStaff0");
MapImage("Amulet");
MapImage("demonhelmet");
MapImage("demonchest");
MapImage("deserthat");
MapImage("wings");
MapImage("druidskirt");

// other
MapImage("Chicken");

var tileset = [];

// 0
tileset.push(LoadImage("img/Grass.png"));
tileset.push(LoadImage("img/Water.png"));
tileset.push(LoadImage("img/WoodenFloorMiddle.png"));

var itemset = [];
