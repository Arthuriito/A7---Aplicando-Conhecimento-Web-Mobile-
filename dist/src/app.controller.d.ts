import { Response } from 'express';
export declare class AppController {
    getHome(res: Response): void;
    getCadastroPonto(res: Response): void;
    getRegistroDescarte(res: Response): void;
    getConsultaHistorico(res: Response): void;
    getRelatorios(res: Response): void;
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
