<script>
  import { capitalizeFirstLetter } from "./functions";
  import tag_svg from "../assets/tags.svg";
  import svelte_svg from "../assets/svelte.svg";
  import { formActive, posts, filter } from "./stores";
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let show = [false, false, false, false]; //Total render, fade, input render, input fade
  let name = "";
  let title = "";
  let author = "";
  let body = "";
  let width = window.innerWidth;
  let selectedTags = [];
  const tags = "Coding Community Announcement Event Funny Comedy Svelte Framework JS HTML CSS Backend Discussion Question Advice Story".split(" ");

  $: if ($formActive) {
    show[0] = true;
    setTimeout(() => {
      show[1] = true;
    }, 10);
    setTimeout(() => {
      show[2] = true;
      setTimeout(() => (show[3] = true), 1);
    }, 450);
  } else {
    show[1] = false;
    show[2] = false;
    setTimeout(() => {
      show[0] = false;
    }, 400);
  }

  function addTag(key) { 
    return function inner() {
      if(selectedTags.find(e => e === key)) { // If it finds the key, it removes it
      selectedTags.splice(selectedTags.indexOf(key), 1);
      selectedTags = selectedTags; // Self assigning to make svelte react
      } else if(selectedTags.length < 3) {
       selectedTags = [...selectedTags, key];
      }
    }
  }

  $: isSelected = (key, selected_Tags) => {
    const selectedTags = selected_Tags;
    if(selectedTags.find(e => e === key)) return true;
    return false;
  }

  function addFilter(tag) {
    return function inner() {
      let Filter = $filter;
      if(isSelected(tag, Filter)) {
        Filter.splice(Filter.indexOf(tag), 1);
      } else {
        Filter = [...Filter, tag];
      }
      filter.set(Filter);
    }
  }

  async function handleSubmit() {
    if(name === "" || title === "" || body === "") return null;
    const newPost = {
      userId: capitalizeFirstLetter(name),
      id: $posts.at(0).id - 1,
      title: capitalizeFirstLetter(title),
      body: capitalizeFirstLetter(body),
      tags: selectedTags
    }
    await posts.update((arr) => {
      return [newPost, ...arr];
    });
    localStorage.setItem('posts', JSON.stringify($posts));
  }
</script>

<svelte:window on:resize={() => (width = window.innerWidth)} />

{#if show[0]}
  <form class:show={show[1]} on:submit|preventDefault={handleSubmit}>
    {#if show[2]}
      <h2>Make a Post</h2>
      <div class="inputs" class:show={show[3]}>
        <div class="horizontal-group">
          {#if width > 1100}
            <label class="name">
              <span class="label-text">Post as:</span>
              <input type="text" bind:value={name} />
            </label>
            <details class="tags">
              <summary><img src={tag_svg} type="svg" alt="Tags" /></summary>
              <ul class="chips">
                {#each tags as tag}
                  <button class="chip" class:selected={isSelected(tag, selectedTags)} on:click|preventDefault={addTag(tag)}
                    >{tag}</button
                  >
                {/each}
              </ul>
            </details>
          {:else}
            <div class="keep-horizontal">
              <label class="name">
                <span class="label-text">Post as:</span>
                <input type="text" bind:value={name} />
              </label>
              <details class="tags">
                <summary><img src={tag_svg} type="svg" alt="Tags" /></summary>
                <ul class="chips">
                  {#each tags as tag}
                    <button class="chip" class:selected={isSelected(tag, selectedTags)} on:click|preventDefault={addTag(tag)}
                      >{tag}</button
                    >
                  {/each}
                </ul>
              </details>
            </div>
          {/if}
          <label class="title">
            <span class="label-text">Post Title:</span>
            <input type="text" bind:value={title} />
          </label>
        </div>
        <label class="body">
          <span class="label-text">Post Body:</span>
          <textarea type="text" bind:value={body} />
        </label>
        <input type="submit" class="submit" value="Post it!" />
      </div>
      <details class="tags filter">
      <summary>Filter Posts</summary>
      <ul class="chips">
        {#each tags as tag}
           <button class="chip" class:selected={isSelected(tag, $filter)} 
           on:click|preventDefault={addFilter(tag)}>{tag}</button>
        {/each}
      </ul>
      </details>
      <button on:click={() => { localStorage.clear(); dispatch('refresh', {}); }} class="refresh">Refresh Posts</button>
      <img src={svelte_svg} alt="Svelte Logo" class="background-logo" />
    {/if}
  </form>
{/if}

<style lang="postcss">
  form {
    z-index: 5;
    overflow: hidden;
    padding: 0 calc(var(--scalar-w) * 30);
    justify-self: end;
    background-color: var(--shade);
    grid-column: 2 / span 1;
    height: 100%;
    grid-row: 1 / 1;
    transition: opacity 0.5s ease, width 0.5s ease;
    opacity: 0;
    width: 0;
    @media (max-width: 800px) {
      grid-column: 1 / span 2;
      padding: 0 max(3.5rem, 6.5vw);
      height: max(100vh, 85rem);
    }
  }

  h2 {
    color: white;
    font-weight: 300;
    font-size: clamp(1.5rem, calc(var(--scalar-w) * 42), 5.5rem);
    letter-spacing: clamp(0.15rem, 0.35vw, 1rem);
    font-family: "Open Sans Condensed";
    text-align: center;
    margin: max(3.25rem, 3.25vw) 0;
    @media (max-width: 800px) {
      font-size: max(1.5rem, calc(var(--scalar-w) * 100));
      letter-spacing: max(0.15rem, 2vw);
    }
  }

  .show {
    width: 100%;
    opacity: 1;
  }

  .inputs {
    font-weight: 100;
    margin-top: 17.5%;
    color: white;
    transition: opacity 0.5s ease;
    font-family: "Roboto Mono", sans-serif;
    height: 50rem;
    justify-content: space-between;
    font-size: clamp(1.5rem, calc(var(--scalar-w) * 16), 2.5rem);
    @media (max-width: 800px) {
      height: 72.5%;
      font-size: 2rem;
      margin-top: 15%;
    }
  }

  textarea,
  input {
    background-color: #5a7e7d;
    border: none;
    border-bottom: 2px solid whitesmoke;
    min-height: 3rem;
    padding: 1rem;
    font-size: clamp(0.75rem, 1.5vw, 1.75rem);
  }

  label {
    text-align: center;
    display: block;
    line-height: 2;
    width: 100%;
  }

  textarea {
    width: 100%;
    height: 16rem;
  }

  .submit {
    color: white;
    width: 60%;
    display: block;
    margin: 8% auto 0 auto;
    background-color: var(--accent);
    border-radius: 0;
    border: none;
    padding: 1rem 2rem;
    text-align: center;
    @media (max-width: 800px) {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 1200px) {
    .name,
    .title,
    .body {
      text-align: left;
    }
  }

  .horizontal-group {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3.25rem;
    label {
      width: max(5rem, 40%);
    }
    label input {
      width: 100%;
    }
    @media (max-width: 1200px) {
      align-items: flex-start;
      flex-flow: column nowrap;
      label:nth-child(1) {
        width: max(5rem, 75%);
        margin-bottom: 5%;
      }

      label:nth-child(2) {
        width: 100%;
      }
    }
  }

  details:not(.filter) {
    cursor: pointer;
    width: min(4.5rem, 11.25%);
    aspect-ratio: 1 / 1;
    summary {
      list-style: none;
      fill: white;
      background-color: var(--accent);
      height: 100%;
      width: 100%;
      padding: 12.5%;
      display: grid;
      place-items: center;
      border-radius: 0.4rem;
      img {
        fill: white;
        width: 65%;
        height: 65%;
      }
    }
    @media (max-width: 1200px) {
      width: 17.5%;
    }
    @media (max-width: 800px) {
      aspect-ratio: unset;
      width: 20%;
      height: 3.75rem;
      summary img {
        width: 2.5rem;
      }
    }
  }

  .label-text {
    display: inline-block;
    height: 0rem;
  }

  .keep-horizontal {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
    label.name {
      margin: 0;
    }
  }

  details[open] summary ~ * {
    animation: sweep 0.5s ease-in-out;
  }

  @keyframes sweep {
    0% {
      opacity: 0;
      margin-left: -10px;
    }
    100% {
      opacity: 1;
      margin-left: 0px;
    }
  }

  .chips {
    display: flex;
    flex-flow: row wrap;
    position: absolute;
    background-color: #333333f3;
    backdrop-filter: blur(5px);
    padding: 1.25rem;
    border-radius: 0.5rem;
    max-width: max(40rem, 20vw);
    overflow: hidden;
    transform: translateX(-41.5%);
    @media (max-width: 1200px) and (min-width: 800px) {
      transform: translateX(-75%);
      max-width: unset;
      width: 20rem;
    }
    @media (max-width: 800px) {
      transform: translateX(-41.5%);
      max-width: unset;
      width: 40rem;
    }
  }
  .chip {
    cursor: pointer;
    border: none;
    flex-grow: 1;
    font-family: "Roboto Mono";
    text-align: center;
    letter-spacing: 1%;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: var(--accent);
    border-radius: 1rem;
    font-size: 1.15rem;
    margin: 0.6rem 0.8rem;
    &:hover {
      transition: letter-spacing 0.6s ease;
      letter-spacing: 2%;
      background-color: #ee5500;
    }
  }

  .chip.selected {
    background-color: #d756bb;
  }

  .background-logo {
    display: block;
    width: 150%;
    margin: 37.5% auto 0 auto;
    transform: translateX(-15%);
    @media (max-width: 800px) {
      display: none;
    }
  }

  details.filter {
    cursor: pointer;
    border-radius: 0;
    margin: 0rem auto;
    background-color: var(--accent);
    font-family: 'Roboto Mono';
    font-size: clamp(1.25rem, calc(var(--scalar-w) * 14), 2.25rem);
    color: white;
    padding: max(0.75vw, 1rem) max(1.25vw, 1.5rem);
    text-align: center;
    display: block;
    user-select: none;
    max-width: 90%;
    ul {
      transform: translate(-100%, -50%);
    }
    @media (max-width: 800px) {
      margin: -6rem auto 0 auto;
      ul {
        transform: translate(-32.5%, 10%);
      }
    }
  }

  .refresh {
    background: none;
    border: none;
    border-radius: none;
    display: block;
    margin: 4rem auto;
    font-family: 'Open Sans Condensed';
    letter-spacing: 0.15rem;
    font-size: clamp(1.25rem, calc(var(--scalar-w) * 12), 2.25rem);
    color: white;
    font-weight: 500;
    padding: 1rem;
    &:hover {
      color: var(--accent);
      background-color: #777777bb;
    }
  }
</style>
