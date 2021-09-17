

<script>
  import Logo from '../assets/svelte.png';
  import { formActive, filter } from './stores.js';
  import { capitalizeFirstLetter } from './functions.js';
  import { createEventDispatcher } from 'svelte';
  export let userId = "";
  export let title = "";
  export let body = "";
  export let tags = [];
  const dispatch = createEventDispatcher();
  function processTitle(title) {
   return capitalizeFirstLetter(title.split(" ").slice(0, 3).join(" "));
  }
  let show = true;

  const filtered = (_filter) => {
    const filters = _filter;
    let i = 0;
    for(i; i < filters.length; i++) {
      const truth = tags.find(tag => tag === filters[i]);
      if(!truth) break;
    }
    if(i === filters.length && filters.length !== 0) dispatch('filtered', {...$$props});
    return (i === filters.length)
  }

  $: show = filtered($filter);
</script>

{#if show}
<div class="post" class:break={$formActive}>
  <img src={Logo} alt="Svelte logo" />
  <h4>{processTitle(title)}</h4>
  <address>{capitalizeFirstLetter(userId)}</address> 
  <ul>
    {#each tags as tag}
    <li class="tag">{tag}</li>
    {/each}
  </ul>
  <p class:break={$formActive} >
    {capitalizeFirstLetter(body)}
  </p>
</div>
{/if}
<style>
  .post {
    position: relative;
    display: grid;
    transition: width 0.4s ease;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    width: 100%;
    margin-bottom: clamp(2rem, 5vw, 7rem);
    background-color: var(--tint);
    border-radius: 1rem;
    padding: clamp(1.75rem, 3vw, 3.5rem);
    z-index: -1;
    grid-template-columns: 2fr 5fr;
    grid-template-rows: 0.2fr max(4vw, 5rem) 0.5fr;
    grid-auto-rows: min-content;
    place-items: start;
    gap: min(1rem, 1.25vw) 1vw;
    @media (max-width: 1200px) {
      grid-template-rows: 0.15fr max(2.5vw, 4rem) 0.5fr;
      gap: max(1rem, 1.5vw) 0.75vw;
    }
  }

  img {
      grid-column: 1 / 3;
      grid-row: 1 / 4;
      height: 80%;
      aspect-ratio: 1 / 1;
      place-self: center;
      z-index: 0;
      opacity: 0.125;
      filter: blur(4px);
  }

  h4 {
      font-weight: 300;
      margin-top: 0;
      margin-bottom: 1rem;
      font-family: 'Open Sans Condensed';
      grid-column: 1 / 3;
      grid-row: 1 / 2;
      font-size: clamp(2.5rem, calc(var(--scalar-w) * 38), 6rem);
      letter-spacing: 0.2vw;
      text-align: center;
  }

  ul {
    color: white;
    gap: 0.5vw 1.25vw;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    grid-column: 2 / 3;
    grid-row: 2 / 3;

    li {
    border: none;
    flex-grow: 1;
    flex-shrink: 1;
    font-family: "Roboto Mono";
    text-align: center;
    letter-spacing: 1%;
    display: block;
    padding: 0.25vw 0.5vw;
    background-color: var(--accent);
    border-radius: 1rem;
    font-size: clamp(1rem, calc(var(--scalar-w) * 8), 2rem);
    } 
  }
  
 address {
   place-self: start;
    font-family: 'Bitter';
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    font-size: clamp(1.25rem, calc(var(--scalar-w) * 16), 2.25rem);
  }

  p {
    overflow-wrap: anywhere;
    font-family: 'Bitter';
    place-self: start;
    grid-row: 3 / 4;
    grid-column: 1 / 3;
    font-size: clamp(1rem, calc(var(--scalar-w) * 16), 2.5rem);
    line-height: 1.35;
    @media (max-width: 1000px) {
      &:not(.break) {
        font-size: clamp(1rem, calc(var(--scalar-w) * 26), 4rem);
      }
    }
  }
</style>