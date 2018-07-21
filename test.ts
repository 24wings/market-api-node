var os = require('os');
import ip = require('ip');

let ipstr = ip.address() // my ip address
console.log(`ipstr:`, ipstr);
var ifaces = os.networkInterfaces();
for (var dev in ifaces) {
    var alias = 0;
    ifaces[dev].forEach(function (details) {
        if (details.family == 'IPv4') {
            console.log(dev + (alias ? ':' + alias : ''), details.address);
            ++alias;
        }
    });
}
