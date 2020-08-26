const serialportgsm = require('serialport-gsm')
 
serialportgsm.list((err, result) => {
    //console.log(result)
})

let modem = serialportgsm.Modem()
let options = {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    rtscts: false,
    xon: false,
    xoff: false,
    xany: false,
    autoDeleteOnReceive: true,
    enableConcatenation: true,
    incomingCallIndication: true,
    incomingSMSIndication: true,
    pin: '',
    customInitCommand: '',
    logger: console
}
 
modem.open('/dev/ttyUSB1', options, {})
modem.on('open', data => {
    modem.initializeModem((data) => {
        console.log("modem initial");
        modem.sendSMS('082382547870', 'Hello there Zab!', true, (data) =>{
            console.log(data)
        })
    })
})

modem.on('onSendingMessage', result => { 
    console.log(result)
 })