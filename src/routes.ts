/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PlanoAulaController } from './controllers/PlanoAulaController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HealthController } from './controllers/HealthController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ChecklistItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "atividadeId": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "isCompleted": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LinksAtividade": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "atividadeId": {"dataType":"string","required":true},
            "tipo": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Material"]},{"dataType":"enum","enums":["Link Auxiliar"]}],"required":true},
            "link": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlanoAula": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "titulo": {"dataType":"string","required":true},
            "descricao": {"dataType":"string"},
            "categoria": {"dataType":"string"},
            "dataHora": {"dataType":"string","required":true},
            "local": {"dataType":"string"},
            "status": {"dataType":"string"},
            "linkPlanoAula": {"dataType":"string"},
            "checklist": {"dataType":"array","array":{"dataType":"refObject","ref":"ChecklistItem"}},
            "links": {"dataType":"array","array":{"dataType":"refObject","ref":"LinksAtividade"}},
            "responsaveisId": {"dataType":"array","array":{"dataType":"double"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_PlanoAula.Exclude_keyofPlanoAula.id-or-checklist-or-links__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"titulo":{"dataType":"string","required":true},"descricao":{"dataType":"string"},"categoria":{"dataType":"string"},"dataHora":{"dataType":"string","required":true},"local":{"dataType":"string"},"status":{"dataType":"string"},"linkPlanoAula":{"dataType":"string"},"responsaveisId":{"dataType":"array","array":{"dataType":"double"}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_PlanoAula.id-or-checklist-or-links_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_PlanoAula.Exclude_keyofPlanoAula.id-or-checklist-or-links__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ChecklistItem.Exclude_keyofChecklistItem.id-or-atividadeId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"description":{"dataType":"any","required":true},"isCompleted":{"dataType":"any","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ChecklistItem.id-or-atividadeId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_ChecklistItem.Exclude_keyofChecklistItem.id-or-atividadeId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_LinksAtividade.Exclude_keyofLinksAtividade.id-or-atividadeId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"tipo":{"dataType":"any","required":true},"link":{"dataType":"any","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_LinksAtividade.id-or-atividadeId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_LinksAtividade.Exclude_keyofLinksAtividade.id-or-atividadeId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CriarPlanoAulaDTO": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Omit_PlanoAula.id-or-checklist-or-links_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"links":{"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_LinksAtividade.id-or-atividadeId_"}},"checklist":{"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_ChecklistItem.id-or-atividadeId_"}}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_CriarPlanoAulaDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"titulo":{"dataType":"string"},"descricao":{"dataType":"string"},"categoria":{"dataType":"string"},"dataHora":{"dataType":"string"},"local":{"dataType":"string"},"status":{"dataType":"string"},"linkPlanoAula":{"dataType":"string"},"responsaveisId":{"dataType":"array","array":{"dataType":"double"}},"checklist":{"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_ChecklistItem.id-or-atividadeId_"}},"links":{"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_LinksAtividade.id-or-atividadeId_"}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AtualizarPlanoAulaDTO": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_CriarPlanoAulaDTO_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HealthResponse": {
        "dataType": "refObject",
        "properties": {
            "ok": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsPlanoAulaController_getAulas: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/aulas',
            ...(fetchMiddlewares<RequestHandler>(PlanoAulaController)),
            ...(fetchMiddlewares<RequestHandler>(PlanoAulaController.prototype.getAulas)),

            async function PlanoAulaController_getAulas(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPlanoAulaController_getAulas, request, response });

                const controller = new PlanoAulaController();

              await templateService.apiHandler({
                methodName: 'getAulas',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPlanoAulaController_getAulaById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/aulas/:id',
            ...(fetchMiddlewares<RequestHandler>(PlanoAulaController)),
            ...(fetchMiddlewares<RequestHandler>(PlanoAulaController.prototype.getAulaById)),

            async function PlanoAulaController_getAulaById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPlanoAulaController_getAulaById, request, response });

                const controller = new PlanoAulaController();

              await templateService.apiHandler({
                methodName: 'getAulaById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPlanoAulaController_criarAula: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CriarPlanoAulaDTO"},
        };
        app.post('/api/aulas',
            ...(fetchMiddlewares<RequestHandler>(PlanoAulaController)),
            ...(fetchMiddlewares<RequestHandler>(PlanoAulaController.prototype.criarAula)),

            async function PlanoAulaController_criarAula(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPlanoAulaController_criarAula, request, response });

                const controller = new PlanoAulaController();

              await templateService.apiHandler({
                methodName: 'criarAula',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPlanoAulaController_atualizarAula: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AtualizarPlanoAulaDTO"},
        };
        app.put('/api/aulas/:id',
            ...(fetchMiddlewares<RequestHandler>(PlanoAulaController)),
            ...(fetchMiddlewares<RequestHandler>(PlanoAulaController.prototype.atualizarAula)),

            async function PlanoAulaController_atualizarAula(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPlanoAulaController_atualizarAula, request, response });

                const controller = new PlanoAulaController();

              await templateService.apiHandler({
                methodName: 'atualizarAula',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPlanoAulaController_deletarAula: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/api/aulas/:id',
            ...(fetchMiddlewares<RequestHandler>(PlanoAulaController)),
            ...(fetchMiddlewares<RequestHandler>(PlanoAulaController.prototype.deletarAula)),

            async function PlanoAulaController_deletarAula(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPlanoAulaController_deletarAula, request, response });

                const controller = new PlanoAulaController();

              await templateService.apiHandler({
                methodName: 'deletarAula',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHealthController_getHealth: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/health',
            ...(fetchMiddlewares<RequestHandler>(HealthController)),
            ...(fetchMiddlewares<RequestHandler>(HealthController.prototype.getHealth)),

            async function HealthController_getHealth(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHealthController_getHealth, request, response });

                const controller = new HealthController();

              await templateService.apiHandler({
                methodName: 'getHealth',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
