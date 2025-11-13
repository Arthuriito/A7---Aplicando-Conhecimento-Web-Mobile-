"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisposalPointsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const disposal_points_service_1 = require("./disposal-points.service");
const disposal_points_controller_1 = require("./disposal-points.controller");
const disposal_point_entity_1 = require("../../entities/disposal-point.entity");
let DisposalPointsModule = class DisposalPointsModule {
};
exports.DisposalPointsModule = DisposalPointsModule;
exports.DisposalPointsModule = DisposalPointsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([disposal_point_entity_1.DisposalPoint])],
        providers: [disposal_points_service_1.DisposalPointsService],
        controllers: [disposal_points_controller_1.DisposalPointsController],
        exports: [disposal_points_service_1.DisposalPointsService],
    })
], DisposalPointsModule);
//# sourceMappingURL=disposal-points.module.js.map