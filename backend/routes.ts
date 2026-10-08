/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsuarioController } from './controllers/UsuarioController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PostInstagramController } from './controllers/PostInstagramController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PlanoAulaController } from './controllers/PlanoAulaController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HealthController } from './controllers/HealthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventoGeralController } from './controllers/EventoGeralController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ConfiguracaoController } from './controllers/ConfiguracaoController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ChecklistController } from './controllers/ChecklistController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './controllers/AuthController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Usuario": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "nome": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "funcaoInterna": {"dataType":"string","required":true},
            "curso": {"dataType":"string","required":true},
            "periodo": {"dataType":"string","required":true},
            "senha": {"dataType":"string"},
            "role": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["professora"]},{"dataType":"enum","enums":["voluntaria"]},{"dataType":"enum","enums":["adm"]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Usuario.Exclude_keyofUsuario.id-or-senha-or-role__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"nome":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"funcaoInterna":{"dataType":"string","required":true},"curso":{"dataType":"string","required":true},"periodo":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CriarUsuarioDTO": {
        "dataType": "refObject",
        "properties": {
            "nome": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "funcaoInterna": {"dataType":"string","required":true},
            "curso": {"dataType":"string","required":true},
            "periodo": {"dataType":"string","required":true},
            "role": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["professora"]},{"dataType":"enum","enums":["voluntaria"]},{"dataType":"enum","enums":["adm"]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_CriarUsuarioDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"role":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["professora"]},{"dataType":"enum","enums":["voluntaria"]},{"dataType":"enum","enums":["adm"]}]},"nome":{"dataType":"string"},"email":{"dataType":"string"},"funcaoInterna":{"dataType":"string"},"curso":{"dataType":"string"},"periodo":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AtualizarUsuarioDTO": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_CriarUsuarioDTO_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ChecklistItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "atividadeId": {"dataType":"double","required":true},
            "descricao": {"dataType":"string","required":true},
            "isCompleted": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LinksAtividade": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "atividadeId": {"dataType":"double","required":true},
            "tipo": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Material"]},{"dataType":"enum","enums":["Link Auxiliar"]}],"required":true},
            "titulo": {"dataType":"string"},
            "link": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PostInstagram": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "titulo": {"dataType":"string","required":true},
            "descricao": {"dataType":"string"},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Backlog"]},{"dataType":"enum","enums":["Produção"]},{"dataType":"enum","enums":["Pronto"]}]},
            "tipoPost": {"dataType":"string","required":true},
            "publicoAlvo": {"dataType":"string"},
            "deadline": {"dataType":"string","required":true},
            "responsavelRoteiroId": {"dataType":"double"},
            "responsavelDesignId": {"dataType":"double"},
            "checklist": {"dataType":"array","array":{"dataType":"refObject","ref":"ChecklistItem"}},
            "links": {"dataType":"array","array":{"dataType":"refObject","ref":"LinksAtividade"}},
            "semana": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ChecklistItem.Exclude_keyofChecklistItem.id-or-atividadeId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"descricao":{"dataType":"string","required":true},"isCompleted":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ChecklistItem.id-or-atividadeId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_ChecklistItem.Exclude_keyofChecklistItem.id-or-atividadeId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CriarChecklistItemDTO": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_ChecklistItem.id-or-atividadeId_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_LinksAtividade.Exclude_keyofLinksAtividade.id-or-atividadeId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"titulo":{"dataType":"string"},"tipo":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Material"]},{"dataType":"enum","enums":["Link Auxiliar"]}],"required":true},"link":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_LinksAtividade.id-or-atividadeId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_LinksAtividade.Exclude_keyofLinksAtividade.id-or-atividadeId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CriarLinksAtividadeDTO": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_LinksAtividade.id-or-atividadeId_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_PostInstagram.Exclude_keyofPostInstagram.id-or-checklist-or-links__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"titulo":{"dataType":"string","required":true},"descricao":{"dataType":"string"},"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Backlog"]},{"dataType":"enum","enums":["Produção"]},{"dataType":"enum","enums":["Pronto"]}]},"tipoPost":{"dataType":"string","required":true},"publicoAlvo":{"dataType":"string"},"deadline":{"dataType":"string","required":true},"responsavelRoteiroId":{"dataType":"double"},"responsavelDesignId":{"dataType":"double"},"semana":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CriarPostInstagramDTO": {
        "dataType": "refObject",
        "properties": {
            "titulo": {"dataType":"string","required":true},
            "descricao": {"dataType":"string"},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Backlog"]},{"dataType":"enum","enums":["Produção"]},{"dataType":"enum","enums":["Pronto"]}]},
            "tipoPost": {"dataType":"string","required":true},
            "publicoAlvo": {"dataType":"string"},
            "deadline": {"dataType":"string","required":true},
            "responsavelRoteiroId": {"dataType":"double"},
            "responsavelDesignId": {"dataType":"double"},
            "semana": {"dataType":"double"},
            "checklist": {"dataType":"array","array":{"dataType":"refAlias","ref":"CriarChecklistItemDTO"}},
            "links": {"dataType":"array","array":{"dataType":"refAlias","ref":"CriarLinksAtividadeDTO"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_CriarPostInstagramDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"checklist":{"dataType":"array","array":{"dataType":"refAlias","ref":"CriarChecklistItemDTO"}},"links":{"dataType":"array","array":{"dataType":"refAlias","ref":"CriarLinksAtividadeDTO"}},"titulo":{"dataType":"string"},"descricao":{"dataType":"string"},"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Backlog"]},{"dataType":"enum","enums":["Produção"]},{"dataType":"enum","enums":["Pronto"]}]},"tipoPost":{"dataType":"string"},"publicoAlvo":{"dataType":"string"},"deadline":{"dataType":"string"},"responsavelRoteiroId":{"dataType":"double"},"responsavelDesignId":{"dataType":"double"},"semana":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AtualizarPostInstagramDTO": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_CriarPostInstagramDTO_","validators":{}},
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
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Em Preparação"]},{"dataType":"enum","enums":["Confirmada"]},{"dataType":"enum","enums":["Concluída"]},{"dataType":"enum","enums":["Cancelada"]}]},
            "linkPlanoAula": {"dataType":"string"},
            "linkSlide": {"dataType":"string"},
            "linkRoteiro": {"dataType":"string"},
            "checklist": {"dataType":"array","array":{"dataType":"refObject","ref":"ChecklistItem"}},
            "links": {"dataType":"array","array":{"dataType":"refObject","ref":"LinksAtividade"}},
            "responsaveisId": {"dataType":"array","array":{"dataType":"double"}},
            "semana": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_PlanoAula.Exclude_keyofPlanoAula.id-or-checklist-or-links__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"titulo":{"dataType":"string","required":true},"descricao":{"dataType":"string"},"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Em Preparação"]},{"dataType":"enum","enums":["Confirmada"]},{"dataType":"enum","enums":["Concluída"]},{"dataType":"enum","enums":["Cancelada"]}]},"semana":{"dataType":"double"},"categoria":{"dataType":"string"},"dataHora":{"dataType":"string","required":true},"local":{"dataType":"string"},"linkPlanoAula":{"dataType":"string"},"linkSlide":{"dataType":"string"},"linkRoteiro":{"dataType":"string"},"responsaveisId":{"dataType":"array","array":{"dataType":"double"}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_PlanoAula.id-or-checklist-or-links_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_PlanoAula.Exclude_keyofPlanoAula.id-or-checklist-or-links__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CriarPlanoAulaDTO": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Omit_PlanoAula.id-or-checklist-or-links_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"links":{"dataType":"array","array":{"dataType":"refAlias","ref":"CriarLinksAtividadeDTO"}},"checklist":{"dataType":"array","array":{"dataType":"refAlias","ref":"CriarChecklistItemDTO"}}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_CriarPlanoAulaDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"titulo":{"dataType":"string"},"descricao":{"dataType":"string"},"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Em Preparação"]},{"dataType":"enum","enums":["Confirmada"]},{"dataType":"enum","enums":["Concluída"]},{"dataType":"enum","enums":["Cancelada"]}]},"semana":{"dataType":"double"},"categoria":{"dataType":"string"},"dataHora":{"dataType":"string"},"local":{"dataType":"string"},"linkPlanoAula":{"dataType":"string"},"linkSlide":{"dataType":"string"},"linkRoteiro":{"dataType":"string"},"responsaveisId":{"dataType":"array","array":{"dataType":"double"}},"checklist":{"dataType":"array","array":{"dataType":"refAlias","ref":"CriarChecklistItemDTO"}},"links":{"dataType":"array","array":{"dataType":"refAlias","ref":"CriarLinksAtividadeDTO"}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AtualizarPlanoAulaDTO": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_CriarPlanoAulaDTO_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AtualizarStatusAulaDTO": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Em Preparação"]},{"dataType":"enum","enums":["Confirmada"]},{"dataType":"enum","enums":["Concluída"]},{"dataType":"enum","enums":["Cancelada"]}],"required":true},
        },
        "additionalProperties": false,
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
    "EventoGeral": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"string"}]},
            "titulo": {"dataType":"string","required":true},
            "tipo": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["AULA"]},{"dataType":"enum","enums":["POST"]},{"dataType":"enum","enums":["EVENTO"]}],"required":true},
            "tipoEvento": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Acolhida"]},{"dataType":"enum","enums":["Roda de Conversa"]},{"dataType":"enum","enums":["Oficina Prática"]},{"dataType":"enum","enums":["Mostra Científica"]},{"dataType":"enum","enums":["Outros"]}],"required":true},
            "regimeEvento": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Presencial"]},{"dataType":"enum","enums":["Online"]}],"required":true},
            "data": {"dataType":"string","required":true},
            "horarioInicio": {"dataType":"string","required":true},
            "horarioFim": {"dataType":"string","required":true},
            "local": {"dataType":"string"},
            "capacidade": {"dataType":"double"},
            "descricao": {"dataType":"string"},
            "responsaveisId": {"dataType":"array","array":{"dataType":"double"}},
            "logisticsChecklist": {"dataType":"array","array":{"dataType":"refObject","ref":"ChecklistItem"}},
            "links": {"dataType":"array","array":{"dataType":"refObject","ref":"LinksAtividade"}},
            "semana": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_EventoGeral.Exclude_keyofEventoGeral.id-or-logisticsChecklist-or-links__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"titulo":{"dataType":"string","required":true},"descricao":{"dataType":"string"},"semana":{"dataType":"double"},"tipo":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["AULA"]},{"dataType":"enum","enums":["POST"]},{"dataType":"enum","enums":["EVENTO"]}],"required":true},"local":{"dataType":"string"},"responsaveisId":{"dataType":"array","array":{"dataType":"double"}},"tipoEvento":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Acolhida"]},{"dataType":"enum","enums":["Roda de Conversa"]},{"dataType":"enum","enums":["Oficina Prática"]},{"dataType":"enum","enums":["Mostra Científica"]},{"dataType":"enum","enums":["Outros"]}],"required":true},"regimeEvento":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Presencial"]},{"dataType":"enum","enums":["Online"]}],"required":true},"data":{"dataType":"string","required":true},"horarioInicio":{"dataType":"string","required":true},"horarioFim":{"dataType":"string","required":true},"capacidade":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CriarEventoGeralDTO": {
        "dataType": "refObject",
        "properties": {
            "titulo": {"dataType":"string","required":true},
            "descricao": {"dataType":"string"},
            "semana": {"dataType":"double"},
            "tipo": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["AULA"]},{"dataType":"enum","enums":["POST"]},{"dataType":"enum","enums":["EVENTO"]}],"required":true},
            "local": {"dataType":"string"},
            "responsaveisId": {"dataType":"array","array":{"dataType":"double"}},
            "tipoEvento": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Acolhida"]},{"dataType":"enum","enums":["Roda de Conversa"]},{"dataType":"enum","enums":["Oficina Prática"]},{"dataType":"enum","enums":["Mostra Científica"]},{"dataType":"enum","enums":["Outros"]}],"required":true},
            "regimeEvento": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Presencial"]},{"dataType":"enum","enums":["Online"]}],"required":true},
            "data": {"dataType":"string","required":true},
            "horarioInicio": {"dataType":"string","required":true},
            "horarioFim": {"dataType":"string","required":true},
            "capacidade": {"dataType":"double"},
            "logisticsChecklist": {"dataType":"array","array":{"dataType":"refAlias","ref":"CriarChecklistItemDTO"}},
            "links": {"dataType":"array","array":{"dataType":"refAlias","ref":"CriarLinksAtividadeDTO"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_CriarEventoGeralDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"logisticsChecklist":{"dataType":"array","array":{"dataType":"refAlias","ref":"CriarChecklistItemDTO"}},"links":{"dataType":"array","array":{"dataType":"refAlias","ref":"CriarLinksAtividadeDTO"}},"titulo":{"dataType":"string"},"descricao":{"dataType":"string"},"semana":{"dataType":"double"},"tipo":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["AULA"]},{"dataType":"enum","enums":["POST"]},{"dataType":"enum","enums":["EVENTO"]}]},"local":{"dataType":"string"},"responsaveisId":{"dataType":"array","array":{"dataType":"double"}},"tipoEvento":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Acolhida"]},{"dataType":"enum","enums":["Roda de Conversa"]},{"dataType":"enum","enums":["Oficina Prática"]},{"dataType":"enum","enums":["Mostra Científica"]},{"dataType":"enum","enums":["Outros"]}]},"regimeEvento":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Presencial"]},{"dataType":"enum","enums":["Online"]}]},"data":{"dataType":"string"},"horarioInicio":{"dataType":"string"},"horarioFim":{"dataType":"string"},"capacidade":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AtualizarEventoGeralDTO": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_CriarEventoGeralDTO_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AtualizarConfiguracaoDTO": {
        "dataType": "refObject",
        "properties": {
            "dataInicioProjeto": {"dataType":"string"},
            "dataFimProjeto": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CriarChecklistItemRequest": {
        "dataType": "refObject",
        "properties": {
            "atividadeId": {"dataType":"double","required":true},
            "tipoAtividade": {"dataType":"string","required":true},
            "descricao": {"dataType":"string","required":true},
            "isCompleted": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Usuario.Exclude_keyofUsuario.senha__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true},"role":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["professora"]},{"dataType":"enum","enums":["voluntaria"]},{"dataType":"enum","enums":["adm"]}],"required":true},"nome":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"funcaoInterna":{"dataType":"string","required":true},"curso":{"dataType":"string","required":true},"periodo":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_Usuario.senha_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Usuario.Exclude_keyofUsuario.senha__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginResponseDTO": {
        "dataType": "refObject",
        "properties": {
            "usuario": {"ref":"Omit_Usuario.senha_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginRequestDTO": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "token": {"dataType":"string","required":true},
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


    
        const argsUsuarioController_getUsuarios: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.getUsuarios)),

            async function UsuarioController_getUsuarios(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_getUsuarios, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'getUsuarios',
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
        const argsUsuarioController_getUsuarioById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/usuarios/:id',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.getUsuarioById)),

            async function UsuarioController_getUsuarioById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_getUsuarioById, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'getUsuarioById',
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
        const argsUsuarioController_criarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CriarUsuarioDTO"},
        };
        app.post('/api/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.criarUsuario)),

            async function UsuarioController_criarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_criarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'criarUsuario',
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
        const argsUsuarioController_atualizarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AtualizarUsuarioDTO"},
        };
        app.put('/api/usuarios/:id',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.atualizarUsuario)),

            async function UsuarioController_atualizarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'atualizarUsuario',
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
        const argsUsuarioController_deletarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/api/usuarios/:id',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.deletarUsuario)),

            async function UsuarioController_deletarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_deletarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'deletarUsuario',
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
        const argsUsuarioController_getUsuarioToken: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/usuarios/:id/token',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.getUsuarioToken)),

            async function UsuarioController_getUsuarioToken(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_getUsuarioToken, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'getUsuarioToken',
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
        const argsPostInstagramController_getPosts: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/posts',
            ...(fetchMiddlewares<RequestHandler>(PostInstagramController)),
            ...(fetchMiddlewares<RequestHandler>(PostInstagramController.prototype.getPosts)),

            async function PostInstagramController_getPosts(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostInstagramController_getPosts, request, response });

                const controller = new PostInstagramController();

              await templateService.apiHandler({
                methodName: 'getPosts',
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
        const argsPostInstagramController_getPostById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/posts/:id',
            ...(fetchMiddlewares<RequestHandler>(PostInstagramController)),
            ...(fetchMiddlewares<RequestHandler>(PostInstagramController.prototype.getPostById)),

            async function PostInstagramController_getPostById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostInstagramController_getPostById, request, response });

                const controller = new PostInstagramController();

              await templateService.apiHandler({
                methodName: 'getPostById',
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
        const argsPostInstagramController_criarPost: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CriarPostInstagramDTO"},
        };
        app.post('/api/posts',
            ...(fetchMiddlewares<RequestHandler>(PostInstagramController)),
            ...(fetchMiddlewares<RequestHandler>(PostInstagramController.prototype.criarPost)),

            async function PostInstagramController_criarPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostInstagramController_criarPost, request, response });

                const controller = new PostInstagramController();

              await templateService.apiHandler({
                methodName: 'criarPost',
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
        const argsPostInstagramController_atualizarPost: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AtualizarPostInstagramDTO"},
        };
        app.put('/api/posts/:id',
            ...(fetchMiddlewares<RequestHandler>(PostInstagramController)),
            ...(fetchMiddlewares<RequestHandler>(PostInstagramController.prototype.atualizarPost)),

            async function PostInstagramController_atualizarPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostInstagramController_atualizarPost, request, response });

                const controller = new PostInstagramController();

              await templateService.apiHandler({
                methodName: 'atualizarPost',
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
        const argsPostInstagramController_deletarPost: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/api/posts/:id',
            ...(fetchMiddlewares<RequestHandler>(PostInstagramController)),
            ...(fetchMiddlewares<RequestHandler>(PostInstagramController.prototype.deletarPost)),

            async function PostInstagramController_deletarPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostInstagramController_deletarPost, request, response });

                const controller = new PostInstagramController();

              await templateService.apiHandler({
                methodName: 'deletarPost',
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
        const argsPlanoAulaController_atualizarStatusAula: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AtualizarStatusAulaDTO"},
        };
        app.patch('/api/aulas/:id/status',
            ...(fetchMiddlewares<RequestHandler>(PlanoAulaController)),
            ...(fetchMiddlewares<RequestHandler>(PlanoAulaController.prototype.atualizarStatusAula)),

            async function PlanoAulaController_atualizarStatusAula(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPlanoAulaController_atualizarStatusAula, request, response });

                const controller = new PlanoAulaController();

              await templateService.apiHandler({
                methodName: 'atualizarStatusAula',
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
        const argsEventoGeralController_getEventos: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/eventos',
            ...(fetchMiddlewares<RequestHandler>(EventoGeralController)),
            ...(fetchMiddlewares<RequestHandler>(EventoGeralController.prototype.getEventos)),

            async function EventoGeralController_getEventos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventoGeralController_getEventos, request, response });

                const controller = new EventoGeralController();

              await templateService.apiHandler({
                methodName: 'getEventos',
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
        const argsEventoGeralController_getEventoById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/eventos/:id',
            ...(fetchMiddlewares<RequestHandler>(EventoGeralController)),
            ...(fetchMiddlewares<RequestHandler>(EventoGeralController.prototype.getEventoById)),

            async function EventoGeralController_getEventoById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventoGeralController_getEventoById, request, response });

                const controller = new EventoGeralController();

              await templateService.apiHandler({
                methodName: 'getEventoById',
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
        const argsEventoGeralController_criarEvento: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CriarEventoGeralDTO"},
        };
        app.post('/api/eventos',
            ...(fetchMiddlewares<RequestHandler>(EventoGeralController)),
            ...(fetchMiddlewares<RequestHandler>(EventoGeralController.prototype.criarEvento)),

            async function EventoGeralController_criarEvento(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventoGeralController_criarEvento, request, response });

                const controller = new EventoGeralController();

              await templateService.apiHandler({
                methodName: 'criarEvento',
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
        const argsEventoGeralController_atualizarEvento: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AtualizarEventoGeralDTO"},
        };
        app.put('/api/eventos/:id',
            ...(fetchMiddlewares<RequestHandler>(EventoGeralController)),
            ...(fetchMiddlewares<RequestHandler>(EventoGeralController.prototype.atualizarEvento)),

            async function EventoGeralController_atualizarEvento(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventoGeralController_atualizarEvento, request, response });

                const controller = new EventoGeralController();

              await templateService.apiHandler({
                methodName: 'atualizarEvento',
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
        const argsEventoGeralController_deletarEvento: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/api/eventos/:id',
            ...(fetchMiddlewares<RequestHandler>(EventoGeralController)),
            ...(fetchMiddlewares<RequestHandler>(EventoGeralController.prototype.deletarEvento)),

            async function EventoGeralController_deletarEvento(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventoGeralController_deletarEvento, request, response });

                const controller = new EventoGeralController();

              await templateService.apiHandler({
                methodName: 'deletarEvento',
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
        const argsConfiguracaoController_getDatasProjeto: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/configuracoes/projeto/datas',
            ...(fetchMiddlewares<RequestHandler>(ConfiguracaoController)),
            ...(fetchMiddlewares<RequestHandler>(ConfiguracaoController.prototype.getDatasProjeto)),

            async function ConfiguracaoController_getDatasProjeto(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsConfiguracaoController_getDatasProjeto, request, response });

                const controller = new ConfiguracaoController();

              await templateService.apiHandler({
                methodName: 'getDatasProjeto',
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
        const argsConfiguracaoController_atualizarDatasProjeto: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AtualizarConfiguracaoDTO"},
        };
        app.put('/api/configuracoes/projeto/datas',
            ...(fetchMiddlewares<RequestHandler>(ConfiguracaoController)),
            ...(fetchMiddlewares<RequestHandler>(ConfiguracaoController.prototype.atualizarDatasProjeto)),

            async function ConfiguracaoController_atualizarDatasProjeto(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsConfiguracaoController_atualizarDatasProjeto, request, response });

                const controller = new ConfiguracaoController();

              await templateService.apiHandler({
                methodName: 'atualizarDatasProjeto',
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
        const argsChecklistController_criarChecklistItem: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CriarChecklistItemRequest"},
        };
        app.post('/api/checklists',
            ...(fetchMiddlewares<RequestHandler>(ChecklistController)),
            ...(fetchMiddlewares<RequestHandler>(ChecklistController.prototype.criarChecklistItem)),

            async function ChecklistController_criarChecklistItem(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChecklistController_criarChecklistItem, request, response });

                const controller = new ChecklistController();

              await templateService.apiHandler({
                methodName: 'criarChecklistItem',
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
        const argsChecklistController_getChecklistItem: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/checklists/:id',
            ...(fetchMiddlewares<RequestHandler>(ChecklistController)),
            ...(fetchMiddlewares<RequestHandler>(ChecklistController.prototype.getChecklistItem)),

            async function ChecklistController_getChecklistItem(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChecklistController_getChecklistItem, request, response });

                const controller = new ChecklistController();

              await templateService.apiHandler({
                methodName: 'getChecklistItem',
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
        const argsChecklistController_getChecklistPorAtividade: Record<string, TsoaRoute.ParameterSchema> = {
                atividadeId: {"in":"path","name":"atividadeId","required":true,"dataType":"double"},
                tipoAtividade: {"in":"query","name":"tipoAtividade","required":true,"dataType":"string"},
        };
        app.get('/api/checklists/atividade/:atividadeId',
            ...(fetchMiddlewares<RequestHandler>(ChecklistController)),
            ...(fetchMiddlewares<RequestHandler>(ChecklistController.prototype.getChecklistPorAtividade)),

            async function ChecklistController_getChecklistPorAtividade(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChecklistController_getChecklistPorAtividade, request, response });

                const controller = new ChecklistController();

              await templateService.apiHandler({
                methodName: 'getChecklistPorAtividade',
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
        const argsChecklistController_toggleChecklistItem: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.patch('/api/checklists/:id/toggle',
            ...(fetchMiddlewares<RequestHandler>(ChecklistController)),
            ...(fetchMiddlewares<RequestHandler>(ChecklistController.prototype.toggleChecklistItem)),

            async function ChecklistController_toggleChecklistItem(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChecklistController_toggleChecklistItem, request, response });

                const controller = new ChecklistController();

              await templateService.apiHandler({
                methodName: 'toggleChecklistItem',
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
        const argsChecklistController_atualizarDescricao: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"descricao":{"dataType":"string","required":true}}},
        };
        app.put('/api/checklists/:id',
            ...(fetchMiddlewares<RequestHandler>(ChecklistController)),
            ...(fetchMiddlewares<RequestHandler>(ChecklistController.prototype.atualizarDescricao)),

            async function ChecklistController_atualizarDescricao(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChecklistController_atualizarDescricao, request, response });

                const controller = new ChecklistController();

              await templateService.apiHandler({
                methodName: 'atualizarDescricao',
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
        const argsChecklistController_deletarChecklistItem: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/api/checklists/:id',
            ...(fetchMiddlewares<RequestHandler>(ChecklistController)),
            ...(fetchMiddlewares<RequestHandler>(ChecklistController.prototype.deletarChecklistItem)),

            async function ChecklistController_deletarChecklistItem(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChecklistController_deletarChecklistItem, request, response });

                const controller = new ChecklistController();

              await templateService.apiHandler({
                methodName: 'deletarChecklistItem',
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
        const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"LoginRequestDTO"},
        };
        app.post('/api/auth/login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

            async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'login',
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
