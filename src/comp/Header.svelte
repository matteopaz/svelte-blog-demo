<script>
  import { createEventDispatcher } from 'svelte';
  import Logo from '../assets/svelte.png';
  import { formActive } from './stores.js';

  let loggedIn = false;
  let error = false;
  function handleButton(key) { 
    return function inner() {
      if(key === 'login') {
        loggedIn = true;
      }
      if(key === 'showForm' && loggedIn) {
        formActive.update(bool => !bool);
        error = false;
      } else {
        error = true;
      }
    }
  }
</script>

<header>
    <nav>
      <img src={Logo} alt="Svelte Logo" />
      <h1>Svelte&nbsp;Blog</h1>
      <ul>
        <li>
          <a on:click={handleButton('login')} 
          class:error class:loggedIn>
          Log in
        </a>
        </li>
        <li>
          <a on:click={handleButton('showForm')}>Post </a>
        </li>
      </ul>
    </nav>
</header>

<style lang="postcss">
  @keyframes attention {
    from, to {
      transform: rotate(0) scale(1);
    }
    15% {
      transform: scale(1.15);
    }
    25% {
      transform: rotate(10deg) scale(1.15);
    }
    75% {
      transform: rotate(-10deg) scale(1.15);
    }
    85% {
      transform: scale(1.15);
    }
  }

  header {
   --header-height: clamp(7.25rem, 5.75vw, 8.25rem);
   background-color: var(--accent);
   box-shadow: 0 0 11px 0 #ff7700b3;
   flex-grow: 0;
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

  a {
    user-select: none;
    display: block;
    transition: color 0.4s ease;
  }

  .error {
    color: #a312c7;
    animation: attention 0.5s linear;
  }

  a.loggedIn {
    color: #a2e5b2;
    font-weight: unset;
    animation: unset;
  }

</style>