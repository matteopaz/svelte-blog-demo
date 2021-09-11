<script>
  export let formactive = false;
  let show = [false, false, false, false];//Total render, fade, input render, input fade
  let name = "";
  let title = "";
  let author = "";
  let body = "";
  let tags = ["Foo", "Bar", "Baz"];
  $: if(formactive) {
    show[0] = true;
    setTimeout(() => {
      show[1] = true;
    }, 10);
    setTimeout(() => {
      show[2] = true;
      setTimeout(() => show[3] = true, 1);
    }, 450);
  } else {
    show[1] = false;
    show[2] = false;
    setTimeout(() => {
      show[0] = false;
    }, 400);
  }
</script>

{#if show[0]}
<form class:show={show[1]} >
  {#if show[2]}
  <div class="inputs" class:show={show[3]} >
  <label class="name">
    Post as:
    <input type="text" bind:value={name} />
  </label>
  <details>
    <summary>Tags</summary>
    <ul class="chips">
     {#each tags as tag}
      <li class="chip">{tag}</li>
     {/each}
    </ul>
  </details>
  <label class="header">
    Post Title:
    <input type="text" bind:value={title}>
  </label>
  </div>
  {/if}
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

  .inputs {
    transition: opacity 0.5s ease;
  }
</style>

