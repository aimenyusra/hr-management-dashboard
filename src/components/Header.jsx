import "../styles/components/Header.css";


export default function Header({ title, subtitle, action }) {
  return (
    <div className="header">
      <div className="header-title">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="header-right">
        {action && <div className="header-action">{action}</div>}

        <div className="header-search">
          <span>🔍</span>
        <span>Search </span>
          
        </div>

        <button className="header-icon-btn" >⚙️</button>

        <button className="header-icon-btn">
          🔔
          <span className="notification-dot" />
        </button>

        <div className="header-avatar">A</div>
        
      </div>
    </div>
  );
}