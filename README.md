# Task-Fragmentation

My Pick - Fragment the functionality into a custom hook

## My Reasons for Fragmentating it into custom hook

1. By moving the burning logic into a custom hook, I keep the component code focused on the UI and handle the logic into to the hook

2. custom hooks allow us to reuse stateful logic across multiple components. So now I can use this custom hook at multiple components

3. Some time testing a component become very complex when the component include the side effect and state logic that's why i separate the logic into a hook. Now i can test the component in very easy way.
