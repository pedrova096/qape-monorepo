<script lang="ts">
  export let open: boolean = false;
</script>

{#if open}
  <div
    id="modal"
    class="fixed inset-0 z-20 flex items-center justify-center bg-slate-800/50 backdrop-filter backdrop-blur-md"
  >
    <div class="bg-white rounded-lg shadow-lg p-4">
      <slot />
    </div>
  </div>
{/if}
