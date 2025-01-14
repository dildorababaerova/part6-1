import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    dispatch(filterChange(event.target.value)); // Dispatch the user's input value
  };

  return (
    <div>
      filter
      <input
        type="text"
        name="filter"
        onChange={handleFilterChange} // Call the handler on input change
      />
    </div>
  );
};

export default VisibilityFilter;
