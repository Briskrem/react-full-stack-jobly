import { useState, useEffect } from "react";

function useLocalStorage(key, firstValue = null) {
    console.log(key, 'keyyyyyyyyyyyyyyyy')
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(function setKeyInLocalStorage() {


    if (item === null) {
      localStorage.removeItem(key);
    } else {
        console.log(key, item)
        // localStorage.setItem(key, item.token);
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImIiLCJ
//pc0FkbWluIjpmYWxzZSwiaWF0IjoxNjYxNjk3Mjk4fQ.Fd1FccRQE6-jWqnkuRSXOzV0Rsu90dwbIpP8cnvREkM"

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImIiLCJ
//pc0FkbWluIjpmYWxzZSwiaWF0IjoxNjYxNjk3Mjk4fQ.Fd1FccRQE6-jWqnkuRSXOzV0Rsu90dwbIpP8cnvREkM"
