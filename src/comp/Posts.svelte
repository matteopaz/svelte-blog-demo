<script>
  export let postsfullw = true;
  let fullWidth = "";
  let breaker = false;
  $: if(postsfullw) {
   fullWidth = "grid-column: 1 / span 2"
   breaker = false;
  } else {
   fullWidth = "";
   breaker = true;
  }
</script>

<article style={fullWidth} class:breaker >

 <div class="one">

 </div>
 <div class="two">

 </div>
 <div class="three">

 </div>

</article>


<style lang="postcss">
 article {
   --spacing: calc(var(--scalar-w) * 50);
   grid-column: 1 / span 1;
   grid-row: 1 / 1;
   display: grid;
   grid-template-columns: 0.1px repeat(3, 1fr) 0.1px;
   grid-gap: var(--spacing);
   @media (max-width: 1100px) {
     grid-gap: calc( 1.2 * var(--spacing) );
     grid-template-columns: 0.1px 1fr 1fr 0.1px;
   }
 }

 .breaker {
  @media (max-width: 800px) {
     grid-row: 2 / 2;
     grid-column: 1 / 3;
   }
 }

 div {
   padding: var(--spacing) 0;
   @media (max-width: 940px) {
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