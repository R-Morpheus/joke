import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJokes } from './state/actions/jokes';
import cls from "./App.module.css";
import Card from './components/Card';
import {AppDispatch} from "./state/store/store";
import Input from "./components/Input";

interface JokeState {
  data: Array<{ id: string, url: string, value: string, created_at: string }>;
  loading: boolean;
  error: string;
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const jokesPerPage = 8;

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: { jokes: JokeState }) => state.jokes);

  const pageCount = Math.ceil(data.length / jokesPerPage);
  const goToNextPage = () => setCurrentPage(currentPage + 1 <= pageCount ? currentPage + 1 : currentPage);
  const goToPreviousPage = () => setCurrentPage(currentPage - 1 >= 1 ? currentPage - 1 : currentPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 3) {
      dispatch(fetchJokes(value));
    }
  };

  const indexOfLastJoke = currentPage * jokesPerPage;
  const indexOfFirstJoke = indexOfLastJoke - jokesPerPage;
  const currentJokes = data.slice(indexOfFirstJoke, indexOfLastJoke);

  return (
    <div className={cls.container}>
      <div>
        <Input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search jokes..."
          autoFocus
        />
        {data.length > 0 && (
          <p className={cls.jokesCount}>Found jokes: {data.length}</p>
        )}
      </div>

      {loading && <p className={cls.jokesCount}>Loading...</p>}
      {error && <p className={cls.jokesCount}>Error: {error}</p>}

      <div className={cls.list}>
        {currentJokes.map((joke, index) => (
          <Card key={joke.id} joke={joke} className={index < 2 ? 'cardLarge' : 'cardSmall'}
          />
        ))}
      </div>
      {data.length > 0 && (
        <div className={cls.pagination}>
          <button className={cls.button} onClick={goToPreviousPage} disabled={currentPage === 1}>{'<'}</button>
          <span>{currentPage} of {pageCount}</span>
          <button className={cls.button} onClick={goToNextPage} disabled={currentPage === pageCount}>{'>'}</button>
        </div>
      )}
    </div>
  );
};

export default App;
