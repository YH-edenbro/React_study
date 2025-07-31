import './Header.css'
import { memo } from 'react'

const Header = () => {
    return (
      <div className="Header">
        <h3>오늘은 📆</h3>
        <h1>{new Date().toLocaleDateString()}</h1>
      </div>
    )
}

const momoizedHeader = memo(Header)

export default momoizedHeader;