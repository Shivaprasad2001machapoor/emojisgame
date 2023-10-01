import {Component} from 'react'
import './index.css'

import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'

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

    let gameContent

    if (isGameWon) {
      gameContent = (
        <WinOrLoseCard
          message="You Won"
          onPlayAgain={this.resetGame}
          isGameWon={isGameWon}
        />
      )
    } else if (isGameLost) {
      gameContent = (
        <WinOrLoseCard
          message="You Lose"
          onPlayAgain={this.resetGame}
          isGameWon={isGameWon}
        />
      )
    } else {
      gameContent = (
        <ul className="emojis-container">
          {emojisList.map(eachEmoji => (
            <EmojiCard
              key={eachEmoji.id}
              onemojiClicked={this.onemojiClicked}
              emojiDetails={eachEmoji}
            />
          ))}
        </ul>
      )
    }

    return (
      <div className="main-bg-container">
        <NavBar isGameWon={isGameWon} score={score} topScore={topScore} />
        {gameContent}
      </div>
    )
  }
}
export default EmojiGame
