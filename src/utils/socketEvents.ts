module.exports =  function(socket: { on: (arg0: string, arg1: (data: any) => void) => void; emit: (arg0: string, arg1: any) => void; }) {
    socket.on('message', function(data) {
          console.log(data)
    });

    socket.on('bruv', function(data) {
        console.log('user disconnected' + data);
    });

}