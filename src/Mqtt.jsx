import mqtt from "mqtt";


const Mqtt = () => {

    const url = 'ws://broker.emqx.io:8083/mqtt'

    const options = {
        // Clean session
        clean: true,
        connectTimeout: 4000,
        // Authentication
        clientId: 'emqx_test',
        username: 'emqx_test',
        password: 'emqx_test',
    }
    const client  = mqtt.connect(url, options)
    client.on('connect', function () {
        console.log('Connected')
        // Subscribe to a topic
        client.subscribe('test', function (err) {
            if (!err) {
                // Publish a message to a topic
                client.publish('test', 'Hello mqtt')
            }
        })
    })

    client.on('message', function (topic, message) {
        // message is Buffer
        console.log(message.toString())
        client.end()
    })


}; export default Mqtt;