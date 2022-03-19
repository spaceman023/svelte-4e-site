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
  let num = 0
  $: results = $apiData
  $: resultsShown = results.filter((i) => i.Name.toLowerCase().includes(term.toLowerCase())).slice(0, 10)
  $: display = getResult(num)
</script>

<main>
  <div class=" valign-wrapper">
    <div class="container">
      <div class="row">
        <div class="col s12">
          <div class="input-field active">
            <Searchbar on:setTerm={(e) => (term = e.detail.text)} />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          {#if resultsShown.length < 100}
            {#each resultsShown as result, i}
              <div on:click={() => setDisplay(result.ID)} class="waves-effect waves-light btn-small result green lighten-1">Import</div>
              {result.Name}
              <br />
            {/each}
          {/if}
        </div>
        <div class="displayPower col s6">
          <div class="card green darken-3">
            <div class="card-content white-text">
              {#await display then display}
                <div class=" row">
                  <p class="displayedPower">{display.Roll20}</p>
                </div>
              {:catch error}
                <p>Please search for a power and click import.</p>
              {/await}
              <div class="row">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a
                  class=" btn-small green lighten-1 waves-effect waves-light"
                  on:click={() => copyText(document.querySelector('.displayedPower').textContent)}
                >
                  Copy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .result {
    margin: 10px;
  }
</style>
