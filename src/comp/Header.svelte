<script>
  import Logo from '../assets/svelte.png'
</script>

<header>
    <nav>
      <img src={Logo} alt="Svelte Logo" />
      <h1>Svelte Blog</h1>
    </nav>
</header>

<style lang="postcss">
  header {
   --header-height: clamp(7.5rem, 5.75vw, 10rem);
  }

  nav {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: var(--header-height);
      justify-items: center;
      align-items: center;
      padding: 1.25rem 2.25rem;
  }

  img {
      --side-length: calc( var(--header-height) - 1.5rem);
      width: var(--side-length);
      height: var(--side-length);
      justify-self: start;
  }

</style>