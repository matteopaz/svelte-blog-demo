<script>
  import { onMount } from 'svelte';
  import Post from './Post.svelte';
  export let postsfullw = true;
  let fullWidth = "";
  let breaker = false;
  let width = window.innerWidth;
  import { formActive } from './stores.js';
  $: if(!$formActive) {
   fullWidth = "grid-column: 1 / span 2"
   breaker = false;
  } else {
   fullWidth = "";
   breaker = true;
  }
  onMount(async () => {
   
  });
</script>

<svelte:window on:resize={() => width = window.innerWidth} />

<article style={fullWidth} class:breaker>
{#if width > 1000}
 <div class="one">
  <Post title="Lorem Ipsum" name="Dolor Sit Amet" body="Die nachstehende Tabelle zeigt die Mindestkapitalerhaltungsquoten, die Banken" />
 </div>
 <div class="two">
  <Post title="Lorem Ipsum" name="Dolor Sit Amet" body=" isudnfguisa nfuisnfuid saiufn saiufndsauifn sdiafnsdai nfiusadnfiusdn fuisan fidns nfduisfn isudfuisdf iusa nfiudsainuifsdnaiuf ndsaiu fiDie nachstehende Tabelle zeigt die Mindestkapitalerhaltungsquoten, die Banken" />
 </div>
 <div class="three">
  <Post title="Lorem Ipsum" name="Dolor Sit Amet" body="Die nachstehende Tabelle zeigt die Mindestkapitalerhaltungsquoten, die Banken" />
 </div>
{:else}
  <div class="one">
  <Post title="Lorem Ipsum" name="Dolor Sit Amet" body="Die nachstehende Tabelle zeigt die Mindestkapitalerhaltungsquoten, die Banken" />
 </div>
 <div class="two">
  <Post title="Lorem Ipsum" name="Dolor Sit Amet" body="ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds ijasgnnnnnnnnnnnnnnnndiunds sgn iugndsuia gndiusa ngiudsan giusan giudsnagiu dsanuignsdauig dsauignsdaiugd ndsaiugnidusag Die nachstehende Tabelle zeigt die Mindestkapitalerhaltungsquoten, die Banken" />
 </div>
{/if}
</article>
<style lang="postcss">
 article {
   --spacing: calc(var(--scalar-w) * 26);
   grid-column: 1 / span 1;
   grid-row: 1 / 1;
   display: grid;
   grid-template-columns: 0.1px repeat(3, 1fr) 0.1px;
   grid-gap: var(--spacing);
   @media (max-width: 1000px) {
     grid-gap: calc( 1.2 * var(--spacing) );
     grid-template-columns: 0.001px 1fr 1fr 0.001px;
   }
 }

 .breaker {
  @media (max-width: 800px) {
     grid-row: 2 / 2;
     grid-column: 1 / 3;
   }
 }

 div {
   width: initial;
   padding: var(--spacing) 0;
   display: flex;
   flex-flow: column nowrap;
   justify-content: space-between;
   align-items: stretch;
   @media (max-width: 1200px) {
     padding: calc(1.2 * var(--spacing)) 0;
   }
 }

 .one {
   grid-column: 2 / span 1;
 }

 .two {
   grid-column: 3 / span 1;
 }

 .three {
   grid-column: 4 / span 1;
 }
</style>