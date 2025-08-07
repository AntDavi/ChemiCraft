# ChemiCraft - Plano de Desenvolvimento do MVP

## 1. Objetivo do MVP

Desenvolver uma aplicação educacional de química com as seguintes funcionalidades principais:

- **Interface intuitiva** com barra de átomos disponíveis para seleção
- **Área interativa (canvas)** onde os átomos podem ser posicionados via drag-and-drop
- **Sistema de ligação automática** baseado em proximidade e regras de valência
- **Exibição dinâmica** do nome e fórmula da molécula formada (ex: H₂O, CH₄)
- **Funcionalidade de limpeza** para resetar a estrutura molecular

## 2. Estrutura de Pastas Sugerida

```
/app
├── components/          # Componentes reutilizáveis
│   ├── AtomSelector.tsx
│   ├── MoleculeCanvas.tsx
│   ├── Atom.tsx
│   ├── BondLine.tsx
│   ├── MoleculeNameDisplay.tsx
│   └── ClearButton.tsx
├── lib/                 # Lógica utilitária
│   ├── moleculeUtils.ts
│   ├── atomData.ts
│   └── bondingRules.ts
├── hooks/               # Hooks customizados
│   ├── useMoleculeBuilder.ts
│   └── useDragAndDrop.ts
├── styles/              # Estilos e configurações
│   ├── globals.css
│   └── components.css
└── page.tsx            # Página principal
```

## 3. Componentes Principais

### 3.1 Componentes de Interface
- **`AtomSelector.tsx`**: Barra lateral/superior com elementos químicos clicáveis e arrastáveis
- **`MoleculeCanvas.tsx`**: Área principal onde átomos são posicionados e conectados
- **`Atom.tsx`**: Representação visual individual de cada átomo (cor, símbolo, valência)
- **`BondLine.tsx`**: Componente para renderizar ligações visuais entre átomos
- **`MoleculeNameDisplay.tsx`**: Painel que exibe a fórmula e nome da molécula atual
- **`ClearButton.tsx`**: Botão para limpar toda a estrutura molecular

### 3.2 Hooks e Estado
- **`useMoleculeBuilder`**: Gerenciamento do estado global da molécula
- **`useDragAndDrop`**: Controle de comportamento de arrastar e soltar

### 3.3 Utilitários e Lógica
- **`lib/atomData.ts`**: Dados da tabela periódica (símbolo, valência, cor, massa)
- **`lib/moleculeUtils.ts`**: Funções para cálculo de ligações e nomenclatura
- **`lib/bondingRules.ts`**: Regras de valência e tipos de ligação química

## 4. Tarefas de Implementação

### 4.1 Configuração Inicial
- [x] Configurar estrutura base do projeto Next.js com TypeScript
- [x] Instalar e configurar Tailwind CSS para estilização
- [ ] Adicionar Capacitor para empacotamento mobile
- [x] Configurar ESLint e Prettier para padronização

### 4.2 Dados e Lógica Base
- [x] Criar arquivo `atomData.ts` com elementos químicos básicos (H, C, N, O, S, P)
- [x] Implementar `moleculeUtils.ts` com funções de cálculo de distância e proximidade
- [x] Desenvolver `bondingRules.ts` com regras de valência e ligação

### 4.3 Sistema de Estado
- [x] Implementar hook `useMoleculeBuilder` para:
  - [x] Gerenciar posições dos átomos no canvas
  - [x] Controlar ligações entre átomos
  - [x] Calcular fórmula molecular resultante
  - [x] Função de reset/limpeza

### 4.4 Componentes de Interface
- [x] Desenvolver `AtomSelector.tsx`:
  - [x] Layout responsivo com elementos químicos
  - [x] Funcionalidade de drag iniciado
  - [x] Visual feedback durante arrastar
- [x] Criar `MoleculeCanvas.tsx`:
  - [x] Área de drop funcional
  - [x] Posicionamento de átomos
  - [x] Detecção de proximidade para ligações
- [x] Implementar `Atom.tsx`:
  - [x] Representação visual (círculo colorido + símbolo)
  - [x] Estados visuais (normal, selecionado, conectado)
  - [x] Informações de valência disponível

### 4.5 Sistema de Ligações
- [ ] Implementar detecção automática de proximidade entre átomos
- [ ] Criar algoritmo de ligação baseado em valência
- [ ] Desenvolver `BondLine.tsx` para visualização de ligações:
  - [ ] Ligação simples (linha única)
  - [ ] Ligação dupla (linhas paralelas)
  - [ ] Ligação tripla (três linhas paralelas)

### 4.6 Sistema de Nomenclatura
- [ ] Implementar geração automática de fórmula molecular
- [ ] Criar `MoleculeNameDisplay.tsx` para exibir:
  - [ ] Fórmula química (ex: H₂O, CH₄)
  - [ ] Nome comum da molécula (quando aplicável)
  - [ ] Contagem de átomos por elemento

### 4.7 Funcionalidades Complementares
- [ ] Implementar `ClearButton.tsx` com confirmação
- [ ] Adicionar feedback visual para ações (hover, drag, drop)
- [ ] Implementar sistema de undo/redo (opcional)

### 4.8 Otimização e Responsividade
- [ ] Testar comportamento em dispositivos desktop
- [ ] Testar comportamento em dispositivos móveis/tablets
- [ ] Otimizar performance para renderização de muitos átomos
- [ ] Implementar touch gestures para mobile

### 4.9 Integração Capacitor
- [ ] Configurar build para iOS
- [ ] Configurar build para Android
- [ ] Testar funcionalidades touch em dispositivos reais
- [ ] Otimizar UX para aplicações nativas

## 5. Tecnologias e Dependências

### 5.1 Core
- **Next.js 14+** (App Router)
- **TypeScript** para tipagem estática
- **React 18+** com hooks modernos

### 5.2 UI e Estilização
- **Tailwind CSS** para estilização utilitária
- **Lucide React** para ícones
- **Framer Motion** para animações (opcional)

### 5.3 Mobile
- **Capacitor** para empacotamento nativo
- **@capacitor/ios** e **@capacitor/android**

### 5.4 Drag and Drop
- **@dnd-kit/core** ou **react-dnd** para funcionalidade drag-and-drop
- **@dnd-kit/sortable** para ordenação (se necessário)

## 6. Funcionalidades Extras (Futuras Versões)

### 6.1 Validação Avançada
- [ ] Implementar validação IUPAC para nomenclatura
- [ ] Verificação de estabilidade molecular
- [ ] Alertas para estruturas químicamente impossíveis

### 6.2 Experiência do Usuário
- [ ] Sistema de áudio com feedback sonoro
- [ ] Animações de ligação entre átomos
- [ ] Tutoriais interativos para iniciantes
- [ ] Modo escuro/claro

### 6.3 Funcionalidades Avançadas
- [ ] Exportar molécula como imagem (PNG/SVG)
- [ ] Salvar e carregar estruturas moleculares
- [ ] Biblioteca de moléculas pré-definidas
- [ ] Modo desafio com objetivos específicos

### 6.4 Educacional
- [ ] Informações detalhadas de cada elemento
- [ ] Explicações sobre tipos de ligação
- [ ] Quiz sobre estruturas moleculares
- [ ] Integração com conteúdo educacional

## 7. Critérios de Aceitação do MVP

- ✅ Usuário consegue arrastar átomos da barra para o canvas
- ✅ Átomos se conectam automaticamente quando próximos
- ✅ Fórmula molecular é exibida corretamente
- ✅ Funciona em desktop e mobile
- ✅ Interface é intuitiva e responsiva
- ✅ Botão de limpeza funciona corretamente

---

**Estimativa de Desenvolvimento**: 2-3 semanas para MVP completo
**Prioridade**: Funcionalidade core primeiro, depois otimizações e extras
