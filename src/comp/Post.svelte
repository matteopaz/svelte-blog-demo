<svelte:options immutable={true} />

<script>
  import Logo from '../assets/svelte.png';
  import { formActive } from './stores.js';
  export let name = "";
  export let title = "";
  export let body = "";
  export let tags = ["Community", "Announcement", "cc"];
  export let date = {};
</script>

<div class="post" class:break={$formActive}>
  <img src={Logo} alt="Svelte logo" />
  <h4>Lorem Ippy</h4>
  <address>{name}</address> 
  <ul>
    {#each tags as tag}
    <li class="tag">{tag}</li>
    {/each}
  </ul>
  <p class:break={$formActive} >
    {body}
  </p>
</div>

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
    padding: clamp(1.75rem, 2.75vw, 3.5rem);
    z-index: -1;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: max(3vw, 5rem) max(4vw, 5rem) 0.3fr;
    grid-auto-rows: min-content;
    place-items: start;
    gap: max(1.5rem, 2vw) 1vw;
    @media (max-width: 1200px) {
      grid-template-rows: max(2.5vw, 4rem) max(2.5vw, 4rem) 0.3fr;
      gap: max(1rem, 1.5vw) 0.75vw;
    }
  }

  img {
      grid-column: 1 / 3;
      grid-row: 1 / 4;
      height: 100%;
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
    padding: 0.33vw 0.75vw;
    background-color: var(--accent);
    border-radius: 1rem;
    font-size: clamp(1rem, calc(var(--scalar-w) * 10), 2rem);
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
    font-size: clamp(1rem, calc(var(--scalar-w) * 14), 2.25rem);
    line-height: 1.35;
    &.break {
      
    }
  }
</style>