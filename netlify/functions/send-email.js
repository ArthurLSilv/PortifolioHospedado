exports.handler = async (event) => {
  // Apenas aceita POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { nome, assunto, mensagem } = JSON.parse(event.body);

    // Validação
    if (!nome || !assunto || !mensagem) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Campos faltando' })
      };
    }

    // Se você configurar um Discord webhook, descomente abaixo:
    // const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    // if (webhookUrl) {
    //   await fetch(webhookUrl, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       content: `**Nova mensagem do portfólio**\n\n**Nome:** ${nome}\n**Assunto:** ${assunto}\n**Mensagem:** ${mensagem}`
    //     })
    //   });
    // }

    // Por enquanto, apenas confirmamos o recebimento
    console.log(`📧 Mensagem recebida de ${nome}: ${assunto}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Mensagem recebida com sucesso! Em breve você receberá uma resposta.'
      })
    };
  } catch (error) {
    console.error('Erro:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao processar' })
    };
  }
};
