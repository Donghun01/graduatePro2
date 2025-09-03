// src/pages/SearchPage.jsx
import React from "react";
import SearchForm from "../components/SearchForm"; // SearchForm 컴포넌트 가져오기
import SearchResultsDisplay from "../components/SearchResultsDisplay"; // SearchResultsDisplay 컴포넌트 가져오기
import { useSearch } from "../contexts/SearchContext";

const SearchPage = () => {
  const { showResults } = useSearch();

  return (
    <div className="flex flex-col items-center py-16 px-6 bg-gray-50">
      <SearchForm />
      {showResults && <SearchResultsDisplay />}
    </div>
  );
};

export default SearchPage;
