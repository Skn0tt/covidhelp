import useSWR from "swr";

function Index() {
  const { data: number, mutate, isValidating } = useSWR<number>("/api/randomNumber", k => fetch(k).then(k => k.text()).then(Number));
  return (
    <div>
      Hello World!

      <p>
        Random Number: {number} {isValidating && "..."}
      </p>

      <button
        onClick={() => mutate()}
      >
        Regenerate!
      </button>
    </div>
  );
}

export default Index;