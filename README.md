# Blossom Store


Site e loja Blossom com backend local em Node.

## Rodar local

```bash
npm start
```

Depois abra:

```text
http://localhost:3000
```

## Painel admin

```text
http://localhost:3000/login.html
```

Usuário demo:

```text
admin
```

Senha demo:

```text
admin123
```

## Dados

O backend salva produtos, coleções, opções e pedidos em:

```text
data/store.json
```

As imagens enviadas pelo admin são salvas como base64 dentro desse arquivo. Para produção com muitas imagens, use storage externo como Supabase Storage ou Cloudinary.

## Integracoes no Vercel

Configure estas variaveis de ambiente para ativar Discord e contato:

```text
DISCORD_CONTACT_WEBHOOK_URL=https://discord.com/api/webhooks/...
DISCORD_CLIENT_ID=seu_client_id
DISCORD_CLIENT_SECRET=seu_client_secret
DISCORD_REDIRECT_URI=https://seu-site.vercel.app/api/discord-auth?action=callback
SITE_URL=https://seu-site.vercel.app
```

No painel de OAuth2 do Discord, cadastre a mesma URL de callback usada em `DISCORD_REDIRECT_URI`.
