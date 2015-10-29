console.log( 'Starting' );

var onoff = requite( 'onoff' );
var Gpio = onoff.Gpio;
var sensor = new Gpio( 26, 'in' );

sensor.watch( function( err, state ){
	console.log( 'Sensor state change: ' + state );
} );


//process.exit();
