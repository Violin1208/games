var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
	{ preload: preload, create: create, update: update });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('red_icon', 'red-picture-icon.png');
    game.load.image('blue_icon', 'blue-picture-icon.png');
    game.load.image('yellow_icon', 'yellow-picture-icon.png');
    game.load.image('green_icon', 'green-picture-icon.png');
    game.load.image('cover_icon', 'Photo-icon1.png')
    game.load.image('map_background', 'booths-london-poverty-map.jpg');


}
var click_counter = 0;
var previously_clicked = [];
var matches = 0;

function create_tile(x,y,color){
    var tile = game.add.sprite(200 + 128*x, 100+128*y, color);
	tile.anchor.set(0.5, 0.5);
	
	//hides images under the cover tiles
	var hideTile = game.add.sprite(200 + 128*x, 100+128*y, 'cover_icon');
	hideTile.anchor.set(0.5, 0.5);
	hideTile.inputEnabled = true;
	hideTile.color = color;
	hideTile.events.onInputDown.add(function(){
		click_counter += 1;
		if(click_counter == 3) {
			var prev1 = previously_clicked[previously_clicked.length-1];
			var prev2 = previously_clicked[previously_clicked.length-2];

			click_counter -= 2;
			if(prev1.color === prev2.color) {
				prev1.kill();
				prev1.kill();
				matches += 1;
			} else {
				prev1.visible = true;
				prev2.visible = true;
			}
		}
		previously_clicked.push(hideTile);
		console.log("clicked on", x, y, color, click_counter);
		//hideTile.kill();
		hideTile.visible = false;
	});
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

tile_colors = ['red_icon', 'blue_icon', 'green_icon', 'yellow_icon',
'red_icon', 'blue_icon', 'green_icon', 'yellow_icon', 'red_icon', 'blue_icon', 
'green_icon', 'yellow_icon', 'red_icon', 'blue_icon', 'green_icon', 'yellow_icon']

function create() {
	var background = game.add.sprite(400, 300, 'map_background');
    background.anchor.set(0.5, 0.5);
    background.width = 800;
    background.height = 600;

shuffle(tile_colors)

    for (var x of [0,1,2,3]) {
      for (var y of [0,1,2,3]) {
      	create_tile(x,y,tile_colors.pop());
      }
    }
    

}

function update() {
}