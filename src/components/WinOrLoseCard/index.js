import './index.css'

const WinOrLoseCard = props => {
  const {message, onPlayAgain, isGameWon} = props
  const imageurl = isGameWon
    ? 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'
  return (
    <div className="win-or-lose-card">
      <div className="message-container">
        <p className="message">{message}</p>
        <button
          type="button"
          className="play-again-button"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
      </div>
      <div className="image-container">
        <img className="win-loss-image" src={imageurl} alt="win/loss" />
      </div>
    </div>
  )
}

export default WinOrLoseCard
