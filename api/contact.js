function dataUrlToFile(attachment) {
  if (!attachment?.dataUrl) return null;
  const match = String(attachment.dataUrl).match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  return {
    name: attachment.name || "anexo.png",
    type: attachment.type || match[1] || "application/octet-stream",
    buffer: Buffer.from(match[2], "base64"),
  };
}

function clean(value) {
  return String(value || "").trim();
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;
    if (!webhookUrl) {
      res.status(500).json({ error: "Configure DISCORD_CONTACT_WEBHOOK_URL no Vercel." });
      return;
    }

    const body = req.body || {};
    const file = dataUrlToFile(body.attachment);
    const payload = {
      username: "Blossom Store",
      embeds: [{
        title: "Nova mensagem do site",
        color: 16743596,
        fields: [
          { name: "Nome", value: clean(body.name) || "Não informado", inline: true },
          { name: "E-mail", value: clean(body.email) || "Não informado", inline: true },
          { name: "Discord", value: clean(body.discord) || "Não informado", inline: true },
          { name: "Categoria", value: clean(body.category) || "Não informado", inline: true },
          { name: "Tipo", value: clean(body.type) || "Não informado", inline: true },
          { name: "Mensagem", value: clean(body.message).slice(0, 1000) || "Sem mensagem" },
        ],
        timestamp: new Date().toISOString(),
      }],
    };

    let response;
    if (file) {
      const form = new FormData();
      form.append("payload_json", JSON.stringify(payload));
      form.append("files[0]", new Blob([file.buffer], { type: file.type }), file.name);
      response = await fetch(webhookUrl, { method: "POST", body: form });
    } else {
      response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(detail || "Discord recusou a mensagem.");
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
