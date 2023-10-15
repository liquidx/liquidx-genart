<script lang="js">
  import { createEventDispatcher } from "svelte";
  export let pieces;
  const dispatch = createEventDispatcher();

  const pieceDidSelect = (pieceId) => {
    dispatch("pieceDidSelect", pieceId);
  };
</script>

<div class="">
  {#each pieces as piece}
    <div>
      <a href={`#${piece.id}`} on:click={() => pieceDidSelect(piece.id)}
        >{piece.id}: {piece.name}</a
      >
    </div>
  {/each}
</div>
