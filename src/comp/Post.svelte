

<script>
  import Logo from '../assets/svelte.png';
  import { formActive } from './stores.js';
  import { capitalizeFirstLetter } from './functions.js';
  export let userId = 0;
  export let title = "";
  export let body = "";
  export let tags = [];
  export let id;
  function processTitle(title) {
   return capitalizeFirstLetter(title.split(" ").slice(0, 3).join(" "));
  }
  let user = "";
  const r = () => Math.floor(Math.random() * 9);
    if(typeof userId === 'number') {
      switch(r()) {
        case 0: user = "James Jameson";
        break;
        case 1: user = "Monkey Man";
        break;
        case 2: user = "Matteo Paz";
        break;
        case 3: user = "Hermione Granger";
        break;
        case 4: user = "Guest User";
        break;
        case 5: user = "John Sandman";
        break;
        case 6: user = "Aelbuchert Einschtiegn";
        break;
        case 7: user = "Buggs Bunny";
        break;
        case 8: user = "The Unspeakable One";
        break;
      }
      for(let i = 0; i < 3; i++) {
       switch(r()) {
        case 0: tags[i] = "Community";
        break;
        case 1: tags[i] = "Svelte";
        break;
        case 2: tags[i] = "CSS";
        break;
        case 3: tags[i] = "JS";
        break;
        case 4: tags[i] = "Announcement";
        break;
        default: continue;
       }
      }
      tags = tags.filter(e => e != undefined);
      tags = [... new Set(tags)];
      } else {
        user = userId;
      }
</script>

<div class="post" class:break={$formActive}>
  <img src={Logo} alt="Svelte logo" />
  <h4>{processTitle(title)}</h4>
  <address>{capitalizeFirstLetter(user)}</address> 
  <ul>
    {#each tags as tag}
    <li class="tag">{tag}</li>
    {/each}
  </ul>
  <p class:break={$formActive} >
    {capitalizeFirstLetter(body)}
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
    padding: clamp(1.75rem, 3vw, 3.5rem);
    z-index: -1;
    grid-template-columns: 2fr 5fr;
    grid-template-rows: 0.2fr max(4vw, 5rem) 0.35fr;
    grid-auto-rows: min-content;
    place-items: start;
    gap: max(1.5rem, 2vw) 1vw;
    @media (max-width: 1200px) {
      grid-template-rows: 0.15fr max(2.5vw, 4rem) 0.35fr;
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
    font-size: clamp(1rem, calc(var(--scalar-w) * 12), 2rem);
    line-height: 1.35;
    @media (max-width: 1200px) {
      &:not(.break) {
        font-size: clamp(1rem, calc(var(--scalar-w) * 26), 4rem);
      }
    }
  }
</style>