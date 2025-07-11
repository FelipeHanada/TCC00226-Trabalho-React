// Utility functions para processar conteúdo Markdown dos artigos

export const parseArticleContent = (contentMD: string) => {
  const lines = contentMD.split('\n');
  const result = {
    ingredients: [] as { title: string; items: string[] }[],
    instructions: [] as string[]
  };

  let currentIngredientGroup = { title: '', items: [] as string[] };
  let inIngredients = false;
  let inInstructions = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Detectar seções
    if (trimmedLine.toLowerCase().includes('ingredientes')) {
      inIngredients = true;
      inInstructions = false;
      continue;
    }
    
    if (trimmedLine.toLowerCase().includes('preparo') || 
        trimmedLine.toLowerCase().includes('modo') || 
        trimmedLine.toLowerCase().includes('instruções')) {
      inInstructions = true;
      inIngredients = false;
      // Se há um grupo de ingredientes em andamento, adicionar
      if (currentIngredientGroup.title && currentIngredientGroup.items.length > 0) {
        result.ingredients.push({ ...currentIngredientGroup });
        currentIngredientGroup = { title: '', items: [] };
      }
      continue;
    }

    // Processar ingredientes
    if (inIngredients) {
      if (trimmedLine.startsWith('###') || trimmedLine.startsWith('**')) {
        // Novo grupo de ingredientes
        if (currentIngredientGroup.title && currentIngredientGroup.items.length > 0) {
          result.ingredients.push({ ...currentIngredientGroup });
        }
        currentIngredientGroup = {
          title: trimmedLine.replace(/#{3,}|[*]/g, '').trim(),
          items: []
        };
      } else if (trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
        // Item do ingrediente
        currentIngredientGroup.items.push(trimmedLine.replace(/^[-*]\s*/, ''));
      } else if (trimmedLine && !trimmedLine.startsWith('#')) {
        // Linha de ingrediente sem marcação
        currentIngredientGroup.items.push(trimmedLine);
      }
    }

    // Processar instruções
    if (inInstructions) {
      if (trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
        result.instructions.push(trimmedLine.replace(/^[-*]\s*/, ''));
      } else if (trimmedLine && !trimmedLine.startsWith('#')) {
        result.instructions.push(trimmedLine);
      }
    }
  }

  // Adicionar o último grupo de ingredientes se houver
  if (currentIngredientGroup.title && currentIngredientGroup.items.length > 0) {
    result.ingredients.push({ ...currentIngredientGroup });
  }

  return result;
};

export const getDefaultIngredients = () => [
  {
    title: 'Para a massa',
    items: [
      '2 xícaras de farinha de trigo...',
      '1/2 xícara de manteiga gelada cortada em cubos',
      '1/4 de xícara de açúcar',
      '1 pitada de sal',
      '1 gema de ovo',
      '3 colheres de sopa de água gelada (adicionar aos poucos...)'
    ]
  },
  {
    title: 'Para o recheio',
    items: [
      '1 lata de leite condensado',
      '1 lata de creme de leite sem soro',
      '2 colheres de sopa de amido de milho',
      '500 ml de leite',
      '2 gemas de ovo peneiradas',
      '1 colher de chá de essência de baunilha'
    ]
  },
  {
    title: 'Para a cobertura',
    items: [
      '2 caixas de morangos frescos',
      '1 xícara de açúcar',
      '1/2 xícara de água',
      '1 colher de sopa de suco de limão',
      '1 colher de sopa de amido de milho dissolvido em 2 colheres de sopa de água'
    ]
  }
];

export const getDefaultInstructions = () => [
  'Para preparar a torta, comece pela massa...',
  'Para preparar o recheio, misture em uma panela...',
  'Agora é hora de montar a torta...',
  'Leve à geladeira por pelo menos duas horas...'
];
