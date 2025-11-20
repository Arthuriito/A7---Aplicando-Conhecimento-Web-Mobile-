"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisposalRecord = void 0;
const typeorm_1 = require("typeorm");
const disposal_point_entity_1 = require("./disposal-point.entity");
let DisposalRecord = class DisposalRecord {
};
exports.DisposalRecord = DisposalRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DisposalRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DisposalRecord.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => disposal_point_entity_1.DisposalPoint),
    (0, typeorm_1.JoinColumn)({ name: 'disposalPointId' }),
    __metadata("design:type", disposal_point_entity_1.DisposalPoint)
], DisposalRecord.prototype, "disposalPoint", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DisposalRecord.prototype, "disposalPointId", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], DisposalRecord.prototype, "wasteType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], DisposalRecord.prototype, "disposalDate", void 0);
exports.DisposalRecord = DisposalRecord = __decorate([
    (0, typeorm_1.Entity)('disposal_records')
], DisposalRecord);
//# sourceMappingURL=disposal-record.entity.js.map