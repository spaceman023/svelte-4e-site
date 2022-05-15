<script>
  import { onMount } from 'svelte'
  import { apiData } from './store.js'
  import Searchbar from './lib/Searchbar.svelte'
  const apiLink = 'https://api.marchingwest.com/content/powers'
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

  const copyText = async (v = '') => {
    console.log(v)
    await navigator.clipboard.writeText(v)
  }
  const copyMacro = async (id) => {
    console.log(id)
    const text = await getResult(id)
    console.log(text)
    copyText(JSON.stringify(text))
    // @ts-ignore
    M.toast({ html: `Copied ${text.Name} for FoundryVTT` })
    return null
  }
  const setDisplay = (id = 0) => (num = id)

  let term = ''
  let num = 0
  $: results = $apiData
  $: resultsShown = results.filter((i) => i.name.toLowerCase().includes(term.toLowerCase())).slice(0, 10)
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
        <div class="col s12">
          {#each resultsShown as result, i}
            <div on:click={() => copyMacro(result.index)} class="waves-effect waves-light btn-small result green lighten-1">Copy Foundry</div>
            {result.name}
            <br />
          {/each}
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
