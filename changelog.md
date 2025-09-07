# Changelog - Painel Administrativo

## v1.5 - 07/09/2025
- Corrigido definitivamente o **gráfico comparativo**:  
  - Datas agora são ordenadas corretamente (cronológica).  
  - Todas as categorias são empilhadas no mesmo grupo (stack).  
- Rodapé atualizado para exibir a versão **1.5**.  
- Ajuste de tooltips e interação no gráfico para melhor comparação.  

## v1.4 - 06/09/2025
- Implementado carregamento dinâmico do `changelog.md` no modal/lightbox do painel.  
- Modal lê e renderiza automaticamente o arquivo em Markdown.  
- Fallback: se o `changelog.md` não estiver disponível, o modal exibe conteúdo embutido.  

## v1.3 - 05/09/2025
- Adicionado modal/lightbox para exibir o changelog diretamente no painel.  
- Rodapé atualizado com link da versão.  

## v1.2 - 05/09/2025
- Corrigida inconsistência no **gráfico comparativo**: datas agora padronizadas em `YYYY-MM-DD`.  
- Adicionada **paginação** na lista de relatórios (10 registros por página).  

## v1.1 - 05/09/2025
- Corrigido problema na visualização comparativa do gráfico.  
- Rodapé atualizado para exibir a versão.  

## v1.0 - 05/09/2025
- Versão inicial do painel administrativo.  
- Seções incluídas: **Relatório** e **Usuários**.  
- Filtros de data e tipo de avaliação.  
- Gráficos de avaliações (simples e comparativo).  
- Exportação para **Excel** e **PDF**.  
- Proteção de sessão com logout automático após 15 minutos de inatividade.  
