import s from './Autocomplete.module.css';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect } from 'react';

export const Autocomplete = ({isLoaded, onselect}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        init,
        clearSuggestions,
      } = usePlacesAutocomplete({
        initOnMount: false,
        debounce: 300,
      });
      const ref = useOnclickOutside(() => {
        clearSuggestions();
      });
    
      const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
      };
    
      const handleSelect =
        ({ description }) =>
        () => {
          // When the user selects a place, we can replace the keyword without request data from API
          // by setting the second parameter to "false"
          setValue(description, false);
          clearSuggestions();
    
          // Get latitude and longitude via utility functions
          getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            console.log("📍 Coordinates: ", { lat, lng });
            onselect({ lat, lng })
          });
        };
    
      const renderSuggestions = () =>
        data.map((suggestion) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
    
          return (
            <li className={s.listItem} key={place_id} onClick={handleSelect(suggestion)}>
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
          );
        });
    
        useEffect (() =>{
          if(isLoaded){
            init()
          }
         
        }, [isLoaded, init])

    return <>
        <div className={s.container} ref={ref}>
    <input
      type="text"
      // className={s.input_container}
      value={value}
      onChange={handleInput}
      disabled={!ready}
      placeholder="Where are you going?"
    />
    {status === "OK" && <ul className={s.suggestions}>{renderSuggestions()}</ul>}
    {value !=='' && (
      <svg onClick={() => setValue('')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="x-circle" className={s.svgIcon}>
        <rect />
        <circle cx="128" cy="128" r="96" fill="none" stroke="#9c9c9c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></circle>
        <line x1="160" x2="96" y1="96" y2="160" fill="none" stroke="#9c9c9c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="160" x2="96" y1="160" y2="96" fill="none" stroke="#9c9c9c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
      </svg>
    )}
  </div>
  <div>
  
  </div>
      </>
}