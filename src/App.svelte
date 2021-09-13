<script>
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
  import Header from "./comp/Header.svelte";
  import Postform from "./comp/Postform.svelte";
  import Posts from "./comp/Posts.svelte";
  import { posts } from './comp/stores.js';
  onMount(async () => {
    if(localStorage.getItem('posts')) {
      const localPosts = await JSON.parse(localStorage.getItem('posts'));
      posts.set(localPosts);

    } else {
      const fetcher = await fetch("https://jsonplaceholder.typicode.com/posts");
      const json = await fetcher.json();
      posts.set(json.splice(1, 10));
      const nowPosts = await JSON.stringify(get(posts));
      localStorage.setItem('posts', nowPosts);
    }
  });
</script>

<div id="wrapper">
  <Header />
  <main>
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
    display: grid;
    grid-template-columns: calc(70vw - 8.5px) calc(30vw - 8.5px);
    grid-template-rows: 100% 1fr;
    flex-grow: 1;
    flex-basis: 90vh;
  }
</style>
