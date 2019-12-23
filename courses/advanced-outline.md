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

So, whenever you call `setPokémon`, it changes the `pokémon` state variable.

Remember that React is declarative, not imperative. If you were to do this with jQuery,
for example, you'd have to select the element(s) you're updating, capture the event,
and then update the innerHTML of whatever you're listening to. This is particularly
evident when you're thinking about something like a heater. React is like a modern
wall thermometer where you say, "be 72 degrees" and your heater adjusts accordingly
to stay 72. jQuery (and several others) are imperative, like a portable heater where
you have to manually adjust heat up and down as needed. We don't care as developers how
we get to a certain point, we just want to _declare_ a state that we want, and see the
updates that we expect.

### Effects

Now what if you wanted to populate this with real data? Let’s build a quick little
Pokémon search with the PokéAPI.

The `useEffect()` hook is for making side effects.

Here's an example of a side effect:

```js
let z = 10

let add = (x, y) => {
  z = x + 10 // this is the side effect
  return x + y
}
```

When you want something to happen that doesn't affect whether or not the component gets rendered or not, you just want something to happen, you use `useEffect`.

The two parameters are a function and a dependency array. The return value of the function is a "cleaup function" which is something that runs when the component
is unmounted, or when state changes.

```jsx
function Pokemon() {
  const [pokémon, setPokémon] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Saying hello to ' + pokémon
  }, [pokémon])

  return (
    <div>
      <input onChange={e => setPokémon(e.target.value)} value={inputValue} type="text" />
      Hello, {pokémon}!
    </div>
  )
}
```

The contents of the dependency array are state-related: variables/functions that are
state, use state, or change state. In this case, we're making sure that the document
title is staying in sync with the `pokémon` state variable.

Now, let's call the PokéAPI in `useEffect`:

```jsx
function Pokemon() {
  const [pokémon, setPokémon] = useState('pikachu')
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Saying hello to ' + pokémon
  }, [pokémon])

  useEffect(() => {
    let isCurrent = true
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokémon}/`)
      .then(res => res.json())
      .then(res => {
        if (isCurrent) setPokémon(res.name.replace(/^\w/, c => c.toUpperCase())) // capitalizing name
      })
      .catch(error => {
        setError(error)
      })
    return () => {
      isCurrent = false
    }
  }, [pokémon])

  return (
    <div>
      <input onChange={e => setPokémon(e.target.value)} value={inputValue} type="text" />
      Hello, {pokémon}!
    </div>
  )
}
```

So this is how a component uses state, effects, and responds to updates. You can scoot out different parts
of the components into separate ones, and we'll be talking a lot more about that.

## Phony React

blah
