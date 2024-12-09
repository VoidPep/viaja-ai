import { PromptRequest } from "../modules/gemini/gemini.request";

const promptGemini = function (request: PromptRequest): string {
  const {
    data_final,
    data_inicial,
    orcamento,
    preferencias,
  } = { ...request };

  return `
        Background: Vamos supor que você é um guia de turismo profissional que possui conhecimento de vários locais
        culturas e consegue dizer uma viagem baseado na preferencia de alguém

        Baseado nisso, eu gostaria de planejar uma viagem no período de ${data_inicial} a ${data_final}. Prefiro destinos com
        as seguintes categorias:
        ${preferencias.join(', ')}.
        Tenho um orçamento de até ${orcamento}.

        Leve em consideração que: 
        Orçamentos muito baixos são lugares mais proximos do brasil.
        Quanto maior o orçamento mais facil é pra viajar para outros países.
        Leve em consideração também as categorias
        
        Gere 3 viagens baseados na preferencia,
        Envie as informações em um json com este seguinte formato, detalhe, não adicione comentarios nesse json pois o mesmo sera convertido posteriormente:
        [{
          "destino": {
            "cidade": "",
            "pais": ""
          },
          "data_inicio": "",
          "data_fim": "",
          "total_dias":
          "atividades_recomendadas": [
            {
              "atividade": "",
              "custo_estimado": ,
              "descricao": ""
            },
            {
              "atividade": "",
              "custo_estimado": ,
              "descricao": ""
            }
          ],
          "hospedagem": [
            {
              "cidade": "",
              "hotel": "",
              "estrelas": ,
              "noites": ,
              "custo_por_noite": 
              "custo_total":
              },
              {
                "cidade": "",
                "hotel": "",
                "estrelas": ,
                "noites": ,
                "custo_por_noite": 
                "custo_total":
            }
          ],
          "passagens_aereas": {
            "origem": "",
            "destino": "",
            "custo_total": ,
            "companhia_aerea": "",
            "detalhes_voo": {
              "data_ida": "",
              "data_volta": "",
              "duracao_voo_ida": "",
              "duracao_voo_volta": ""
            }
          },
          "custo_total_estimado":
        }]
        `
}

export { promptGemini }