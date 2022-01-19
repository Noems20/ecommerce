import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  SearchBarContainer,
  SearchInput,
  SearchButton,
} from './search-bar.styles';

import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');

  const history = useHistory();

  // ---------------------------------  HANDLERS ------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${keyword.trim()}`);
  };

  return (
    <SearchBarContainer onSubmit={handleSubmit}>
      <SearchInput
        type='text'
        placeholder='Buscar productos'
        name='keyword'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <SearchButton type='submit'>
        <FaSearch />
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
