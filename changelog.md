# Changelog - Painel Administrativo

## v1.4 - 06/09/2025
- Implementado carregamento dinâmico do `changelog.md` no modal/lightbox.
- O modal lê e renderiza automaticamente o arquivo `changelog.md` (Markdown).
- Por solicitação, o rodapé continua exibindo **Versão 1.3**, enquanto a versão interna é **v1.4**.
- Fallback: se o `changelog.md` não estiver disponível, o modal exibe conteúdo embutido.

## v1.3 - 05/09/2025
- Adicionado modal/lightbox para exibir o changelog diretamente no painel.
- Rodapé atualizado com link da versão.

## v1.2 - 05/09/2025
- Corrigida inconsistência no **gráfico comparativo**: datas agora padronizadas em `YYYY-MM-DD`.
- Adicionada **paginação** na lista de relatórios.

## v1.1 - 05/09/2025
- Corrigido problema na visualização comparativa do gráfico.
- Rodapé atualizado para exibir a versão.

## v1.0 - 05/09/2025
- Versão inicial do painel administrativo.
- Seções: **Relatório** e **Usuários**.
- Exportação para **Excel** e **PDF**.
- Logout automático após 15 minutos de inatividade.
