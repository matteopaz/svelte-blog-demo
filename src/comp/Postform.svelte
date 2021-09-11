<script>
  export let formactive = false;
  let show = [false, false, false, false]; //Total render, fade, input render, input fade
  let name = "";
  let title = "";
  let author = "";
  let body = "";
  let tags = ["Foo", "Bar", "Baz"];
  $: if (formactive) {
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
</script>

{#if show[0]}
  <form class:show={show[1]}>
    {#if show[2]}
      <h2>Make a Post</h2>
      <div class="inputs" class:show={show[3]}>
        <!-- <details on:click|preventDefault={null}>
          <summary>Tags</summary>
          <ul class="chips">
            {#each tags as tag}
              <li class="chip">{tag}</li>
            {/each}
          </ul>
        </details> -->
        <div class="horizontal-group">
          <label class="name">
            Post as: 
            <input type="text" bind:value={name} />
          </label>
          <label class="title">
            Post Title: 
            <input type="text" bind:value={title} />
          </label>
        </div>
        <label class="body">
          What do you have to say?: 
          <textarea type="text" bind:value={body} />
        </label>
      </div>
    {/if}
  </form>
{/if}

<style lang="postcss">
  form {
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
      padding: 0 max(2rem, 5vw);
    }
  }

  h2 {
    color: white;
    font-weight: 300;
    font-size: clamp(1.5rem, calc(var(--scalar-w) * 42), 5.5rem);
    letter-spacing: clamp(0.15rem, 0.35vw, 1rem);
    font-family: "Open Sans Condensed";
    text-align: center;
    margin: 3.25rem 0;
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
    font-weight: 300;
    margin-top: 15%;
    color: white;
    transition: opacity 0.5s ease;
    font-family: "Roboto Mono", sans-serif;
    height: 33.3%;
    justify-content: space-between;
    font-size: calc(var(--scalar-w) * 14);
    @media (max-width: 800px) {
      height: 80%;
      font-size: 2.25rem;
      margin-top: 0;
    }
  }

  textarea, input {
    background-color: #5a7e7d;
    border: none;
    border-bottom: 2px solid whitesmoke;
    min-height: 3rem;
    padding: 1rem;
  }

  label {
    line-height: 2;
    text-align: center;
  }

  textarea {
    width: 100%;
    height: 10rem;
  }



  .horizontal-group {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3.25rem;
    @media (max-width: 1100px) {
      text-align: left;
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
    label {
      width: max(5rem, 40%);
    }
    label input {
      width: 100%;
    }
  }

</style>
