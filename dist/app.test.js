"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("./app");
const globals_1 = require("@jest/globals");
let server;
(0, globals_1.describe)('/', () => {
    (0, globals_1.beforeAll)((done) => {
        server = app_1.app.listen(null, () => {
            global.agent = supertest_1.default.agent(server);
            done();
        });
    });
    (0, globals_1.it)('GET should return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get('/');
        (0, globals_1.expect)(response.status).toBe(200);
    }));
    /*   it('POST should return 200', async () => {
        const response = await supertest(app).post('/');
        expect(response.status).toBe(200);
      });
    
      it('DELETE should return 200', async () => {
        const response = await supertest(app).delete('/');w
        expect(response.status).toBe(200);
      });
    
      it('PUT should return 200', async () => {
        const response = await supertest(app).put('/');
        expect(response.status).toBe(200);
      }); */
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server.close();
    }));
});
//# sourceMappingURL=app.test.js.map