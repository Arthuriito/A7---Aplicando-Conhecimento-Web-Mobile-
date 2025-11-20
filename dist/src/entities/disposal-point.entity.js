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
exports.WasteCategory = exports.LocationType = exports.DisposalPoint = void 0;
const typeorm_1 = require("typeorm");
const disposal_record_entity_1 = require("./disposal-record.entity");
let DisposalPoint = class DisposalPoint {
};
exports.DisposalPoint = DisposalPoint;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DisposalPoint.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DisposalPoint.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DisposalPoint.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DisposalPoint.prototype, "locationType", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], DisposalPoint.prototype, "acceptedCategories", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], DisposalPoint.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], DisposalPoint.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => disposal_record_entity_1.DisposalRecord, record => record.disposalPoint),
    __metadata("design:type", Array)
], DisposalPoint.prototype, "records", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], DisposalPoint.prototype, "createdAt", void 0);
exports.DisposalPoint = DisposalPoint = __decorate([
    (0, typeorm_1.Entity)('disposal_points')
], DisposalPoint);
var LocationType;
(function (LocationType) {
    LocationType["PUBLIC"] = "public";
    LocationType["PRIVATE"] = "private";
})(LocationType || (exports.LocationType = LocationType = {}));
var WasteCategory;
(function (WasteCategory) {
    WasteCategory["PLASTIC"] = "plastic";
    WasteCategory["PAPER"] = "paper";
    WasteCategory["ORGANIC"] = "organic";
    WasteCategory["ELECTRONIC"] = "electronic";
    WasteCategory["GLASS"] = "glass";
    WasteCategory["METAL"] = "metal";
})(WasteCategory || (exports.WasteCategory = WasteCategory = {}));
//# sourceMappingURL=disposal-point.entity.js.map