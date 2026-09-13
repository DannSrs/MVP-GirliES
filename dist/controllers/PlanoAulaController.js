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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanoAulaController = void 0;
const tsoa_1 = require("tsoa");
const PlanoAulaRepository_1 = require("../repositories/PlanoAulaRepository");
let PlanoAulaController = class PlanoAulaController extends tsoa_1.Controller {
    repository = new PlanoAulaRepository_1.PlanoAulaRepository();
    async getAulas() {
        return this.repository.findAll();
    }
    async getAulaById(id) {
        const aula = await this.repository.findById(id);
        if (!aula) {
            this.setStatus(404);
            return undefined;
        }
        return aula;
    }
    async criarAula(requestBody) {
        this.setStatus(201);
        return this.repository.create(requestBody);
    }
    async atualizarAula(id, requestBody) {
        const updated = await this.repository.update(id, requestBody);
        if (!updated) {
            this.setStatus(404);
            return undefined;
        }
        return updated;
    }
    async deletarAula(id) {
        const deleted = await this.repository.delete(id);
        if (!deleted) {
            this.setStatus(404);
            return { success: false };
        }
        return { success: true };
    }
};
exports.PlanoAulaController = PlanoAulaController;
__decorate([
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlanoAulaController.prototype, "getAulas", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    (0, tsoa_1.Response)(404, "Aula não encontrada"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlanoAulaController.prototype, "getAulaById", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlanoAulaController.prototype, "criarAula", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    (0, tsoa_1.Response)(404, "Aula não encontrada"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PlanoAulaController.prototype, "atualizarAula", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    (0, tsoa_1.Response)(404, "Aula não encontrada"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlanoAulaController.prototype, "deletarAula", null);
exports.PlanoAulaController = PlanoAulaController = __decorate([
    (0, tsoa_1.Route)("api/aulas"),
    (0, tsoa_1.Tags)("Plano de Aulas")
], PlanoAulaController);
