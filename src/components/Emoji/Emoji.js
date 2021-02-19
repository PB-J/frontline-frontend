import React, { useState } from 'react'
import Smiley from './icon-emotion-happy'
import Emojis from './Emojis'
import './emoji.scss'

const EmojiTextarea = ({ handleChange, setText, editValue }) => {
  const [comment, setComment] = useState('')
  const [showEmojis, setShowEmojis] = useState(false)

  const handleText = (e) => {
    const text = e.target.value
    setComment(text)
    setText(text)
    handleChange(text)
  }
  const handleEmoji = (emoji) => {
    const text = comment + emoji
    setComment(text)
    setText(text)
    handleChange(text)
  }
  return (
    <div className="Emoji-Textarea">
      <textarea
        onChange={handleText}
        value={editValue}
        name="content"
      ></textarea>
      <div className="Emoji">
        {showEmojis ? (
          <div className="Emoji-Grid">
            {Emojis.map((value, key) => (
              <span key={key} onClick={() => handleEmoji(value.symbol)}>
                {value.symbol}
              </span>
            ))}
          </div>
        ) : null}
        <div
          className={showEmojis ? 'Emoji-On' : 'Emoji-Off'}
          onClick={() => setShowEmojis(!showEmojis)}
        >
          <Smiley />
        </div>
      </div>
    </div>
  )
}

export default EmojiTextarea
