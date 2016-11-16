var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('candy_street', 'candykingdom3.gif');
    game.load.image('candy_puppy', 'candy-puppy.png');
    game.load.image('candy_cat', 'candy_cat.png');
    game.load.image('candy1', 'pink_candy.png');
    game.load.image('candy2', 'red_candy.png');
    game.load.image('candy3', 'peppermint_candy.png');

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





    text = game.add.text(400, 50, 'Click and move the cat!', {fill: '#ADFF2F', fontSize: '60px'});
    text.anchor.set(0.5);


    emitter = game.add.emitter(game.world.centerX, 200, 200);

    //  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
    emitter.makeParticles(['candy1', 'candy2', 'candy3'], 0, undefined, true, true);
    emitter.minParticleScale = 0.05;
    emitter.maxParticleScale = 0.10;
    emitter.width = 400;
    emitter.start(false, 5000, 100);


    running_around_puppy = game.add.sprite(400, 550, 'candy_puppy');
    running_around_puppy.anchor.set(0.5, 0.5);
    running_around_puppy.width = 100;
    running_around_puppy.height = 100;

    game.physics.enable(running_around_puppy, Phaser.Physics.ARCADE);

    running_around_puppy.body.velocity.x=150;

    cat = game.add.sprite(400, 300, 'candy_cat');
    cat.anchor.set(0.5, 0.5);
    cat.width = 100;
    cat.height = 100;
    game.physics.enable(cat, Phaser.Physics.ARCADE);

    
}
//to have running_around_puppy moving around
function update() {
    game.physics.arcade.overlap(emitter, cat, cat_got_candy, null, this);
    game.physics.arcade.overlap(emitter, running_around_puppy, puppy_got_candy, null, this);

	if (running_around_puppy.x > 700) {
		    running_around_puppy.body.velocity.x = -150;
	}

	if (running_around_puppy.x <100) {
		    running_around_puppy.body.velocity.x = 150;
  }

  //  If the cat is > 8px away from the pointer then let's move to it
    if (game.physics.arcade.distanceToPointer(cat, game.input.activePointer) > 8)
    {
        //  Make the object seek to the active pointer (mouse or touch).
        game.physics.arcade.moveToPointer(cat, 300);
    }
    else
    {
        //  Otherwise turn off velocity because we're close enough to the pointer
        cat.body.velocity.set(0);
    }
}

function cat_got_candy(cat, candy) {
	candy.kill();
}
function puppy_got_candy(puppy, candy) {
	candy.kill();

}


function clicked_on_image() {
	text.text = "Clicked. Enjoy!!";
}


