// _Components/GitHubRepoCard.js
import Link from 'next/link';

const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    'C#': '#239120',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#1572B6',
    Vue: '#2c3e50',
    React: '#61DAFB',
    Angular: '#DD0031',
    Shell: '#89e051',
    PowerShell: '#012456',
    Dockerfile: '#384d54',
    YAML: '#cb171e',
    JSON: '#292929',
    Markdown: '#083fa1'
  };
  return colors[language] || '#8b949e';
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

const GitHubRepoCard = ({ repo, featured = false }) => {
  if (featured) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 hover:border-slate-500 transition-all duration-200 group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
            </svg>
            <Link 
              href={`/projects/${repo.name}`}
              className="text-blue-400 hover:text-blue-300 font-semibold text-lg group-hover:underline"
            >
              {repo.name}
            </Link>
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full border border-slate-600">
              {repo.visibility || 'Public'}
            </span>
          </div>
        </div>
        
        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
          {repo.description || 'No description available'}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            {repo.language && (
              <div className="flex items-center space-x-1">
                <span 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                />
                <span>{repo.language}</span>
              </div>
            )}
            
            {repo.stargazers_count > 0 && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.719-4.192L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                </svg>
                <span>{repo.stargazers_count}</span>
              </div>
            )}
            
            {repo.forks_count > 0 && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z"/>
                </svg>
                <span>{repo.forks_count}</span>
              </div>
            )}
          </div>
          
          <span className="text-xs text-slate-500">
            Updated {formatDate(repo.updated_at)}
          </span>
        </div>
      </div>
    );
  }

  // Compact view for non-featured repos
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 hover:border-slate-500 transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
          </svg>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <Link 
                href={`/projects/${repo.name}`}
                className="text-blue-400 hover:text-blue-300 font-medium text-sm group-hover:underline truncate"
              >
                {repo.name}
              </Link>
              <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full border border-slate-600 flex-shrink-0">
                {repo.visibility || 'Public'}
              </span>
            </div>
            
            {repo.description && (
              <p className="text-slate-400 text-xs truncate">
                {repo.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-xs text-slate-400 flex-shrink-0 ml-4">
          {repo.language && (
            <div className="flex items-center space-x-1">
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              />
              <span className="hidden sm:inline">{repo.language}</span>
            </div>
          )}
          
          {repo.stargazers_count > 0 && (
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.719-4.192L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
              </svg>
              <span>{repo.stargazers_count}</span>
            </div>
          )}
          
          <span className="text-slate-500 hidden md:inline">
            {formatDate(repo.updated_at)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GitHubRepoCard;