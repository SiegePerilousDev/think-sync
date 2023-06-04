import './Home.css'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

function Home() {
  const history = useHistory()

  const addChannel = () => {
    history.push('/add/channel')
  }

  return (
    <div className="home">
      <div className="home__container">
        <img src="/logo.png" alt="ThinkSync Logo" />
        <h1>Welcome to ThinkSync</h1>
        <p>
          Be sure to go to 'Settings' and add your Anthropic API key to get started.
        </p>

        <p>
          Use the command /claude to call your AI assistant in any channel. Ask a question
          and it will read the chat history for a response!
        </p>

        <Button onClick={addChannel}>Create Channel</Button>
      </div>
    </div>
  )
}

export default Home