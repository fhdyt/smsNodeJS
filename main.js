var SerialPort = require("serialport").SerialPort
let serialPort = new SerialPort("/dev/ttyUSB0", {
     baudrate: 9600,  dataBits: 8,  parity: 'none',  stopBits: 1, flowControl: false, xon : false, rtscts:false, xoff:false, xany:false, buffersize:0
});

serialPort.on("open", function () {
    console.log('Serial communication open');
    serialPort.write("AT^SYSCFG=13,1,3FFFFFFF,2,4");
    serialPort.write('\r');
    serialPort.on('data', function(data) {
        console.log("Received data: " + data);
    });
    gsm_message_sending(serialPort, "test2", "<you phone number>");
});

function gsm_message_sending(serial, message, phone_no) {
    serial.write("AT+CMGF=1");
    serial.write('\r');
    serial.write("AT+CMGS=\"");
    serial.write(phone_no);
    serial.write('"')
    serial.write('\r');
    serial.write(message); 
    serial.write(Buffer([0x1A]));
    serial.write('^z');
}