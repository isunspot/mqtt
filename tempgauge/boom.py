#!/usr/bin/env python

import paho.mqtt.client as mqtt
import random
import time

if 0:
	mqttc = mqtt.Client()
	mqttc.connect("localhost", 1883)
else:
	mqttc = mqtt.Client(transport="websockets")
	mqttc.connect("localhost", 8000)

mqttc.loop_start()

while True:
    try:
        payload = "%.1f" % random.uniform(10,45)
        print payload
        rc, mid = mqttc.publish('temp/random', payload, qos=0, retain=False)
        if rc != 0:
            print rc
        time.sleep(0.5)
    except KeyboardInterrupt:
            break

mqttc.loop_stop()
mqttc.disconnect()