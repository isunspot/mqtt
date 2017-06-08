var http     = require('http')
  , httpServ = http.createServer()
  , mosca    = require('mosca')
  , MqttServer = new mosca.Server({
    port: 1883
});

MqttServer.attachHttpServer(httpServ);

httpServ.listen(8000);

MqttServer.on('clientConnected', function(client){
    console.log('client connected', client.id);
});

MqttServer.on('published', function(packet, client) {
	console.log(packet);
    console.log(packet.payload);
    var topic = packet.topic;    
    switch(topic){
    case 'pubMsg':
        console.log('message-publish', packet.payload.toString());
        //MQTTת��������Ϣ
        MqttServer.publish({topic: 'other', payload: 'sssss'});
        //������ϢNODEJS
        console.log('HD: '+ YHSocketMap.get('1000'));
        //����socket.io��Ϣ
        //io.sockets.socket(YHSocketMap.get('1000')).emit('subState', packet);
    break;
    case 'other':
        console.log('message-123', packet.payload.toString());
    break;
    }
});
 
MqttServer.on('ready', function(){
    console.log('mqtt is running...');
});