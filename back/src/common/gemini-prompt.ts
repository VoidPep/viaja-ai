import { PromptRequest } from "../modules/gemini/gemini.request";

const promptGemini = function (request: PromptRequest): string {
  const {
    data_final,
    data_inicial,
    orcamento,
    preferencias,
  } = { ...request };

  return `
        Eu gostaria de planejar uma viagem no período de ${data_inicial} a ${data_final}. Prefiro destinos com
        as seguintes categorias:
        ${preferencias.join(', ')}.
        Tenho um orçamento de até ${orcamento}.

        Imagine que você é uma ferramenta que faz buscas de viagens e busque pacotes, hospedagens, passagens que correspondam as 
        categorias de preferencia e ao orçamento. 
        Leve em consideração que: 
        Orçamentos muito baixos são lugares mais proximos do brasil.
        Quanto maior o orçamento mais facil é pra viajar para outros países.
        Leve em consideração também as categorias
        
        Envie as informações em um json com este seguinte formato, detalhe não adicione comentarios nesse json pois sera convertido:
        {
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
        }
        `
}

export { promptGemini }