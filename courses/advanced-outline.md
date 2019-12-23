# Advanced Course

## The React Mindset (AKA, the fundamentals course in a nutshell)

Because y'all probably know how React is state-driven, and re-renders when state changes,
let's build something with hooks so you can see how individual hooks work.

### State

Let's say we have a component called Pokemon, where we currently render just a simple
`<div>` with a variable thrown in.

```jsx
function Pokemon() {
  let pokémon = null
  return <div>Hello, {pokémon}!</div>
}
```

If we want to turn that `pokémon` variable into a stateful variable, we use the `useState` hook.

```jsx
function Pokemon() {
  const [pokémon, setPokémon] = useState(null)
  return <div>Hello, {pokémon}!</div>
}
```

You can have as many states as you want in a given component, you just have to call `useState` again.

```jsx
function Pokemon() {
  const [pokémon, setPokémon] = useState(null)
  const [error, setError] = useState(null)
  return <div>Hello, {pokémon}!</div>
}
```

You cannot put `useState` (or any hook call, for that matter) behind a conditional. We'll get to that later!
Let's make something that can change state.

```jsx
function Pokemon() {
  const [pokémon, setPokémon] = useState(null)
  const [error, setError] = useState(null)
  return (
    <div>
      <input onChange={e => setPokémon(e.target.value)} value={inputValue} type="text" />
      Hello, {pokémon}!
    </div>
  )
}
```

Let’s build a quick little Pokémon search with the PokéAPI.

```jsx
function Pokemon() {
  const [pokémon, setPokémon] = useState(null)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/gengar/')
      .then(res => res.json())
      .then(res => {
        setPokémon(res)
      })
  }, [])

  return (
    <div>
      {pokémon ? (
        <>
          <img src={pokémon.sprites.front_default} alt={pokémon.name} />
          <p>Name: {pokémon.name.replace(/^\w/, c => c.toUpperCase())}</p>
          <p>Type: {pokémon.types.map(x => x.type.name).join(', ')}</p>
        </>
      ) : (
        'Loading...'
      )}
    </div>
  )
}
```
