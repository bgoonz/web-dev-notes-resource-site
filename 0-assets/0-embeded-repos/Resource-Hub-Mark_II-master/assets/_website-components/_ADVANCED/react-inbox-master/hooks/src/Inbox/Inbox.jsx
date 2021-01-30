import React, { useEffect, useReducer } from "react";

const initialState = {
  mails: [],
  uiState:"",
  error:{},
};

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_FIELDS":
      return {
        ...state,
        ...action.payload,
      }
    default:

      return state;
  }
};

const Inbox = () => {
  const [state, dispatch] = useReducer(reducer,initialState)

  useEffect(() => {
    if (state.uiState !== "") {
      return;
    }

    fetch("http://jsonplaceholder.typicode.com/posts")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then(mails => {
        dispatch({ 
          type: "UPDATE_FIELDS", 
          payload: {
            uiState: "SUCCESS",
            mails: mails,
          }
        });
      }).catch(err => {
        dispatch({ 
          type: "UPDATE_FIELDS", 
          payload: {
            uiState: "FAILURE",
            error: err,
          }
        });
      })
  }, [state.uiState]);

  if (state.uiState === "") {
    return <div>Loading...</div>
  }
  if (state.uiState === "FAILURE") {
    return <div>{state.error.message}</div>
  }


  if (state.uiState === "SUCCESS") {
    return (
      <ul>
        {state.mails.map(mail => <li>{mail.title}</li>)}
      </ul>
    )
  }

  return <div>Inbox</div>;
};

export default Inbox;
