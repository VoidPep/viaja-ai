<template>
    
    <Card>
      <template #title>
        Roteiro de Viagem - {{ roteiro.destino.cidade }}, {{ roteiro.destino.pais }}
      </template>
      <template #subtitle>
        {{ roteiro.data_inicio }} a {{ roteiro.data_fim }} ({{ roteiro.total_dias }} dias)
      </template>
  
      <p>Custo total estimado: <strong>{{ formatCurrency(roteiro.custo_total_estimado) }}</strong></p>
  
      <h3>Atividades Recomendadas</h3>
      <ul>
        <li v-for="(atividade, index) in roteiro.atividades_recomendadas" :key="index">
          <strong>{{ atividade.atividade }}</strong> - 
          {{ formatCurrency(atividade.custo_estimado) }}<br />
          <em>{{ atividade.descrição }}</em>
        </li>
      </ul>
  
      <h3>Hospedagem</h3>
      <ul>
        <li v-for="(hotel, index) in roteiro.hospedagem" :key="index">
          <strong>{{ hotel.hotel }}</strong> ({{ hotel.estrelas }} estrelas)<br />
          Cidade: {{ hotel.cidade }} - Noites: {{ hotel.noites }}<br />
          Custo por noite: {{ formatCurrency(hotel.custo_por_noite) }}<br />
          Custo total: {{ formatCurrency(hotel.custo_total) }}
        </li>
      </ul>
  
      <h3>Passagens Aéreas</h3>
      <p>
        <strong>{{ roteiro.passagens_aereas.origem }}</strong> para 
        <strong>{{ roteiro.passagens_aereas.destino }}</strong> - 
        Companhia: {{ roteiro.passagens_aereas.companhia_aerea }}<br />
        Ida: {{ roteiro.passagens_aereas.detalhes_voo.data_ida }} 
        ({{ roteiro.passagens_aereas.detalhes_voo.duracao_voo_ida }})<br />
        Volta: {{ roteiro.passagens_aereas.detalhes_voo.data_volta }} 
        ({{ roteiro.passagens_aereas.detalhes_voo.duracao_voo_volta }})<br />
        Custo total: {{ formatCurrency(roteiro.passagens_aereas.custo_total) }}
      </p>
    </Card>
  </template>
  
  <script setup>
  import { Card } from 'primevue/card';
  
  const props = defineProps({
    roteiro: {
      type: Object,
      required: true,
    },
  });
  
  const formatCurrency = (value) => {
    if (typeof value !== 'number') return 'N/A';
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  </script>
  
  <style scoped>
  h3 {
    margin-top: 1rem;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 0.5rem;
  }
  </style>
  