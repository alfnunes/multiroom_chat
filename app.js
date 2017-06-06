const app = require('./config/server');
 
let server = app.listen(3000, function(){
    console.log('Servidor Online');
});

let io = require('socket.io').listen(server);

app.set('io',io);

/*criar conexao por websocket*/
io.on('connection', function(socket){ 

    socket.on('disconnect', function(){       
    });

    socket.on('msgParaServidor', function(data){
        socket.emit(
            'msgParaCliente',
            {apelido : data.apelido, mensagem : data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaCliente',
            {apelido : data.apelido, mensagem : data.mensagem}
        );

        if(parseInt(data.apelidoAtualizado) == 0){
            socket.emit(
                'participantsClient',
                {apelido : data.apelido}
            );
            socket.broadcast.emit(
                'participantsClient',
                {apelido : data.apelido}
            );
        }
    });    
});
