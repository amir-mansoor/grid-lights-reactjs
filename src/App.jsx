import { useState } from 'react'
import './App.css'

function Cell({filled, onClick,isDisabled}) {
  return <button disabled={isDisabled} onClick={onClick} className={filled ? "cell cell-activated" : "cell"}></button>
}



function App() {

    const [order,setOrder] = useState([])
    const [isDeactivating,setDeactivating] = useState(false)

    const config = [
      [1,1,1],
      [1,0,1],
      [1,1,1]
    ]

    const activateCells = (index) => {
      const newOrder = [...order, index]
      setOrder(newOrder)
      if(newOrder.length === config.flat(1).filter(Boolean).length) {
        deactivateCells()
      }
    }

    const deactivateCells = () => {
      setDeactivating(true)

      const timer = setInterval(() => {
        setOrder((oriOrder)=> {
          const newOrder = oriOrder.slice()
          newOrder.pop()

          if(newOrder.length === 0) {
            clearInterval(timer)
            setDeactivating(false)
          }

          return newOrder
        })
      }, 300)
    }


    return (
      <div className='wrapper'>
        <div className='grid' style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`
        }}>
          {config.flat(1).map((value, index) => {
            return value ? <Cell isDisabled={order.includes(index) || isDeactivating} key={index} filled={order.includes(index)} onClick={() => activateCells(index)}/> : <span></span>
          })}
        </div>
      </div>
  )
}

export default App
