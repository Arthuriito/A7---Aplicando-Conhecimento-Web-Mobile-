"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("./../src/app.module");
describe('AppController (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    afterEach(async () => {
        await app.close();
    });
    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect({
            message: '🚀 API de Gestão de Resíduos - Projeto Extensionista ODS 12',
            endpoints: {
                'POST /disposal-points': 'Cadastrar ponto de descarte',
                'GET /disposal-points': 'Listar pontos',
                'POST /disposal-records': 'Registrar descarte',
                'GET /disposal-records': 'Consultar histórico',
                'GET /disposal-records/relatorio': 'Dashboard estatístico'
            }
        });
    });
    it('/disposal-points (GET) - deve retornar array vazio ou com pontos', () => {
        return request(app.getHttpServer())
            .get('/disposal-points')
            .expect(200)
            .then(response => {
            expect(Array.isArray(response.body)).toBe(true);
        });
    });
    it('/disposal-records/relatorio (GET) - deve retornar relatório', () => {
        return request(app.getHttpServer())
            .get('/disposal-records/relatorio')
            .expect(200)
            .then(response => {
            expect(response.body).toHaveProperty('mostActiveLocation');
            expect(response.body).toHaveProperty('mostFrequentWaste');
            expect(response.body).toHaveProperty('averageDisposalsPerDay');
            expect(response.body).toHaveProperty('totalUsers');
            expect(response.body).toHaveProperty('totalDisposalPoints');
            expect(response.body).toHaveProperty('growthPercentage');
        });
    });
});
//# sourceMappingURL=app.e2e-spec.js.map