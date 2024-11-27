<script setup>
    import Header from '@/components/Header.vue'; 
    import Footer from '@/components/Footer.vue';
</script>

<template>
    <Header/>
    <div class="terms-container">
      <div class="content">
        <h1>Termos de Uso</h1>
  
        <p>Bem-vindo ao Viaja-AI! Estes Termos de Uso regem o acesso e o uso da nossa plataforma, incluindo o site e aplicativos relacionados. Ao utilizar o Viaja-AI, você concorda com os termos estabelecidos abaixo. Caso não concorde, pedimos que não utilize nossos serviços.</p>
  
        <h2>1. Sobre o Viaja-AI</h2>
        <p>O Viaja-AI é uma plataforma inteligente que auxilia no planejamento de viagens personalizadas, oferecendo sugestões de estadias, transporte e passeios com base nas preferências dos usuários.</p>
  
        <h2>2. Uso do Sistema</h2>
        <ul>
          <li>O sistema é disponibilizado exclusivamente para fins pessoais e não comerciais.</li>
          <li>O usuário é responsável por fornecer informações precisas para o funcionamento adequado do sistema, como preferências de viagem, datas e locais.</li>
          <li>Não é permitido realizar engenharia reversa, copiar ou reproduzir qualquer parte do sistema sem permissão expressa.</li>
        </ul>
  
        <h2>3. Cadastro e Segurança</h2>
        <ul>
          <li>O usuário deve criar uma conta fornecendo informações válidas e atualizadas.</li>
          <li>É de responsabilidade do usuário manter suas credenciais de acesso seguras e confidenciais.</li>
          <li>O Viaja-AI não se responsabiliza por acessos não autorizados decorrentes de negligência do usuário.</li>
        </ul>
  
        <h2>4. Privacidade e Uso de Dados</h2>
        <p>Respeitamos sua privacidade. Os dados fornecidos serão utilizados exclusivamente para:</p>
        <ul>
          <li>Personalizar as sugestões de viagem.</li>
          <li>Aprimorar o funcionamento do sistema por meio de análises e melhorias contínuas.</li>
          <li>Entrar em contato com o usuário quando necessário.</li>
        </ul>
        <p>Para mais informações, consulte nossa <a href="#">Política de Privacidade</a>.</p>
  
        <h2>5. Limitações de Responsabilidade</h2>
        <ul>
          <li>O Viaja-AI atua como um serviço de recomendação e não é responsável por reservas, preços ou mudanças de disponibilidade nos serviços sugeridos.</li>
          <li>Não garantimos que as sugestões fornecidas sejam perfeitas ou livres de erros.</li>
          <li>O usuário deve confirmar todas as informações com os provedores de serviços externos antes de tomar decisões.</li>
        </ul>
  
        <h2>6. Planos e Pagamentos</h2>
        <ul>
          <li>O Viaja-AI oferece planos pagos com funcionalidades adicionais, como acesso premium a ferramentas e suporte dedicado.</li>
          <li>Os pagamentos são processados por terceiros, e o Viaja-AI não armazena dados financeiros dos usuários.</li>
          <li>Os planos possuem cobrança recorrente, e o usuário pode cancelar a assinatura a qualquer momento.</li>
        </ul>
  
        <h2>7. Cancelamento e Reembolso</h2>
        <ul>
          <li>O usuário pode cancelar sua assinatura a qualquer momento diretamente pelo painel do Viaja-AI.</li>
          <li>Reembolsos são concedidos apenas em casos específicos, conforme avaliação da equipe de suporte.</li>
        </ul>
  
        <h2>8. Alterações nos Termos</h2>
        <p>O Viaja-AI se reserva o direito de modificar estes Termos de Uso a qualquer momento. Notificaremos os usuários sobre mudanças significativas através do site ou por e-mail.</p>
  
        <h2>9. Contato</h2>
        <p>Para dúvidas ou suporte, entre em contato pelo e-mail <a href="mailto:suporte@viajaai.com">suporte@viajaai.com</a>.</p>
  
        <p>Última atualização: Novembro de 2024</p>
      </div>
    </div>
    <Footer/>
  </template>
  
  <style scoped>
  .terms-container {
    background: #f4f4f4; /* Fundo levemente escurecido */
    color: #333;
    padding: 2rem;
    margin: 0 auto;
    min-height: 100%;
  }
  
  .content {
    max-width: 900px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #007bff;
  }
  
  h2 {
    font-size: 1.5rem;
    margin: 1.5rem 0 1rem;
    color: #555;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  ul {
    margin: 1rem 0 1rem 1.5rem;
    list-style: disc;
  }
  
  ul li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>