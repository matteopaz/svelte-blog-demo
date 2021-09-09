<script>
  import Logo from '../assets/svelte.png';

</script>

<header>
    <nav>
      <img src={Logo} alt="Svelte Logo" />
      <h1>Svelte&nbsp;Blog</h1>
      <ul>
        <li>
          <a>Log in</a>
        </li>
        <li>
          <a>Post </a>
        </li>
      </ul>
    </nav>
</header>

<style lang="postcss">
  header {
   --header-height: clamp(7.5rem, 6.75vw, 10rem);
   background-color: var(--accent);
   box-shadow: 0 0 11px 0 #ff7700b3;
  }

  nav {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 100%;
      height: var(--header-height);
      justify-items: center;
      align-items: center;
      padding: 1.5rem 2.5rem;
      @media (max-width: 800px) {
        display: flex;
        justify-content: space-around;
        padding: 1rem;
      }
  }

  img {
      --side-length: calc( var(--header-height) - 3rem);
      width: var(--side-length);
      height: var(--side-length);
      justify-self: start;
      transition: transform 0.3s ease;
      cursor: pointer;
      &:hover {
        transform: scale(1.15) rotate(9deg);
        transition: transform 0.15s ease;
      }
  }

  h1 {
    text-align: center;
    line-height: 3rem;
    color: white;
    font-family: 'Roboto Mono', sans-serif;
    font-size: calc(0.35 * var(--header-height));
    letter-spacing: 0.33rem;
  }
  
  ul {
    display: flex;
    color: white;
    font-weight: bold;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: 'Roboto Mono', sans-serif;
    @media (max-width: 800px) {
      width: 30vw;
    }
  }

  li {
    cursor: pointer;
    transition: transform 0.05s linear;
    &:hover {
      transform: scale(1.1);
    }
  }
</style>