# Testando Astro

Estou testando o Astro para fazer um site estilo de documentação gerado automaticamente, precisando apenas gerenciar o conteúdo em Markdown.

Isso é apenas teste, então os commits serão bagunçados mesmo.

Talvez, futuramente, quando eu terminar, eu lance uma versão organizada e funcional na minha conta principal.

## Commandos

### Contêiner

#### Docker

Se estiver usando o Docker, pode ser rodado com os seguinte comando:

```
docker compose up
```

Pode ser parado com `CTRL+C` ou `docker compose down`.

#### Podman

Se estiver usando o Podman, pode ser rodado com o seguinte comando:

```
podman compose up
```

Pode ser parado com `CTRL+C` ou `podman compose down`.

### Nativamente

Para rodar nativamente na própria máquina, esses são os principais comandos:

| Comando | Resultado |
| :---: | :--- |
| `npm install` | Instala todas as dependências |
| `npm run dev` | Inicia o servidor local de desenvolvimento em `localhost:4321` |
| `npm run build` | Builda o projeto em `./dist/` |
| `npm run preview` | Inicia o projeto buildado em `localhost:4321` |
