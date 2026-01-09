import './css/App.css'
import Menu from './Menu.jsx'
import Snowfall from 'react-snowfall'

export default function App() {

  return (
    <>
      <h1>funding layer sim</h1>
        <div className="card">
            <Snowfall snowflakeCount={50}/>
          <Menu />
      </div>

    </>
  )
}

