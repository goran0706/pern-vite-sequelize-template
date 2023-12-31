import assert from 'assert';
import http from 'http';
import {startHttpServer} from '../src/setup/server.js';

describe('Example Node Server', () => {
    it('should return 200', (done) => {
        startHttpServer();
        http.get('http://127.0.0.1:8080', (res) => {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});
