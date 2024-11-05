import './styles.css'

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input className='textInput'
      value={searchValue}
      onChange={handleChange}
      type="search"
      placeholder="Type your search" />
  )
}