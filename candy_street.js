var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('candy_street', 'candykingdom3.gif');
    game.load.image('candy_puppy', 'candy-puppy.png');

}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    var background = game.add.sprite(400, 300, 'candy_street');
    background.anchor.set(0.5, 0.5);
    background.width = 800;
    background.height = 600;

    background.inputEnabled = true;
    background.events.onInputDown.add(clicked_on_image, this);





    text = game.add.text(250, 16, 'Hello', {fill: '#ff80ff', fontSize: '60px'})

    running_around_puppy = game.add.sprite(400, 550, 'candy_puppy');
    running_around_puppy.anchor.set(0.5, 0.5);
    running_around_puppy.width = 100;
    running_around_puppy.height = 100;

    game.physics.enable(running_around_puppy, Phaser.Physics.ARCADE);

    running_around_puppy.body.velocity.x=150;

}
//to have running_around_puppy moving around
function update() {
	if (running_around_puppy.x > 700) {
		    running_around_puppy.body.velocity.x = -150;
	}

	if (running_around_puppy.x <100) {
		    running_around_puppy.body.velocity.x = 150;
  }
}

function clicked_on_image() {
	text.text = "Clicked!!";
}


