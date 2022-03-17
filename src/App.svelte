<script>
  import { onMount } from 'svelte'
  import { apiData } from './store.js'
  import Searchbar from './lib/Searchbar.svelte'
  const apiLink = 'https://api.marchingwest.com/content/power'
  onMount(async () => {
    fetch(`${apiLink}/indexes`)
      .then((response) => response.json())
      .then((data) => {
        apiData.set(data)
      })
      .catch((error) => {
        console.log(error)
        return []
      })
  })
  const getResult = async (num = 0) => {
    const res = await fetch(`${apiLink}/${num}`)
    const text = await res.json()
    return text
  }
  const setDisplay = (id = 0) => (num = id)
  const copyText = (v = '') => navigator.clipboard.writeText(v)
  let term = ''
  let num = 172
  $: results = $apiData
  $: resultsShown = results.filter((i) => i.Name.toLowerCase().includes(term.toLowerCase()))
  $: display = getResult(num)
</script>

<main>
  <Searchbar on:setTerm={(e) => (term = e.detail.text)} />
  <div class="container">
    <div class="searchResults">
      {#if resultsShown.length < 100}
        {#each resultsShown as result, i}
          <p>
            <button on:click={() => setDisplay(result.ID)}>Import</button>
            {result.Name}
          </p>
        {/each}
      {/if}
    </div>
    <div class="displayPower">
      {#await display then display}
        <p>{display.Roll20}</p>
        <button on:click={() => copyText(display.Roll20)}>Copy</button>
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
    </div>
  </div>
</main>

<style>
  .container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    height: 500px;
  }

  .searchResults {
    width: 25%;
    height: 100%;
    overflow: scroll;
  }

  .displayPower {
    width: 50%;
    height: 50%;
  }
</style>
