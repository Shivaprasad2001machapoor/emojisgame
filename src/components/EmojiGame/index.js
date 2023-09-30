import {Component} from 'react'
import './index.css'

import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLossCard from '../WinOrLoseCard'

class EmojiGame extends Component {
  state = {
    score: 0,
    topScore: 0,
    clickedEmojis: new Set(),
    isGameWon: false,
    isGameLost: false,
  }

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  onemojiClicked = emojiId => {
    const {clickedEmojis, score, topScore} = this.state
    const {emojisList} = this.props

    if (clickedEmojis.has(emojiId)) {
      if (score > topScore) {
        this.setState({topScore: score, score: 0})
      }
      this.setState({isGameLost: true})
    } else {
      clickedEmojis.add(emojiId)
      const newScore = score + 1

      if (clickedEmojis.size === emojisList.length) {
        this.setState({isGameWon: true})
        if (newScore > topScore) {
          this.setState({topScore: newScore})
        }
      } else {
        this.setState({score: newScore})
      }

      this.setState({emojisList: this.shuffledEmojisList()})
    }
  }

  resetGame = () => {
    this.setState({
      emojisList: this.shuffledEmojisList(),
      clickedEmojis: new Set(),
      score: 0,
      isGameWon: false,
      isGameLost: false,
    })
  }

  render() {
    const {score, topScore, isGameLost, isGameWon} = this.state
    const {emojisList} = this.props

    return (
      <div className="main-bg-container">
        <NavBar score={score} topScore={topScore} />

        {isGameWon ? (
          <WinOrLoseCard
            message="Congratulations! You won!"
            onPlayAgain={this.resetGame}
            isGameWon={isGameWon}
          />
        ) : isGameLost ? (
          <WinOrLoseCard
            message="Oops! You lost."
            onPlayAgain={this.resetGame}
            isGameWon={isGameWon}
          />
        ) : (
          <ul className="emojis-container">
            {emojisList.map(eachEmoji => (
              <EmojiCard
                key={eachEmoji.id}
                onEmojiClicked={this.onemojiClicked}
                emojiDetails={eachEmoji}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default EmojiGame
