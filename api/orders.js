const { supabase } = require("./_supabase");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
      const userId = String(url.searchParams.get("userId") || "").trim();
      const email = String(url.searchParams.get("email") || "").trim();
      if (!userId && !email) {
        res.status(401).json({ error: "Faça login para ver o histórico." });
        return;
      }
      const filter = userId
        ? `userId=eq.${encodeURIComponent(userId)}`
        : `email=eq.${encodeURIComponent(email)}`;
      const orders = await supabase(`orders?${filter}&select=*&order=createdAt.desc`);
      res.status(200).json({ orders: orders || [] });
      return;
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "GET, POST");
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const body = req.body || {};
    const order = {
      id: body.orderId || `BLS-${Date.now()}`,
      userId: body.userId || "",
      customer: body.customer || "",
      email: body.email || "",
      payment: body.payment || "",
      subtotal: Number(body.subtotal || body.total || 0),
      discount: Number(body.discount || 0),
      coupon: body.coupon || "",
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
