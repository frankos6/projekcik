import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link';

export const metadata = {
  title: 'xd',
  description: 'xd',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{overflowX: 'hidden'}}>
        <nav className={'navbar navbar-expand-md navbar-light'}>
          <div className='container-fluid'>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0 flex-row'>
                <li className='nav-item'>
                  <Link className='nav-link m-2' href='/app1'>App 1</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link m-2' href='/app2'>App 2</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link m-2' href='/app3'>App 3</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link m-2' href='/app4'>App 4</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link m-2' href='/app5'>App 5</Link>
                </li>
              </ul>
          </div>
        </nav>
        <div className='container'>
          {children}
        </div>
      </body>
    </html>
  )
}
