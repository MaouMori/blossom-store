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
