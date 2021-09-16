<script>
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
  import Header from "./comp/Header.svelte";
  import Postform from "./comp/Postform.svelte";
  import Posts from "./comp/Posts.svelte";
  import { posts, formActive } from './comp/stores.js';
  import { randomizeNameAndTags } from './comp/functions.js'
  
  async function GetAndRandomizePosts() {
    const rand = Math.floor(Math.random() * 90);
    if(localStorage.getItem('posts')) {
      const localPosts = await JSON.parse(localStorage.getItem('posts'));
      posts.set(localPosts);
    } else {
      const fetcher = await fetch("https://jsonplaceholder.typicode.com/posts");
      let json = await fetcher.json();
      json = json.slice(rand, rand + 9);
      json.forEach(e => {
        const rand = randomizeNameAndTags();
        e.userId = rand[0];
        e.tags = rand[1];
      });
      posts.set(json);
      const nowPosts = await JSON.stringify(get(posts));
      localStorage.setItem('posts', nowPosts);
    }
  }
  onMount(GetAndRandomizePosts);
</script>

<div id="wrapper">
  <Header />
  <main class:break={$formActive} >
    <Posts />
    <Postform on:refresh={GetAndRandomizePosts} />
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
        grid-template-rows: max(100vh, 95rem) 1fr;
      }
    }
  }
</style>
