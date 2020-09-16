// Requires QuickCanvas.js for drawing

var itemID = 0;
class Item {
	constructor(img) {
		this.id = itemID;
		itemID++;

		this.img = img;
	}
}

// Adds an entity to a given map
function AddItem(map, row, col, img) {
	var newItem = new Item(img);

	map.nodes[row][col].items.push(newItem);

	return newItem;
}

// Players, NPCs, and Creatures
var entityID = 0;
class Entity {
	constructor(map, row, col, img) {
		this.id = entityID;
		entityID++;

		this.map = map;
		this.node = map.nodes[row][col];
		this.img = img;

		this.obstructs = true;

		this.inventory = [];
		this.selectedItem = 0;
		this.equipped = [];
	}

	Take() {
		if(this.node.items[0] != undefined) {
			this.inventory.push(this.node.items[0]);
			this.node.items.splice(0, 1);
		}
	}

	Select() {
		this.selectedItem++;
		if(this.selectedItem >= this.inventory.length) {
			this.selectedItem = 0;
		}
	}

	Equip() {
		var itemID = this.inventory[this.selectedItem].id;
		for(var i = 0; i < this.equipped.length; i++) {
			if(this.equipped[i].id == itemID) {
				this.equipped.splice(i, 1);
				return 0;
			}
		}

		this.equipped.push(this.inventory[this.selectedItem]);
	}

	Move(direction) {
		if(this.node.neighbors[direction] == undefined || this.node.neighbors[direction].obstructs || this.node.neighbors[direction].IsObstructed()) {
			return -1;
		}

		var entityIndex = this.node.FindEntity(this.id);
		if(entityIndex != -1) {
			console.log(entityIndex);
			this.node.entities.splice(entityIndex, 1);
		}

		this.node.neighbors[direction].entities.push(this);
		this.node = this.node.neighbors[direction];

		return 0;
	}

	Wander() {
		var direction = Math.round(Math.random() * 7);
		this.Move(direction);
	}
}

// Adds an entity to a given map
function AddEntity(map, row, col, img) {
	var newEntity = new Entity(map, row, col, img);

	map.nodes[row][col].entities.push(newEntity);

	return newEntity;
}

// has a position and neighbor nodes
class Node {
	constructor(terrain, row, col) {

		// color of tile at node
		//this.tileColor = color;

		// location on map
		this.row = row;
		this.col = col;

		// up to 8 neighbors
		this.neighbors = [];

		// tile type
		this.terrain = terrain;

		// inhabitants of this node
		this.entities = [];

		this.items = [];

		this.obstructs = false;
	}

	IsObstructed() {
		for(var i = 0; i < this.entities.length; i++) {
			if(this.entities[i].obstructs == true) {
				return true;
			}

			return false;
		}
	}

	FindEntity(entityID) {
		for(var i = 0; i < this.entities.length; i++) {
			if(this.entities[i].id == entityID) {
				return i;
			}
		}

		return -1;
	}
}

// creates a grid of connected nodes
class GameMap {
	constructor(terrainData, entityData) {

		// copy map data
		this.nodes = terrainData;

		// turn map data into map
		for(var row = 0; row < terrainData.length; row++) {
			for(var col = 0; col < terrainData[row].length; col++) {

				// creates terrain
				var mapEntry = terrainData[row][col]; 
				if(mapEntry == 0) {
					var newNode = new Node(tileset[0], row, col);
				} else if(mapEntry == 1) {
					var newNode = new Node(tileset[1], row, col);
					newNode.obstructs = true;
				} else if(mapEntry == 2) {
					var newNode = new Node(tileset[2], row, col);
				} else if(mapEntry == 3) {
					var newNode = new Node(imageMap.get("stonePathMiddle"), row, col);
				}

				// replaces map data entry with node
				this.nodes[row][col] = newNode;

				// creates entities
				var entityType = entityData[row][col];
				if(entityType != 0) {
					if(entityType == 1) {
						var newEntity = new Entity(this, row, col, imageMap.get("Boulder"));
					} else if(entityType == 2) {
						var newEntity = new Entity(this, row, col, imageMap.get("rockMiddle"));
					} else if(entityType == 3) {
						var newEntity = new Entity(this, row, col, imageMap.get("rockBottomRight"));
					} else if(entityType == 4) {
						var newEntity = new Entity(this, row, col, imageMap.get("rockBottomLeft"));
					} else if(entityType == 5) {
						var newEntity = new Entity(this, row, col, imageMap.get("rockTopRight"));
					} else if(entityType == 6) {
						var newEntity = new Entity(this, row, col, imageMap.get("rockTopLeft"));
					} else if(entityType == 7) {
						var newEntity = new Entity(this, row, col, imageMap.get("stonePathMiddle"));
						newEntity.obstructs = false;
					} else if(entityType == 8) {
						var newEntity = new Entity(this, row, col, imageMap.get("stonePathTopLeftCorner"));
						newEntity.obstructs = false;
					} else if(entityType == 9) {
						var newEntity = new Entity(this, row, col, imageMap.get("Bed"));
						newEntity.obstructs = false;
					} else {
						var newEntity = new Entity(this, row, col, entityset[entityType]);
					}

					this.nodes[row][col].entities.push(newEntity);
				}

				// connect neighbors created thus far (previous rows and columns)

				// not first row
				if(row != 0) {
					// attach top
					this.nodes[row][col].neighbors[0] = this.nodes[row - 1][col];
					this.nodes[row - 1][col].neighbors[4] = this.nodes[row][col];

					// not last column
					if(col != terrainData[row].length - 1) {
						// attach top right
						this.nodes[row][col].neighbors[1] = this.nodes[row - 1][col + 1];
						this.nodes[row - 1][col + 1].neighbors[5] = this.nodes[row][col];
					}
				}

				// not first column
				if(col != 0) {
					// attach left
					this.nodes[row][col].neighbors[6] = this.nodes[row][col - 1];
					this.nodes[row][col - 1].neighbors[2] = this.nodes[row][col];

					// not first row
					if(row != 0) {
						// attach top left
						this.nodes[row][col].neighbors[7] = this.nodes[row - 1][col - 1];
						this.nodes[row - 1][col - 1].neighbors[3] = this.nodes[row][col];
					}
				}

			}
		}

	}
}