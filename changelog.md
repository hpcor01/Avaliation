# Changelog - Painel Administrativo

## v1.5 - 07/09/2025
- Corrigido definitivamente o **gráfico comparativo**:
  - Datas agora são ordenadas corretamente (cronológica).
  - Todas as categorias são empilhadas no mesmo grupo (stack).
  - Ajuste de tooltips e interação no gráfico para melhor comparação.
- Rodapé atualizado para exibir a versão **1.5**.
- Modal carrega o `changelog.md` dinamicamente.

## v1.4 - 06/09/2025
- Implementado carregamento dinâmico do `changelog.md` no modal/lightbox do painel.
- Fallback embutido caso o `changelog.md` não esteja acessível via fetch.

## v1.3 - 05/09/2025
- Adicionado modal/lightbox para exibir o changelog diretamente no painel.
- Rodapé atualizado com link da versão.

## v1.2 - 05/09/2025
- Corrigida inconsistência no **gráfico comparativo**: datas padronizadas em `YYYY-MM-DD`.
- Adicionada **paginação** na lista de relatórios (10 registros por página).

## v1.1 - 05/09/2025
- Correção em datasets do gráfico comparativo.
- Rodapé atualizado.

## v1.0 - 05/09/2025
- Versão inicial do painel administrativo.
- Seções: **Relatório** e **Usuários**.
- Exportação para **Excel** e **PDF**.
- Logout automático após 15 minutos de inatividade.
