import {PromptRequest} from "../gemini/gemini.request";

const promptGemini = function (request: PromptRequest): string {
    const {
        destinos_preferidos,
        mes_viagem,
        atividades,
        preferencias_acomodacao,
        orcamento,
    } = {...request};

    return `
        Eu gostaria de planejar uma viagem para ${destinos_preferidos} no período de ${mes_viagem}. Prefiro destinos com
        ${atividades}, ${preferencias_acomodacao}.
        Tenho um orçamento de até ${orcamento}.
        Realize a busca utilizando APIs externas de viagens (Google Travel, Skyscanner, etc.) para encontrar pacotes ou
        passagens e hospedagens que correspondam ao orçamento.

        Envie as informações em um json com este seguinte formato:
        {
          "destino": {
            "países_sugeridos": ["", ""],
            "cidades_sugeridas": ["", ""]
          },
          "detalhes_viagem": {
            "data_inicio": "",
            "data_fim": "",
            "total_dias":
          },
          "atividades_recomendadas": [
            {
              "cidade": "",
              "atividade": "",
              "custo_estimado": ,
              "descrição": ""
            },
            {
              "cidade": "",
              "atividade": "",
              "custo_estimado": ,
              "descrição": ""
            }
          ],
          "hospedagem": [
            {
              "cidade": "",
              "hotel": "",
              "estrelas": ,
              "noites": ,
              "custo_total":
            },
            {
              "cidade": "",
              "hotel": "",
              "estrelas": ,
              "noites": ,
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
        }
        `
}

export {promptGemini}