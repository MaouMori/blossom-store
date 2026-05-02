const { supabase } = require("./_supabase");

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const body = req.body || {};
    const order = {
      id: body.orderId || `BLS-${Date.now()}`,
      customer: body.customer || "",
      email: body.email || "",
      payment: body.payment || "",
      total: Number(body.total || 0),
      items: body.items || [],
      createdAt: new Date().toISOString(),
    };

    const created = await supabase("orders", {
      method: "POST",
      body: JSON.stringify(order),
    });

    res.status(201).json(created?.[0] || order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
