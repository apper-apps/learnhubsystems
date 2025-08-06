const PageContainer = ({ children, title, description, className = "" }) => {
  return (
    <div className="min-h-screen bg-midnight-900">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
        {(title || description) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-slate-400 text-lg">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageContainer;