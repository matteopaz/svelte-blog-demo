<script>
    import Header from './comp/Header.svelte';
    import Postform from './comp/Postform.svelte';
    import Posts from './comp/Posts.svelte';
    let formactive = false;
    let loggedIn = false; // TODO: Move formactive and loggedIn to a store
    function handleShow() {
      if(loggedIn) formactive = !formactive;
    }
</script>

<div id="wrapper">
  <Header on:login={() => loggedIn=true} on:showForm={handleShow} />
  <main>
    <Posts postsfullw={!formactive} />
    <Postform {formactive} />
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
    grid-template-columns: 1fr 30vw;
    grid-template-rows: 100% 1fr;
    flex-grow: 1;
    flex-basis: 90vh;
  }
</style>
