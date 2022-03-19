<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  let value = ''
  const setTerm = (term = '') => dispatch('setTerm', { text: term })
</script>

<input type="text" class="" placeholder="Search for a power..." bind:value on:keyup={() => setTerm(value)} />
