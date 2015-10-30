console.log( 'Starting' );

var onoff = require( 'onoff' );
var http = require( 'http' );
var config = require( './config' );

var Gpio = onoff.Gpio;
var sensor = new Gpio( config.sensor.gpio, 'in', 'both' );

function exit(){
	sensor.unexport();
	process.exit();
}

sensor.watch( function( err, state ){

	var path;
	var req;

	if( err ){

		console.log( 'Error with sensor ', err );

	} else {

		if( state === 1 ){

			console.log( 'Sending request to /play/' );

			var req = http.request( {
				hostname: config.api.host,
				port: config.api.port,
				path: '/play/'
			}, function( res ){
	
				var data = '';

				res.on( 'data', function( chunk ){
					data += chunk;
				} );
			
				res.on( 'end', function(){
					console.log( 'Response received. Status: %s, body: %s', res.statusCode, data );
				} );
			} );

			req.on( 'error', function( e ){
				console.log( 'Error with request: %s', e.message );
			} );

			req.end();
		}

		//console.log( 'Sensor state change: ' + state );
	}
} );

console.log( 'Waiting for sensor state changes...' );

process.on( 'SIGINT', exit );
