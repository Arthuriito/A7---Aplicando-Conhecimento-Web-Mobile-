export declare class AppController {
    getApiInfo(): {
        message: string;
        endpoints: {
            'POST /disposal-points': string;
            'GET /disposal-points': string;
            'POST /disposal-records': string;
            'GET /disposal-records': string;
            'GET /disposal-records/relatorio': string;
        };
    };
}
