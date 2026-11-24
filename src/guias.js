// Guias: artigos curtos que respondem buscas comuns de quem tem restaurante. Cada um vira /guias/<slug>/.
// Só descrevem o que o DineDrop faz hoje e o que vale para qualquer restaurante. Nada de número inventado.
export const GUIAS = [
  {
    slug: 'delivery-proprio-sem-ifood',
    curto: 'Delivery próprio sem aplicativo',
    titulo: 'Como ter delivery próprio sem depender de aplicativo de entrega',
    descricao: 'Passo a passo para montar o delivery próprio do seu restaurante: cardápio online, taxa por bairro, pagamento por Pix e controle da entrega.',
    intro: 'Aplicativo de entrega traz pedido, mas também cobra comissão e fica com o contato do seu cliente. Ter um canal próprio não precisa substituir tudo: ele funciona ao lado do aplicativo e ensina o cliente a pedir direto com você.',
    secoes: [
      { h: '1. Tenha um cardápio online que o cliente abre sem baixar nada', p: ['O ponto de partida é um link. O cliente abre o cardápio no navegador do celular, vê foto e preço de cada prato e monta o pedido item por item. Sem aplicativo para instalar, sem cadastro longo.', 'No DineDrop, o cliente informa só nome e WhatsApp para fazer o pedido.'] },
      { h: '2. Defina taxa de entrega e pedido mínimo', p: ['Entrega própria só compensa se a conta fechar. Cobre por bairro, com um valor padrão para os demais, e fixe um pedido mínimo para não rodar com pedido muito pequeno.', 'O DineDrop permite taxa por bairro e pedido mínimo, além de retirada no balcão com horário estimado.'] },
      { h: '3. Receba o pagamento direto', p: ['Pix na chave do restaurante cai direto na sua conta. Se preferir cartão online, o Mercado Pago recebe na sua conta, descontada a tarifa do próprio Mercado Pago.'] },
      { h: '4. Controle o pedido até a porta do cliente', p: ['Pedido novo precisa chegar organizado e com som, para ninguém perder. Depois, o status acompanha o preparo, a saída e a entrega. Entregadores e veículos podem ser cadastrados, e a entrega pode ter rota.'] },
      { h: '5. Leve o cliente do aplicativo para o seu canal', p: ['Coloque o QR Code do cardápio na sacola, no cartão que acompanha o pedido e nas redes sociais. Cupom de desconto no primeiro pedido pelo canal próprio ajuda o cliente a mudar o hábito.'] },
    ],
    ficha: ['Cardápio com foto, categorias e destaques', 'Taxa por bairro e pedido mínimo', 'Pix e Mercado Pago', 'Status do pedido até a entrega', 'Cupons de desconto'],
  },
  {
    slug: 'cardapio-digital-com-qr-code',
    curto: 'Cardápio digital com QR Code',
    titulo: 'Como criar um cardápio digital com QR Code para o seu restaurante',
    descricao: 'Veja como montar um cardápio digital com QR Code por mesa: fotos, categorias, importação do cardápio atual e como imprimir os QR Codes.',
    intro: 'O cardápio digital resolve três problemas de uma vez: o preço desatualizado, a fila para pedir e o cardápio de papel gasto. Com QR Code na mesa, o cliente abre o cardápio no próprio celular.',
    secoes: [
      { h: '1. Reúna o que você já tem', p: ['Você não precisa digitar tudo do zero. No DineDrop, o cardápio pode vir de uma foto ou de uma planilha, e o sistema sugere descrição e categoria. Nada muda sem a sua escolha.'] },
      { h: '2. Capriche na foto', p: ['Prato com foto vende mais do que lista de nomes. Fotografe com luz natural, de perto e sem bagunça ao redor. O cardápio mostra foto grande de cada produto, e o plano Cozinheiro permite vídeo do prato.'] },
      { h: '3. Organize por categorias e destaques', p: ['Agrupe o que o cliente procura junto (bebidas, massas, sobremesas) e coloque os campeões de venda em destaque, no topo.'] },
      { h: '4. Gere um QR Code por mesa', p: ['Um QR para o cardápio geral e um para cada mesa, em PDF pronto para imprimir. O pedido chega com o número da mesa, e a equipe não precisa perguntar de onde veio.'] },
      { h: '5. Mantenha atualizado em um toque', p: ['Mudou o preço ou acabou o prato? Altere no painel e o cardápio muda na hora para quem abrir. O QR Code continua o mesmo, sem reimprimir nada.'] },
    ],
    ficha: ['Importação por foto ou planilha', 'Foto de cada produto', 'QR Code por mesa em PDF', 'Atualização imediata'],
  },
  {
    slug: 'pedidos-do-whatsapp-organizados',
    curto: 'Pedidos do WhatsApp organizados',
    titulo: 'Como parar de perder pedidos no WhatsApp do restaurante',
    descricao: 'Áudio, print e item esquecido: veja como tirar o pedido do WhatsApp e receber tudo organizado num painel, com status e histórico.',
    intro: 'O WhatsApp é ótimo para conversar, mas ruim para anotar pedido. Quando o movimento aumenta, o áudio se perde, o item é esquecido e ninguém sabe o que já saiu da cozinha.',
    secoes: [
      { h: 'Onde o pedido se perde', p: ['Mensagens misturadas, áudio que ninguém ouve até o fim, endereço dito de passagem e comanda de papel que some entre a mesa e a cozinha. O erro costuma aparecer só quando o prato errado chega ao cliente.'] },
      { h: 'Deixe o cliente montar o pedido sozinho', p: ['Em vez de descrever o que quer, o cliente escolhe item por item no cardápio, com foto e preço, e escolhe como receber: mesa, delivery ou retirada. O pedido chega escrito e organizado no painel.'] },
      { h: 'Use o WhatsApp só para o que ele faz bem', p: ['Divulgue o link do cardápio no WhatsApp, no status e na bio do Instagram. A conversa continua, mas o pedido passa a ter um lugar certo para existir.'] },
      { h: 'Acompanhe tudo num painel só', p: ['Mesa, delivery e retirada aparecem na mesma tela, com status até a entrega. Pedido novo toca um som, e a cozinha pode acompanhar num quadro na TV ou no tablet (KDS, no plano Cozinheiro).'] },
    ],
    ficha: ['Pedido item por item, sem áudio', 'Mesa, delivery e retirada num painel', 'Som de pedido novo', 'Cozinha (KDS) no plano Cozinheiro'],
  },
];
