<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';

  let className = '';
  export let label = '';
  export let labelInactive = '';
  export let id: string;
  export let checked: boolean = true;
  export { className as class };
  export let onChange: ChangeEventHandler<HTMLInputElement> = null;
</script>

<div class="relative flex items-center gap-2 {className}">
  <label for={id}>
    <div
      class="w-8 aspect-square rounded flex p-1 justify-center select-none cursor-pointer"
      class:bg-slate-800={checked}
      class:bg-slate-200={!checked}
    >
      {#if checked}
        <slot name="active" />
      {:else}
        <slot name="inactive" />
      {/if}
    </div>
    <input
      {id}
      type="checkbox"
      class="absolute opacity-0 cursor-pointer h-0 w-0"
      bind:checked
      on:change={onChange}
    />
  </label>
  <span class="text-sm font-medium">
    {#if checked}
      {label}
    {:else}
      {labelInactive}
    {/if}
  </span>
</div>
