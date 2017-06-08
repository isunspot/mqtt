var mqtt = require('mqtt');


client = mqtt.createClient(1883, 'localhost');

client.subscribe('temp/random');
client.publish('temp/random', '49.3');

client.on('message', function (topic, message) {
  console.log(topic,message.toString());
  client.end();
});