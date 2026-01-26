<script lang="ts">
  let count = $state(0);

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }
</script>

<div>
  <h2>Counter: {count}</h2>
  <button onclick={increment}>Increment</button>
  <button onclick={decrement}>Decrement</button>
</div>
