function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl shadow-xl border-0 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export { Card, CardContent };