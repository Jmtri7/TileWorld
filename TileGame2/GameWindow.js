// draws (width) pixel by (height) px (map) at (x, y)
QuickCanvas.prototype.DrawMap = function(map, x, y, cellWidth, cellHeight, centerRow, centerCol) {

	this.ctx.save();
	this.ctx.translate(x, y);

	var mapWidth = cellWidth * map.nodes.length;
	var mapHeight = cellHeight * map.nodes[0].length;

	// black out map
	this.PaintRectangle(0, 0, mapWidth, mapHeight, "black");

	// center on
	this.ctx.translate(mapWidth / 2 - centerCol * cellWidth - cellWidth / 2, mapHeight / 2 - centerRow * cellHeight - cellHeight / 2);

	// draw (viewRadius)) cells out from central cell
	var viewRadius = 3;
	var minRow = Math.max(0, centerRow - viewRadius);
	var maxRow = Math.min(map.nodes.length, centerRow + viewRadius + 1);
	var minCol = Math.max(0, centerCol - viewRadius);
	var maxCol  = Math.min(map.nodes[0].length, centerCol + viewRadius + 1);

	// draw circles at all nodes
	for(var row = minRow; row < maxRow; row++) {
		for(var col = minCol; col < maxCol; col++) {

			var currentNode = map.nodes[row][col];

			// paint tile
			//this.PaintRectangle(cellWidth * col - cellWidth / 2, cellHeight * row - cellHeight / 2, cellWidth, cellHeight, currentNode.tileColor);
			this.ctx.drawImage(currentNode.terrain, cellWidth * col, cellHeight * row, cellWidth, cellHeight);

			for(var item = 0; item < currentNode.items.length; item++) {
				this.ctx.drawImage(currentNode.items[item].img, cellWidth * col, cellHeight * row, cellWidth, cellHeight);
			}

			// draw entities
			for(var entity = 0; entity < currentNode.entities.length; entity++) {

				// entity placeholder
				//this.PaintCircle(cellWidth * col, cellHeight * row, 5, "yellow");
				this.ctx.drawImage(currentNode.entities[entity].img, cellWidth * col, cellHeight * row, cellWidth, cellHeight);

				for(var item = 0; item < currentNode.entities[entity].equipped.length; item++) {
					this.ctx.drawImage(currentNode.entities[entity].equipped[item].img, cellWidth * col, cellHeight * row, cellWidth, cellHeight);
				}
			}

			// draw node
			//this.DrawCircle(cellWidth * col + cellWidth / 2, cellHeight * row + cellHeight / 2, 5);

			// draw lines to all neighbors
			// for(var neighbor = 0; neighbor < 4; neighbor++) {
			// 	if(currentNode.neighbors[neighbor] !== undefined) {

			// 		this.DrawLine(currentNode.col * cellWidth, currentNode.row * cellHeight, currentNode.neighbors[neighbor].col * cellWidth, currentNode.neighbors[neighbor].row * cellHeight,);

			// 	}
			// }
		}
	}

	this.ctx.restore();

	// menu
	this.PaintRectangle(0, 0, 400, 75, "#663300");

	// inventory bar
	this.PaintRectangle(0, 475, 400, 75, "#663300");
	this.PaintRectangle(10, 485, 380, 55, "#000000");
	this.PaintRectangle(10 + cellWidth * player1.selectedItem, 485, cellWidth - 10, cellHeight - 25, "yellow");
	for(var i = 0; i < player1.inventory.length; i++) {
		this.ctx.drawImage(player1.inventory[i].img, 10 + cellWidth * i, 485, cellWidth - 10, cellHeight - 25);
	}
}