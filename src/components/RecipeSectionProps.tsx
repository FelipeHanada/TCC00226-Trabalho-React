import ReactMarkdown from 'react-markdown';
import type { Article } from '../interfaces/Article';
import { formatPrice } from '../utils/priceUtils';

interface RecipeSectionProps {
  article?: Article;
}

export default function RecipeSection({ article }: RecipeSectionProps) {
  if (!article) {
    return (
      <div className="alert alert-warning" role="alert">
        <i className="bi bi-exclamation-triangle"></i> Artigo não encontrado.
      </div>
    );
  }

  const authorName = article.author 
    ? (article.author.name || `${article.author.firstName} ${article.author.lastName}`)
    : "Autor Desconhecido";
  const formatPublishedDate = (publishedAt?: string) => {
    if (!publishedAt) return "Publicado recentemente";
    
    try {
      const date = new Date(publishedAt);
      return `Publicado em ${date.toLocaleDateString('pt-BR')} às ${date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    } catch {
      return "Publicado recentemente";
    }
  };

  return (
    <div
      className="border px-4 py-3 mb-5"
      data-bs-spy="scroll"
      data-bs-target="#article-nav"
      data-bs-root-margin="-1000px 0px -40%"
      data-bs-smooth-scroll="true"
      tabIndex={0}
    >
      <h1>{article.title || "Título não disponível"}</h1>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p className="text-muted mb-1">
            <i className="bi bi-person-circle me-1"></i>
            {authorName}
          </p>
          <p className="text-muted mb-0">
            <i className="bi bi-calendar3 me-1"></i>
            {formatPublishedDate(article.publishedAt)}
          </p>
        </div>
        <div className="text-end">
          <span className="badge bg-success fs-6 px-3 py-2">
            <i className="bi bi-currency-dollar me-1"></i>
            R$ {article.price ? formatPrice(article.price) : '0.00'}
          </span>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-3">
        <img
          src={article.cardImage || '/src/assets/images/tortamorango.png'}
          className="img-fluid rounded border"
          style={{ height: 240, width: 360, objectFit: 'cover' }}
          alt={article.title || "Receita"}
        />
      </div>

      <section id="descricao" className="mb-4">
        <h3 className="mb-3">
          <i className="bi bi-file-text me-2"></i>
          Descrição
        </h3>
        <p className="text-justify">{article.description || "Descrição não disponível."}</p>
      </section>

      <section id="conteudo" className="mb-4">
        <h3 className="mb-3">
          <i className="bi bi-book me-2"></i>
          Receita Completa
        </h3>
        <div className="markdown-content">
          <ReactMarkdown
            components={{
              h1: ({children}) => <h4 className="mt-4 mb-2 text-primary">{children}</h4>,
              h2: ({children}) => <h5 className="mt-3 mb-2 text-secondary">{children}</h5>,
              h3: ({children}) => <h6 className="mt-3 mb-2">{children}</h6>,
              ul: ({children}) => <ul className="mb-3">{children}</ul>,
              ol: ({children}) => <ol className="mb-3">{children}</ol>,
              li: ({children}) => <li className="mb-1">{children}</li>,
              p: ({children}) => <p className="text-justify mb-3">{children}</p>,
              strong: ({children}) => <strong className="text-dark">{children}</strong>,
              em: ({children}) => <em className="text-muted">{children}</em>,
              blockquote: ({children}) => (
                <blockquote className="blockquote border-start border-primary border-3 ps-3 my-3">
                  {children}
                </blockquote>
              ),
              code: ({children}) => (
                <code className="bg-light px-1 rounded text-danger">{children}</code>
              ),
              pre: ({children}) => (
                <pre className="bg-light p-3 rounded border">{children}</pre>
              ),
            }}
          >
            {article.contentMD || "Conteúdo não disponível."}
          </ReactMarkdown>
        </div>
      </section>
    </div>
  );
}
