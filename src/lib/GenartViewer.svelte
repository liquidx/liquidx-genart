<script lang="js">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let piece;
  export let backLabel;
  const dispatch = createEventDispatcher();

  let parentEl;

  onMount(async () => {
    let props = {};
    console.log(piece);
    const p5_module = await import("p5");
    const p5 = p5_module.default;
    new p5((s) => {
      let { setup, draw } = piece.renderer;
      s.setup = () => setup(s, parentEl);
      s.draw = () => draw(s);
    });
  });
</script>

<div id="geometryControls">
  <a href="#" on:click={() => dispatch("indexDidSelect")}>{backLabel}</a>
</div>
<div id="canvasAndControls">
  <div id="container" bind:this={parentEl} />
  <div id="controls" />
</div>

<style>
  #canvasAndControls {
    display: flex;
    flex-wrap: wrap;
  }

  #container {
    margin-right: 2rem;
    margin-bottom: 2rem;
  }

  #controls {
    margin-left: 0;
  }
</style>
