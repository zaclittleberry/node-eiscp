var util = require('util'),
    eiscp = require('../eiscp');

/*
   Connect to receiver and send a command
   Disconnect when response is received
*/

// Will discover receiver automatically
eiscp.connect();
// Or connect to a specific IP
//eiscp.connect({host:"10.0.0.5"});

// Prints debugging info to the terminal
eiscp.on("debug", util.log);
// Prints errors to the terminal
eiscp.on("error", util.log);

/*
  Here we listen to volume changes (but we close the connection after the first volume change)
  You can listen to any supported command, see example 3.js, or you can listen to the data event to catch everything the receiver sends

  Please note that there is no way to identify who caused the volume to change
  You could just as well remove the eiscp.command (further down) and change the volume with the volume knob
*/
eiscp.on('volume', function(arg) {
    // Print received volume
    console.log(util.format("\nVolume changed to: %s\n", arg));
    // Close connection
    eiscp.close();
});

eiscp.on('connect', function () {

    // Ask for power state
    //eiscp.command("system-power=query");

    // Set the volume to 22
    eiscp.command("volume=22");
});
