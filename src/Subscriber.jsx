// Subscriber.js
import { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const Subscriber = () => {
    const [values, setValues] = useState([]);

    useEffect(() => {
        // MQTT broker URL
        const brokerUrl = 'ws://localhost:8083/mqtt';

        // Topic to subscribe to
        const topic = 'random-values';

        const options = {
            // Clean session
            clean: true,
            connectTimeout: 4000,
            // Authentication
            username: 'emqx_test',
            password: 'emqx_test',
        }

        // Create an MQTT client instance
        const client = mqtt.connect(brokerUrl, options);

        // Connect to the MQTT broker
        client.on('connect', () => {
            console.log('Subscriber connected to MQTT broker');
            // Subscribe to the topic
            client.subscribe(topic);
        });

        // Handle incoming messages
        client.on('message', (receivedTopic, message) => {
            // Check if the received message is from the subscribed topic
            if (receivedTopic === topic) {
                const newValue = parseFloat(message.toString());
                setValues(prevValues => [...prevValues, newValue]);
            }
        });

        // Handle errors
        client.on('error', (error) => {
            console.error('Subscriber error:', error);
        });

        // Cleanup function
        return () => {
            client.end();
        };
    }, []);

    return (
        <div>
            <h2>Received Values:</h2>
            <ul>
                {values.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
        </div>
    );
};

export default Subscriber;
