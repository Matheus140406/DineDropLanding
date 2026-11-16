// Nichos atendidos: cada um vira uma página em /nichos/<slug>/ (scripts/gerar-nichos.mjs)
// e uma linha na seção "Nichos" da página inicial (o campo "ajuda").
// negocio: como o texto se refere ao negócio ("O que trava a pizzaria").
// Só recursos que o DineDrop já tem: nada de prometer o que está "no forno".

export const GRUPOS = [
  { id: 'pequenos', titulo: 'Negócios pequenos', subtitulo: 'Comece sem complicar', texto: 'Para quem está começando ou toca o negócio sozinho. Plano Cliente.' },
  { id: 'grandes', titulo: 'Operações grandes', subtitulo: 'Salão cheio, equipe e entregadores', texto: 'Para muitas mesas, equipe com funções diferentes e delivery em volume. Plano Garçom.' },
];

export const NICHOS = [
  {
    slug: 'food-truck', grupo: 'pequenos', nome: 'Food trucks e carrinhos', curto: 'Food trucks', negocio: 'o food truck',
    ajuda: 'A fila anda: o cliente pede pelo celular e você só prepara.',
    titulo: 'Cardápio digital para food truck e carrinho de lanche',
    descricao: 'Cardápio digital com QR Code para food truck e carrinho: o cliente pede pelo celular na fila, você recebe no painel e inativa o que acabou. 2 semanas grátis.',
    intro: 'No food truck, o tempo de fila decide quantas vendas cabem no evento. Com o DineDrop, o cliente pede pelo celular enquanto espera e você recebe tudo organizado.',
    dores: [
      ['Fila que desanima quem chega', 'O cliente escaneia o QR, monta o pedido enquanto espera e ele chega no painel na ordem certa.'],
      ['O ponto muda, o cardápio de papel não acompanha', 'Um link e um QR só: o mesmo cardápio vai para qualquer evento, e o preço muda na hora.'],
      ['Acabou o ingrediente no meio do evento', 'Inative o item com um toque e ele sai do cardápio na hora. Voltou, ative de novo.'],
    ],
    plano: 'Cliente',
  },
  {
    slug: 'marmitaria', grupo: 'pequenos', nome: 'Marmitarias', curto: 'Marmitarias', negocio: 'a marmitaria',
    ajuda: 'Pedido de delivery completo, com taxa por bairro já calculada.',
    titulo: 'Cardápio digital e delivery próprio para marmitaria',
    descricao: 'Cardápio digital para marmitaria: pedido pelo seu link, taxa de entrega por bairro, pedido mínimo e cardápio do dia atualizado em segundos. 2 semanas grátis.',
    intro: 'Marmitaria vive de volume e de rotina. O DineDrop tira o pedido do vai e vem do WhatsApp e deixa a entrega calculada do jeito que você definiu.',
    dores: [
      ['Pedido de marmita pelo WhatsApp, um por um', 'O cliente monta o pedido no seu link e ele chega completo no painel, com o endereço.'],
      ['Taxa de entrega calculada no chute', 'Taxa por bairro e pedido mínimo configurados uma vez e aplicados em todo pedido.'],
      ['O cardápio do dia muda todo dia', 'Ative e inative os pratos do dia em segundos, sem mandar foto nova no grupo.'],
    ],
    plano: 'Cliente',
  },
  {
    slug: 'doceria', grupo: 'pequenos', nome: 'Docerias e confeitarias', curto: 'Docerias', negocio: 'a doceria',
    ajuda: 'Vitrine bonita no celular, com as cores e o logo da doceria.',
    titulo: 'Cardápio digital para doceria e confeitaria',
    descricao: 'Cardápio digital para doceria e confeitaria com foto, preço e a sua marca. Pedidos organizados no painel e doce esgotado fora do cardápio. 2 semanas grátis.',
    intro: 'Doce se vende pelos olhos. O DineDrop coloca seus produtos num cardápio com a cara da sua marca e organiza os pedidos que chegam.',
    dores: [
      ['Fotos e preços espalhados pelo Instagram', 'Um cardápio com foto, descrição e preço, nas cores e com o logo da sua doceria.'],
      ['Pedido que se perde na conversa', 'Cada pedido fica registrado no painel, com os itens, o valor e o status.'],
      ['Doce que acabou continua sendo pedido', 'Inative o que esgotou com um toque e ative quando a próxima fornada sair.'],
    ],
    plano: 'Cliente',
  },
  {
    slug: 'cafeteria', grupo: 'pequenos', nome: 'Cafeterias', curto: 'Cafeterias', negocio: 'a cafeteria',
    ajuda: 'Pedido pelo celular e retirada no balcão, sem fila.',
    titulo: 'Cardápio digital com QR Code para cafeteria',
    descricao: 'Cardápio digital para cafeteria: QR Code na mesa, retirada no balcão com horário estimado e relatório do horário de pico. 2 semanas grátis.',
    intro: 'Na cafeteria, o pico é curto e intenso. O DineDrop deixa o cliente pedir pelo celular, na mesa ou para retirar, e libera o balcão.',
    dores: [
      ['Fila no balcão no horário de pico', 'O cliente pede pelo celular e retira no balcão no horário estimado.'],
      ['Mesa ocupada esperando atendimento', 'Com o QR na mesa, o cliente pede sem levantar, e o pedido chega com o número da mesa.'],
      ['Não saber que horas a casa lota', 'O relatório mostra o horário de pico e os itens mais vendidos.'],
    ],
    plano: 'Cliente (relatórios a partir do Garçom)',
  },
  {
    slug: 'acai', grupo: 'pequenos', nome: 'Açaiterias', curto: 'Açaiterias', negocio: 'a açaiteria',
    ajuda: 'Retirada sem fila e delivery pelo seu link, com taxa por bairro.',
    titulo: 'Cardápio digital e delivery para açaiteria',
    descricao: 'Cardápio digital para açaiteria: pedido pelo celular, retirada no balcão sem fila e delivery próprio com taxa por bairro. 2 semanas grátis.',
    intro: 'Açaí vende muito à tarde e à noite, no balcão e no delivery. O DineDrop junta os dois no mesmo painel.',
    dores: [
      ['Fila no balcão na hora do calor', 'O cliente pede pelo celular e retira no horário estimado.'],
      ['Pedido anotado errado', 'O cliente escolhe item por item no cardápio, e o pedido chega escrito no painel.'],
      ['Delivery que depende do app de entrega', 'Delivery pelo seu link, com taxa por bairro e mensalidade fixa.'],
    ],
    plano: 'Cliente',
  },
  {
    slug: 'lanchonete', grupo: 'pequenos', nome: 'Lanchonetes', curto: 'Lanchonetes', negocio: 'a lanchonete',
    ajuda: 'Balcão, mesa e delivery chegando no mesmo painel.',
    titulo: 'Cardápio digital para lanchonete com QR Code e delivery',
    descricao: 'Cardápio digital para lanchonete: pedidos de mesa, retirada e delivery no mesmo painel, com som de pedido novo e cupons. 2 semanas grátis.',
    intro: 'Lanchonete atende balcão, mesa e entrega ao mesmo tempo. O DineDrop coloca tudo isso numa tela só.',
    dores: [
      ['Pedido do balcão, da mesa e do WhatsApp em lugares diferentes', 'Mesa, retirada e delivery chegam no mesmo painel, e pedido novo toca um som.'],
      ['Cliente esperando para conseguir pedir', 'Com o QR na mesa, o cliente pede sozinho.'],
      ['Promoção que ninguém usa', 'Cupons de desconto validados na hora do pedido.'],
    ],
    plano: 'Cliente (cupons a partir do Garçom)',
  },
  {
    slug: 'padaria', grupo: 'pequenos', nome: 'Padarias', curto: 'Padarias', negocio: 'a padaria',
    ajuda: 'Cardápio sempre com o que saiu do forno e retirada sem fila.',
    titulo: 'Cardápio digital para padaria',
    descricao: 'Cardápio digital para padaria: ative e inative produtos a cada fornada, pedido para retirar sem fila e preço atualizado na hora. 2 semanas grátis.',
    intro: 'Na padaria, o que tem na vitrine muda a cada fornada. O DineDrop deixa o cardápio acompanhar esse ritmo.',
    dores: [
      ['Produto que esgota a cada fornada', 'Inative com um toque e ative de novo quando a próxima fornada sair.'],
      ['Fila de manhã cedo', 'O cliente pede pelo celular e só passa no balcão para retirar.'],
      ['Preço antigo na plaquinha', 'Mudou no painel, mudou na hora para todo mundo.'],
    ],
    plano: 'Cliente',
  },
  {
    slug: 'restaurante', grupo: 'grandes', nome: 'Restaurantes com salão', curto: 'Restaurantes', negocio: 'o restaurante',
    ajuda: 'QR por mesa, chamada do garçom e conta da mesa no painel.',
    titulo: 'Cardápio digital com QR Code na mesa para restaurante',
    descricao: 'Cardápio digital para restaurante: QR Code por mesa, cliente chama o garçom pelo celular, painel da cozinha e conta da mesa. 2 semanas grátis.',
    intro: 'Com o salão cheio, cada minuto de espera pesa na experiência. O DineDrop leva o pedido da mesa direto para a equipe certa.',
    dores: [
      ['O garçom não dá conta no pico', 'Com o QR na mesa, o cliente pede sozinho e chama o garçom pelo celular.'],
      ['Comanda de papel que se perde até a cozinha', 'O pedido chega no painel do garçom e da cozinha, com o número da mesa.'],
      ['Fechar a conta demora', 'Conta da mesa no painel, com juntar e transferir mesas.'],
    ],
    plano: 'Garçom',
  },
  {
    slug: 'bar', grupo: 'grandes', nome: 'Bares', curto: 'Bares', negocio: 'o bar',
    ajuda: 'A próxima rodada sai sem esperar o garçom passar.',
    titulo: 'Cardápio digital com QR Code para bar',
    descricao: 'Cardápio digital para bar: o cliente pede a próxima rodada pelo QR da mesa, chama o garçom pelo celular e a conta da mesa fica no painel. 2 semanas grátis.',
    intro: 'No bar, a venda que se perde é a rodada que ninguém pediu porque o garçom não passou. O DineDrop deixa o pedido a um toque.',
    dores: [
      ['A rodada que não foi pedida', 'Pelo QR da mesa, o cliente pede a próxima na hora, sem esperar.'],
      ['Grupo que troca de mesa e conta confusa', 'Junte e transfira mesas pelo painel, sem perder nenhum item.'],
      ['Petisco ou bebida que acabou', 'Inative com um toque e o item sai do cardápio.'],
    ],
    plano: 'Garçom',
  },
  {
    slug: 'pizzaria', grupo: 'grandes', nome: 'Pizzarias', curto: 'Pizzarias', negocio: 'a pizzaria',
    ajuda: 'Delivery próprio, com taxa por bairro e entregador com código.',
    titulo: 'Cardápio digital e delivery próprio para pizzaria',
    descricao: 'Cardápio digital para pizzaria com delivery próprio: pedido pelo seu link, taxa por bairro, entregador com código de entrega e mensalidade fixa. 2 semanas grátis.',
    intro: 'Sexta à noite a pizzaria vende o que consegue atender. O DineDrop organiza o pedido e a entrega para você vender mais sem depender do app de entrega.',
    dores: [
      ['WhatsApp lotado na sexta à noite', 'O cliente faz o pedido no seu link e ele chega organizado no painel, com endereço.'],
      ['Comissão do aplicativo de entrega', 'Delivery pelo seu link, com mensalidade fixa, e o cliente fica com você.'],
      ['Motoboy sem controle', 'Entregador com código de entrega e status do pedido em tempo real.'],
    ],
    plano: 'Garçom',
  },
  {
    slug: 'hamburgueria', grupo: 'grandes', nome: 'Hamburguerias', curto: 'Hamburguerias', negocio: 'a hamburgueria',
    ajuda: 'Pedido pelo seu link e cupom para o cliente voltar.',
    titulo: 'Cardápio digital e delivery próprio para hamburgueria',
    descricao: 'Cardápio digital para hamburgueria: delivery pelo seu link, cupons de desconto para o cliente voltar e relatório dos lanches mais vendidos. 2 semanas grátis.',
    intro: 'Hamburgueria disputa o mesmo cliente com dezenas de outras no aplicativo. O DineDrop ajuda você a ter o seu canal e a fazer o cliente voltar.',
    dores: [
      ['Cliente que pede uma vez e some', 'Cupons de desconto validados na hora do pedido, para trazer o cliente de volta.'],
      ['Comissão do aplicativo de entrega', 'Pedido pelo seu link, com mensalidade fixa.'],
      ['Não saber qual lanche dá resultado', 'Relatório com os itens mais vendidos, ticket médio e horário de pico.'],
    ],
    plano: 'Garçom',
  },
  {
    slug: 'cantina', grupo: 'grandes', nome: 'Cantinas e self-service', curto: 'Cantinas', negocio: 'a cantina',
    ajuda: 'Cardápio do dia atualizado e retirada organizada no almoço.',
    titulo: 'Cardápio digital para cantina e self-service',
    descricao: 'Cardápio digital para cantina e self-service: cardápio do dia atualizado em segundos, pedido para retirar no almoço e relatório de vendas. 2 semanas grátis.',
    intro: 'O almoço concentra o dia inteiro em duas horas. O DineDrop deixa o cardápio do dia em ordem e tira pedido da fila.',
    dores: [
      ['O cardápio muda todo dia', 'Ative os pratos do dia e inative o resto em segundos.'],
      ['Fila no horário de almoço', 'O cliente pede antes e só passa para retirar.'],
      ['Fechamento do dia no caderno', 'Relatório de vendas com faturamento e ticket médio, exportável em PDF e CSV.'],
    ],
    plano: 'Garçom',
  },
  {
    slug: 'delivery', grupo: 'grandes', nome: 'Operações de delivery com entregadores', curto: 'Delivery com entregadores', negocio: 'a operação de delivery',
    ajuda: 'Entregador com código de entrega e status em tempo real.',
    titulo: 'Sistema de delivery próprio com controle de entregadores',
    descricao: 'Delivery próprio com controle de entregadores: código de entrega, status em tempo real, taxa por bairro e pedido mínimo, com mensalidade fixa. 2 semanas grátis.',
    intro: 'Quem vive de entrega precisa saber onde está cada pedido. O DineDrop dá esse controle com mensalidade fixa.',
    dores: [
      ['"Já saiu?" o dia inteiro', 'Status do pedido em tempo real, do preparo até a entrega.'],
      ['Entrega sem comprovação', 'O entregador confirma a entrega com o código do pedido.'],
      ['Taxa de entrega diferente a cada pedido', 'Taxa por bairro e pedido mínimo, aplicados automaticamente.'],
    ],
    plano: 'Garçom',
  },
];
