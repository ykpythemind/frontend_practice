import React, { useState, MouseEvent, ChangeEvent } from 'react'

interface SearchProps {
  search: (searchValue: string) => void
}

const Search: React.FC<SearchProps> = props => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const resetInputField = () => {
    setSearchValue('')
  }

  const callSearchFunction = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.search(searchValue)
    // resetInputField()
  }

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  )
}

export default Search
