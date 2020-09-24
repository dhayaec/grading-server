require('dotenv-safe').config();
import { createServer, startServer } from './server'

createServer()
    .then(startServer)
    .catch(err => {
        console.log(err)
    })