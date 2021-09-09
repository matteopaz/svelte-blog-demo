<script>
  
</script>

<article>

 <div class="one">

 </div>
 <div class="two">

 </div>
 <div class="three">

 </div>

</article>


<style lang="postcss">
 article {
   grid-column: 1 / span 1;
   grid-row: 1 / 1;
   display: grid;
   grid-template-columns: 0.1px repeat(3, 1fr) 0.1px;
   grid-row: 1fr;
   grid-gap: clamp(1.5rem, 3.25vw, 6rem);
 }

 div {
   padding: clamp(1.5rem, 3.25vw, 6rem) 0;
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