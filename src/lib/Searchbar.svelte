<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  let value = ''
  const setTerm = (term = '') => dispatch('setTerm', { text: term })
</script>

<input type="text" bind:value on:keyup={() => setTerm(value)} />
