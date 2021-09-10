<script>
  export let postsfullw = false;
  let fullWidth = "";
  if(true) {
   fullWidth = "grid-column: 1 / span 1"
  }
</script>

<article style={fullWidth}>

 <div class="one">

 </div>
 <div class="two">

 </div>
 <div class="three">

 </div>

</article>


<style lang="postcss">
 article {
   --spacing: clamp(0.75rem, 3vw, 4rem);
   grid-column: 1 / span 1;
   grid-row: 1 / 1;
   display: grid;
   grid-template-columns: 0.1px repeat(3, 1fr) 0.1px;
   grid-gap: var(--spacing);
   @media (max-width: 940px) {
     grid-gap: calc( 1.2 * var(--spacing) );
     grid-template-columns: 0.1px 1fr 1fr 0.1px;
   }

   @media (max-width: 640px) {
     grid-row: 2 / 2;
     grid-column: 1 / 3;
   }
 }

 div {
   border: 2px solid red;
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