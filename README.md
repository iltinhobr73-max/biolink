# BioLink Generator

MicroSaaS client-side feito com Next.js 14, TypeScript, Tailwind CSS, Zustand, JSZip e File Saver.

Ele serve para vender acesso a um criador de páginas **Link na Bio**. O cliente personaliza nome, bio, avatar, links, cores e exporta um ZIP com `index.html` pronto para hospedar.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra:

```txt
http://localhost:3000
```

## Como testar no celular

Rode:

```bash
npm run dev -- -H 0.0.0.0
```

Veja seu IP no Windows:

```bash
ipconfig
```

No celular, abra:

```txt
http://SEU-IP:3000
```

Exemplo:

```txt
http://192.168.0.7:3000
```

O celular e o PC precisam estar no mesmo Wi-Fi.

## Builder com acesso por senha/token

Copie `.env.local.example` para `.env.local`.

### Modo teste

Deixe assim:

```env
NEXT_PUBLIC_ACCESS_TOKEN=
```

A rota `/builder` abre normalmente.

### Modo venda

Configure uma senha:

```env
NEXT_PUBLIC_ACCESS_TOKEN=BIOPRO2026
```

Aí o comprador acessa:

```txt
https://seusite.com/builder?token=BIOPRO2026
```

Ou entra em `/builder` e digita a senha manualmente.

## Como vender com Kiwify

1. Crie o produto na Kiwify.
2. Coloque o preço, por exemplo R$19,90.
3. Na entrega do produto, envie a senha/token para o comprador.
4. Opcional: configure o redirecionamento pós-compra para:

```txt
https://seusite.com/builder?token=SUA_SENHA
```

5. Na variável `NEXT_PUBLIC_KIWIFY_CHECKOUT_URL`, coloque o link real do checkout.

## Exportação

No builder, clique em **Baixar ZIP**. O arquivo gerado contém:

- `index.html`
- `README.txt`

O `index.html` é auto-contido e pronto para hospedar.

## Importante

Esta versão é um MVP simples, sem login, sem banco de dados e sem conta de usuário.

Isso é intencional para validar rápido. Primeiro você vende o acesso simples. Se vender bem, depois evolui para login, Supabase, dashboard, assinatura e projetos salvos online.
