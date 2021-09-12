<script>
  import tag_svg from '../assets/tags.svg';
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
        <div class="horizontal-group">
          <label class="name">
            Post as:
            <input type="text" bind:value={name} />
          </label>
          <details on:click|preventDefault={null}>
            <summary><img src={tag_svg} type="svg" alt="Tags" /></summary>
            <ul class="chips">
              {#each tags as tag}
                <li class="chip">{tag}</li>
              {/each}
            </ul>
          </details>
          <label class="title">
            Post Title:
            <input type="text" bind:value={title} />
          </label>
        </div>
        <label class="body">
          Post Body:
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
      padding: 0 max(3.5rem, 6.5vw);
    }
  }

  h2 {
    color: white;
    font-weight: 300;
    font-size: clamp(1.5rem, calc(var(--scalar-w) * 42), 5.5rem);
    letter-spacing: clamp(0.15rem, 0.35vw, 1rem);
    font-family: "Open Sans Condensed";
    text-align: center;
    margin: max(3.25rem, 3.25vw) 0;
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
    font-weight: 100;
    margin-top: 17.5%;
    color: white;
    transition: opacity 0.5s ease;
    font-family: "Roboto Mono", sans-serif;
    height: 40%;
    justify-content: space-between;
    font-size: clamp(1.5rem, calc(var(--scalar-w) * 16), 2.5rem);
    @media (max-width: 800px) {
      height: 72.5%;
      font-size: 2rem;
      margin-top: 15%;
    }
  }

  textarea,
  input {
    background-color: #5a7e7d;
    border: none;
    border-bottom: 2px solid whitesmoke;
    min-height: 3rem;
    padding: 1rem;
  }

  label {
    text-align: center;
    display: block;
    line-height: 2;
    width: 100%;
  }

  textarea {
    width: 100%;
    height: 16rem;
  }

  @media (max-width: 1100px) {
    .name,
    .title,
    .body {
      text-align: left;
    }
  }

  .horizontal-group {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3.25rem;
    label {
      width: max(5rem, 40%);
    }
    label input {
      width: 100%;
    }
    @media (max-width: 1100px) {
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
  }

  details {
    cursor: pointer;
    width: 11.25%;
    aspect-ratio: 1 / 1;
    summary {
      list-style: none;
      fill: white;
      background-color: var(--accent);
      height: 100%;
      width: 100%;
      padding: 10%;
      display: grid;
      place-items: center;
      border-radius: 0.4rem;
      img {
        fill: white;
        width: 80%;
        height: 80%;
      }
    }
  }

</style>
