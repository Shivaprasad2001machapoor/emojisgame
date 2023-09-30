import './index.css'

const EmojiCard = props => {
  const {emojiDetails, onemojiClicked} = props
  const {id, emojiUrl, emojiName} = emojiDetails

  const emojiClicked = () => {
    onemojiClicked(id)
  }

  return (
    <li className="emoji-container">
      <button type="button" onClick={emojiClicked} className="button">
        <img className="emoji-pic" src={emojiUrl} alt={emojiName} />
      </button>
    </li>
  )
}
export default EmojiCard
