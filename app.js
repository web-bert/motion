console.log( 'Starting' );

var onoff = require( 'onoff' );
var Gpio = onoff.Gpio;
var sensor = new Gpio( 7, 'in', 'both' );

function exit(){
	sensor.unexport();
	process.exit();
}

sensor.watch( function( err, state ){

	if( err ){

		console.log( 'Error with sensor ', err );

	} else {

		console.log( 'Sensor state change: ' + state );
	}
} );

console.log( 'Waiting for sensor state changes...' );

process.on( 'SIGINT', exit );
