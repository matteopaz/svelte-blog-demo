<script>
    import Header from './comp/Header.svelte';
    import Postform from './comp/Postform.svelte';
    import Posts from './comp/Posts.svelte';
</script>

<div id="wrapper">
  <Header class="header" />
  <main>
    <Posts class="left" />
    <Postform class="right" />
  </main>
</div>

<style lang="postcss">
  #wrapper {
    display: flex;
    flex-flow: column nowrap;
    min-height: 100vh;
  }

  .header {
    flex-grow: 0;
  }

  main {
    display: grid;
    grid-template-columns: 1fr calc(30vw);
    grid-template-rows: 100%;
    flex-grow: 1;
  }
  
  .right {
    grid-column: 2 / span 1;
  }

  .left {
    grid-columns: 1 / span 1;
  }
</style>
