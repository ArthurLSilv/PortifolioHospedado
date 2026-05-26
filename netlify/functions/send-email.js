exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { nome, assunto, mensagem } = JSON.parse(event.body);

    if (!nome || !assunto || !mensagem) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Campos faltando' }) };
    }

    // Tentar enviar via Discord webhook (mais simples)
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhook) {
      try {
        await fetch(discordWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `**📧 Nova mensagem do portfólio**\n\n**Nome:** ${nome}\n**Assunto:** ${assunto}\n**Mensagem:** ${mensagem}`
          })
        });
        console.log(`✅ Mensagem enviada via Discord para ${nome}`);
      } catch (discordError) {
        console.warn('⚠️ Discord webhook falhou:', discordError);
      }
    }

    // Confirmar recebimento
    console.log(`📧 Mensagem recebida: ${nome} - ${assunto}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Mensagem enviada com sucesso! Obrigado pelo contato.'
      })
    };
  } catch (error) {
    console.error('❌ Erro:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao processar mensagem' })
    };
  }
};
