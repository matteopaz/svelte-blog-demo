<script>
  import { onMount } from 'svelte';
  import { formActive, posts, filter } from "./stores.js";
  import Post from "./Post.svelte";
  let fullWidth = "";
  let breaker = false;
  let width = window.innerWidth;
  let Posts = [];
  

  $: if (!$formActive) {
    fullWidth = "grid-column: 1 / span 2";
    breaker = false;
  } else {
    fullWidth = "";
    breaker = true;
  }

  let splitPosts = {
    threeCol: {
      one: [],
      two: [],
      three: [],
    },
    twoCol: {
      one: [],
      two: [],
    },
  };

  function sort(Posts) {
    const l = Posts.length;
    if (l % 3 === 0) {
      splitPosts.threeCol.one = Posts.slice(0, l / 3);
      splitPosts.threeCol.two = Posts.slice(l / 3, (2 * l) / 3);
      splitPosts.threeCol.three = Posts.slice((2 * l) / 3, l);
    } else if (l % 3 === 1) {
      splitPosts.threeCol.one = Posts.slice(0, (l - 1) / 3);
      splitPosts.threeCol.two = Posts.slice((l - 1) / 3, (2 * (l - 1)) / 3);
      splitPosts.threeCol.three = Posts.slice((2 * (l - 1)) / 3, l);
    } else if (l % 3 === 2) {
      splitPosts.threeCol.one = Posts.slice(0, (l - 2) / 3);
      splitPosts.threeCol.two = Posts.slice((l - 2) / 3, Math.ceil(2 * (l - 1) / 3));
      splitPosts.threeCol.three = Posts.slice(Math.ceil(2 * (l - 1) / 3) , l);
    }
    if (l % 2 === 0) {
      splitPosts.twoCol.one = Posts.slice(0, l / 2);
      splitPosts.twoCol.two = Posts.slice(l / 2, l);
    } else if (l % 2 === 1) {
      splitPosts.twoCol.one = Posts.slice(0, (l - 1) / 2);
      splitPosts.twoCol.two = Posts.slice((l - 1) / 2, l);
    }
  }

  $:  {
    Posts = $posts;
    sort(Posts);
  }

  function postFiltered() {
    return null;
  }
</script>

<svelte:window on:resize={() => (width = window.innerWidth)} />

<article style={fullWidth} class:breaker>
  {#if width > 1000}
    <div class="one">
      {#each splitPosts.threeCol.one as props (props.id)}
      <Post {...props} on:filtered={postFiltered} />
      {/each}
    </div>
    <div class="two">
      {#each splitPosts.threeCol.two as props (props.id)}
      <Post {...props} on:filtered={postFiltered} />
      {/each}
    </div>
    <div class="three">
      {#each splitPosts.threeCol.three as props (props.id)}
      <Post {...props} on:filtered={postFiltered} />
      {/each}
    </div>
  {:else}
    <div class="one">
      {#each splitPosts.threeCol.one as props (props.id)}
      <Post {...props} on:filtered={postFiltered} />
      {/each}
    </div>
    <div class="two">
      {#each splitPosts.threeCol.two as props (props.id)}
      <Post {...props} on:filtered={postFiltered} />
      {/each}
    </div>
  {/if}
</article>

<style lang="postcss">
  article {
    width: 100%;
    --spacing: calc(var(--scalar-w) * 26);
    grid-column: 1 / span 1;
    grid-rows: 1 / 2;
    display: grid;
    grid-template-columns: 0.1px repeat(3, 1fr) 0.1px;
    grid-gap: var(--spacing);
    @media (max-width: 1000px) {
      grid-gap: calc(1.2 * var(--spacing));
      grid-template-columns: 0.001px 1fr 1fr 0.001px;
    }
  }

  .breaker {
    @media (max-width: 800px) {
      grid-row: 2 / 3;
      grid-column: 1 / 3;
    }
  }

  div {
    width: initial;
    padding: var(--spacing) 0;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    @media (max-width: 1200px) {
      padding: calc(1.2 * var(--spacing)) 0;
    }
  }

  .one {
    grid-column: 2 / span 1;
  }

  .two {
    grid-column: 3 / span 1;
  }

  .three {
    grid-column: 4 / span 1;
  }
</style>
