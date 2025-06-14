import Alert from "./Alert"

interface NavItem {
  label: string
  href: string
}

interface RecipeSidebarNavProps {
  navId?: string
  title?: string
  items: NavItem[]
}

export default function RecipeSidebarNav({
  navId = 'article-nav',
  title = 'Receita',
  items,
}: RecipeSidebarNavProps) {
  return (
    <div className="bg-light rounded " style={{ position: 'sticky', top: 110 }}>
      <nav id={navId} className="navbar navbar-light">
        <div className="container-fluid d-flex flex-column">
          <a className="navbar-brand" href="#">
            {title}
          </a>
          <ul className="nav nav-pills flex-column">
            {items.map((item, index) => (
              <li className="nav-item" key={index}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <Alert message="Isso é um ScrollSpy." />
    </div>
  )
}
