import React, { useEffect, useState } from 'react';
import { Option } from './Select';

type AutocompleteProps = {
    label: string;
    placeholder: string;
    initInputValue?: string;
    register?: any;
    suggestions: Option[] | ((item: string) => Promise<Option[] | []>);
    onSelected: (item: Option) => void;
};

const SuggestionsListComponent = ({
  filteredSuggestions,
  activeSuggestionIndex,
  onClick,
}:
  {
    filteredSuggestions: any[],
    activeSuggestionIndex: number,
    onClick: (suggestion: Option) => void
  }) => {
  if (filteredSuggestions.length) {
    return (
      <div className="overflow-y-scroll h-96 border-gray-500 bg-white h-auto max-h-40">
        <ul>
          {filteredSuggestions.map((suggestion: Option, index) => {
            let className = 'text-grey-700 hover:bg-blue-400 hover:text-white';
            // Flag the active suggestion with a class
            if (index === activeSuggestionIndex) {
              className = 'text-grey-700 bg-blue-400 text-white';
            }
            return (
              <li className={`cursor-pointer p-2 ${className}`}>
                <button type="button" onClick={() => onClick(suggestion)}>{suggestion.label}</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="no-suggestions">
      <em>Nenhum registo encontrado</em>
    </div>
  );
};

const AutoComplete = ({
  label, placeholder, suggestions, onSelected, register, initInputValue = '',
}: AutocompleteProps) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<Option[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState(initInputValue);

  useEffect(() => {
    setInput(initInputValue);
  }, [initInputValue]);

  const onKeyDown = (key: any) => {
    if (key.keyCode === 13 || key.keyCode === 9) {
      setInput(filteredSuggestions[activeSuggestionIndex].label);
      setFilteredSuggestions([]);
    }
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInput(userInput);
    if (userInput.length < 4) return;

    // Filter our suggestions that don't contain the user's input
    const unLinked = Array.isArray(suggestions)
      ? suggestions.filter(
        (suggestion: Option) => suggestion.label.toLowerCase()
          .indexOf(userInput.toLowerCase()) > -1,
      )
      : await suggestions(userInput.toLowerCase());

    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (suggestion: Option) => {
    setFilteredSuggestions([]);
    setInput(suggestion.label);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
    onSelected(suggestion);
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label htmlFor="">
      {label}
      <input
        placeholder={placeholder}
        type="text"
        className="mb-2
                          block
                          w-full
                          rounded-md
                          border-gray-300
                          shadow-sm
                          focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
        {...register}
      />
      {showSuggestions && input && (
      <SuggestionsListComponent
        filteredSuggestions={filteredSuggestions}
        onClick={onClick}
        activeSuggestionIndex={activeSuggestionIndex}
      />
      )}
    </label>
  );
};
export default AutoComplete;
