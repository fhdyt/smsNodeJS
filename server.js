var SerialPort = require("serialport")

var serialPort = new SerialPort("/dev/ttyUSB1", {
     baudRate: 9600,  
     dataBits: 8,  
     parity: 'none',  
     stopBits: 1, 
     flowControl: false, 
     xon : false, 
     rtscts:false, 
     xoff:false, 
     xany:false, 
     buffersize:0
});


serialPort.on("open", async function () {
    console.log('Serial communication open');
    serialPort.write("AT+CMGF=1\r",11);
    await sleep(100);
    serialPort.write("AT+CSCS=\"gsm\"\r",15);
    await sleep(100);
    serialPort.write("AT+CSCA=\"<Service center number>\"\r",19);
    await sleep(100);
    serialPort.write("AT+CMGS=\"082382547870\"\r\n\0",23);
    await sleep(1000);
    serialPort.write("Checking...\r",6);
    await sleep(1000);
    serialPort.write("\r",0);
    await sleep(100);
    serialPort.write("\x1A",2);
    serialPort.on('data', function(data) {
        console.log(data);
    });
});

function sleep(ms){
return new Promise(resolve=>{
    setTimeout(resolve,ms)
})
}