import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { StateProvider } from './store'
import Counter from './Counter'
const App = () => {
  return (
    <StateProvider>
      <Counter />
    </StateProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
