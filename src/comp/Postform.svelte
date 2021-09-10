<script>
  export let formactive = false;
</script>

<form>

</form>

<style lang="postcss">
  form {
    padding: 2vw;
    background-color: var(--shade);
    grid-column: 2 / span 1;
    height: 100%;
    grid-row: 1 / 1;
    @media (max-width: 640px) {
      grid-column: 1 / span 2;
    }
  }
</style>

