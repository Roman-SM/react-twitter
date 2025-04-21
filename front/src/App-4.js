import { useMemo, useCallback, useEffect, useState } from "react";
import Page from "./component/page";

function Child({ state }) {
  const data = useMemo(() => {
    return state * 10;
  }, [state]);
  return <div>Child {data}</div>;
}

function Child2({ state }) {
  const handleClick = useCallback(() => alert(state), [state]);

  useEffect(() => console.log("new handleClick"), [handleClick]);
  return <div onClick={handleClick}>Child2</div>;
}

function App() {
  const [state, setState] = useState(0);
  const [state2, setState2] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setState((prev) => prev + 1), 1000);
    const id2 = setInterval(() => setState2((prev) => prev + 1), 5000);

    return () => {
      clearInterval(id);
      clearInterval(id2);
    };
  }, []);

  return (
    <Page>
      Hello World {state}
      <Child state={state2} />
      <Child2 state={state2} />
    </Page>
  );
}

export default App;
