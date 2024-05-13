// Publisher.js
import { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const Publisher = () => {
    const [client, setClient] = useState(null);

    useEffect(() => {
        const brokerUrl = 'ws://localhost:8083/mqtt';
        const topic = 'random-values';
        const options = {
            clean: true,
            connectTimeout: 4000,
            clientId: 'emqx_test',
            username: 'emqx_test',
            password: 'emqx_test',
        };

        const mqttClient = mqtt.connect(brokerUrl, options);
        setClient(mqttClient);

        let intervalId = setInterval(() => {
            if (mqttClient.connected) {
                const randomValue = Math.random() * 100;
                mqttClient.publish(topic, randomValue.toString());
                console.log(`Published value: ${randomValue}`);
            } else {
                console.log('Client is not connected.');
            }
        }, 1000);

        mqttClient.on('connect', () => {
            console.log('Publisher connected to MQTT broker');
        });

        mqttClient.on('error', (error) => {
            console.error('Publisher error:', error);
        });

        return () => {
            clearInterval(intervalId);
            if (mqttClient) {
                mqttClient.end();
            }
        };
    }, []);

    return null; // No UI for the publisher
};

export default Publisher;
