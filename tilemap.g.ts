// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`0a0008000202020202020202020202010101010101010202020102020202010101020201010101010101010202010202010102010102020101010101020101020201010101010201030202020202020202020202`, img`
2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . 2 2 
2 . 2 2 2 2 . . . 2 
2 . . . . . . . . 2 
2 . 2 2 . . 2 . . 2 
2 . . . . . 2 . . 2 
2 . . . . . 2 . . 2 
2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,sprites.castle.tilePath5,sprites.builtin.forestTiles0,sprites.swamp.swampTile13], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
