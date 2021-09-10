<script>
  export let formactive = false;
  let show = [false, false];
  $: if(formactive) {
    show[0] = true;
    setTimeout(() => {
      show[1] = true;
    }, 10);
  } else {
    show[1] = false;
    setTimeout(() => {
      show[0] = false;
    }, 400);
  }
</script>

{#if show[0]}
<form class:show={show[1]} >

</form>
{/if}

<style lang="postcss">
  form {
    justify-self: end;
    padding: 2vw;
    background-color: var(--shade);
    grid-column: 2 / span 1;
    height: 100%;
    grid-row: 1 / 1;
    transition: opacity 0.5s ease, width 0.5s ease;
    opacity: 0;
    width: 0;
    @media (max-width: 800px) {
      grid-column: 1 / span 2;
    }
  }

  .show {
    width: 100%;
    opacity: 1;
  }
</style>

