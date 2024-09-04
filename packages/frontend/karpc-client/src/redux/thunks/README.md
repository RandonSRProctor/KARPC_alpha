Code snippet of how this was implemented:

```tsx
function App() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectConversation);

  useEffect(() => {
    fetchAllMessages()
      .then((response) => response.json())
      .then((messages) => dispatch(replaceConversation(messages)));
  }, [dispatch]);

  return <></>;
}
```

Notice that while the above implementation worked, it was error prone:

- What if the user performs an second action that renders first invalid before it returns?
- What if there is an error?
  In addition to poor user experience, the blending of view and async(model)
  logic is getting too tightly-coupled.

Notes on asyncronus patterns:

For thorough learning, I am trying to cycle through methods of
asnc data from worst to best (or at least most modern)

1.  Directly in component with fetch inside of useEffect
2.  Using a manually created thunk funciton
3.  Using a Redux Tool Kit (RTK) thunk creator function
4.  Using an async management tool (Likely RTKQuery, but analogous to React Query)
