import { useEffect, useState, useCallback } from "react"

interface iTestResponse {
  status: string | null
}

export default function useTestResponse() {
  const [response, setResponse] = useState<iTestResponse>({ status: null});
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = useCallback(() => {
    setRefetchIndex(prev => prev + 1 );
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/health').then(res => {
      return res.json();
    }).then(data => {
      if(data) {
        return setResponse(data);
      }
      return
    }).catch((error) => {
      console.error("Error with test request", error);
    });
  }, [refetchIndex]);

  return { response , refetch };
}