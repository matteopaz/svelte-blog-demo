<script>
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
  import Header from "./comp/Header.svelte";
  import Postform from "./comp/Postform.svelte";
  import Posts from "./comp/Posts.svelte";
  import { posts, formActive, log } from './comp/stores.js';
  import { randomizeNameAndTags } from './comp/functions.js'
  
  onMount(async () => {
    if(localStorage.getItem('posts')) {
      const localPosts = await JSON.parse(localStorage.getItem('posts'));
      posts.set(localPosts);
    } else {
      const fetcher = await fetch("https://jsonplaceholder.typicode.com/posts");
      let json = await fetcher.json();
      json = json.slice(1, 10);
      json.forEach(e => {
        const rand = randomizeNameAndTags();
        e.userId = rand[0];
        e.tags = rand[1];
      });
      posts.set(json);
      const nowPosts = await JSON.stringify(get(posts));
      localStorage.setItem('posts', nowPosts);
    }
  });
</script>

<div id="wrapper">
  {$log}
  <Header />
  <main class:break={$formActive} >
    <Posts />
    <Postform />
  </main>
</div>

<style lang="postcss">
  #wrapper {
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
  }
  main {
    grid-gap: 0;
    display: grid;
    grid-template-columns: calc(70vw - 8.5px) calc(30vw - 8.5px);
    grid-template-rows: 100% 1fr;
    flex-grow: 1;
    flex-basis: 90vh;
    @media (max-width: 800px) {
      &.break {
        grid-template-rows: max(100vh, 85rem) 1fr;
      }
    }
  }
</style>
