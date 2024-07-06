import { app } from './app'

app.listen({ 
    port: 9000,
    host: '0.0.0.0'
}).then(() => console.log('Server is running on http://localhost:9000'))
