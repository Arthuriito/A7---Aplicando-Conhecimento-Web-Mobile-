"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisposalRecordsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const disposal_records_service_1 = require("./disposal-records.service");
const disposal_records_controller_1 = require("./disposal-records.controller");
const disposal_record_entity_1 = require("../../entities/disposal-record.entity");
const disposal_point_entity_1 = require("../../entities/disposal-point.entity");
let DisposalRecordsModule = class DisposalRecordsModule {
};
exports.DisposalRecordsModule = DisposalRecordsModule;
exports.DisposalRecordsModule = DisposalRecordsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([disposal_record_entity_1.DisposalRecord, disposal_point_entity_1.DisposalPoint])],
        providers: [disposal_records_service_1.DisposalRecordsService],
        controllers: [disposal_records_controller_1.DisposalRecordsController],
        exports: [disposal_records_service_1.DisposalRecordsService],
    })
], DisposalRecordsModule);
//# sourceMappingURL=disposal-records.module.js.map