<script lang="js">
  import { onMount } from "svelte";
  import GenartIndex from "./GenartIndex.svelte";
  import GenartViewer from "./GenartViewer.svelte";

  import p20180101 from "./pieces/20180101.js";
  import p20180102 from "./pieces/20180102.js";
  import p20180103 from "./pieces/20180103.js";
  import p20180104 from "./pieces/20180104.js";
  import p20180105 from "./pieces/20180105.js";
  import p20180106 from "./pieces/20180106.js";
  import p20180107 from "./pieces/20180107.js";
  import p20180108 from "./pieces/20180108.js";
  import p20180109 from "./pieces/20180109.js";
  import p20180110 from "./pieces/20180110.js";
  import p20180111 from "./pieces/20180111.js";
  import p20180112 from "./pieces/20180112.js";
  import p20180113 from "./pieces/20180113.js";
  import p20180114 from "./pieces/20180114.js";
  import p20180203 from "./pieces/20180203.js";
  import p20180205 from "./pieces/20180205.js";
  import p20180206 from "./pieces/20180206.js";
  import p20180208 from "./pieces/20180208.js";
  import p20180211 from "./pieces/20180211.js";
  import p20180421 from "./pieces/20180421.js";
  import p20180422 from "./pieces/20180422.js";
  import p20180511 from "./pieces/20180511.js";
  import p20180512 from "./pieces/20180512.js";
  import p20180523 from "./pieces/20180523.js";
  import p20180531 from "./pieces/20180531.js";
  import p20180601 from "./pieces/20180601.js";
  import p20180602 from "./pieces/20180602.js";
  import p20180605 from "./pieces/20180605.js";
  import p20180606 from "./pieces/20180606.js";
  import p20180607 from "./pieces/20180607.js";
  import p20180608 from "./pieces/20180608.js";
  import p20180617 from "./pieces/20180617.js";
  import p20180618 from "./pieces/20180618.js";

  const pieces = [
    { id: "20180618", renderer: p20180618, name: "033 Optical Flow 14" },
    { id: "20180617", renderer: p20180617, name: "032 Optical Flow 13" },
    { id: "20180608", renderer: p20180608, name: "031 Optical Flow 12" },
    { id: "20180607", renderer: p20180607, name: "030 Optical Flow 11" },
    { id: "20180606", renderer: p20180606, name: "029 Optical Flow 10" },
    { id: "20180605", renderer: p20180605, name: "028 Optical Flow 9" },
    { id: "20180602", renderer: p20180602, name: "027 Optical Flow 8" },
    { id: "20180601", renderer: p20180601, name: "026 Optical Flow 7" },
    { id: "20180531", renderer: p20180531, name: "025 Optical Flow 6" },
    { id: "20180523", renderer: p20180523, name: "024 Optical Flow 5" },
    { id: "20180512", renderer: p20180512, name: "023 Optical Flow 4" },
    { id: "20180511", renderer: p20180511, name: "022 Optical Flow 3" },
    { id: "20180422", renderer: p20180422, name: "021 Optical Flow 2" },
    { id: "20180421", renderer: p20180421, name: "020 Optical Flow" },
    { id: "20180211", renderer: p20180211, name: "019 Katanas" },
    { id: "20180208", renderer: p20180208, name: "018 Overhead" },
    { id: "20180206", renderer: p20180206, name: "017 Dance like you mean it" },
    { id: "20180205", renderer: p20180205, name: "016 Axel" },
    { id: "20180203", renderer: p20180203, name: "015 Moving Mountains" },
    { id: "20180114", renderer: p20180114, name: "014 Turns" },
    { id: "20180113", renderer: p20180113, name: "013 Runs" },
    { id: "20180112", renderer: p20180112, name: "012 Lift" },
    { id: "20180111", renderer: p20180111, name: "011 Rips" },
    { id: "20180110", renderer: p20180110, name: "010 Weighted" },
    { id: "20180109", renderer: p20180109, name: "009 Weight" },
    { id: "20180108", renderer: p20180108, name: "008 Wings" },
    { id: "20180107", renderer: p20180107, name: "007 Line Compression" },
    { id: "20180106", renderer: p20180106, name: "006 Bubbling" },
    { id: "20180105", renderer: p20180105, name: "005 Triple Rotation" },
    { id: "20180104", renderer: p20180104, name: "004 Eclipse" },
    { id: "20180103", renderer: p20180103, name: "003 Fringe" },
    { id: "20180102", renderer: p20180102, name: "002 Orbits" },
    { id: "20180101", renderer: p20180101, name: "001 Cheat day" },
  ];

  let selectedPieceId = null;
  let selectedPiece = null;
  export let indexLabel = "Genart";

  onMount(() => {
    const hash = window.location.hash;
    const pieceId = hash.replace("#", "");
    if (pieceId) {
      selectedPieceId = pieceId;
      selectedPiece = pieces.find((p) => p.id === selectedPieceId);
    }
  });

  const pieceDidSelect = (e) => {
    selectedPieceId = e.detail;
    selectedPiece = pieces.find((p) => p.id === selectedPieceId);
  };

  const indexDidSelect = () => {
    selectedPieceId = null;
    selectedPiece = null;
  };
</script>

{#if selectedPiece}
  <GenartViewer
    piece={selectedPiece}
    on:indexDidSelect={indexDidSelect}
    backLabel={indexLabel}
  />
{:else}
  <GenartIndex {pieces} on:pieceDidSelect={pieceDidSelect} />
{/if}
