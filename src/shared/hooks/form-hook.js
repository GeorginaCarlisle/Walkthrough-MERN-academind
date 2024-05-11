import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      // Looping through all inputs held in state - see useReducer statement further down
      for (const inputId in state.inputs) {
        // Check if the input being looped through is the same as the input that has been changed and has triggered this function
        if (inputId === action.inputId) {
          //update formisvalid status based on whether the new input is valid AND nothing has changed form is valid to false
          formIsValid = formIsValid && action.isValid;
        } else {
          //update formisvalid status based on whether stored input is valid AND nothing has changed form is valid to false
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      }
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  // This handles the validity of the full form
  const [formState, dispatch] = useReducer(formReducer, {
    // in here we set the initial state
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  // Need to spend sometime getting to properly understand useCallback and why it is needed to prevent infinite loops
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  return [formState, inputHandler, setFormData];
};