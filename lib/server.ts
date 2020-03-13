import app from './app';
import * as http from 'http';
const PORT = 3000;
import  logger from './../config/log';

http.createServer(app).listen(PORT, () => {
    logger.info(`Server listening on port: ${PORT}`);
    console.log('Express server listening on port ' + PORT);
})