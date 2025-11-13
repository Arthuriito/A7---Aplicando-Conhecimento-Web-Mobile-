export declare class AppController {
    getHello(): {
        message: string;
        description: string;
        version: string;
        endpoints: {
            'POST /disposal-points': string;
            'GET /disposal-points': string;
            'GET /disposal-points/:id': string;
            'POST /disposal-records': string;
            'GET /disposal-records': string;
            'GET /disposal-records/relatorio': string;
        };
        documentation: string;
    };
}
