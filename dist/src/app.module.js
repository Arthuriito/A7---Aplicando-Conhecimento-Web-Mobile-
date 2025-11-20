"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const frontend_controller_1 = require("./frontend.controller");
const disposal_points_module_1 = require("./modules/disposal-points/disposal-points.module");
const disposal_records_module_1 = require("./modules/disposal-records/disposal-records.module");
const disposal_point_entity_1 = require("./entities/disposal-point.entity");
const disposal_record_entity_1 = require("./entities/disposal-record.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'database.sqlite',
                entities: [disposal_point_entity_1.DisposalPoint, disposal_record_entity_1.DisposalRecord],
                synchronize: true,
            }),
            disposal_points_module_1.DisposalPointsModule,
            disposal_records_module_1.DisposalRecordsModule,
        ],
        controllers: [app_controller_1.AppController, frontend_controller_1.FrontendController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map