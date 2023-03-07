<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  let className = '';
  export { className as class };
  export let variant: 'fill' | 'outline' | 'basic' = 'basic';
  export let type: HTMLButtonAttributes['type'] = 'button';
  export let onClick: HTMLButtonAttributes['on:click'] = () => {};
</script>

<button
  {type}
  on:click={onClick}
  class:full-fill={variant === 'fill'}
  class:full-outline={variant === 'outline' || variant === 'basic'}
  class:outline-amber-500={variant === 'outline'}
  class:outline-slate-800={variant === 'basic'}
  class="px-4 py-3 rounded-md font-semibold tracking-wide {className}"
>
  <slot />
</button>

<style lang="postcss">
  .full-fill {
    @apply bg-amber-500 text-white shadow-md shadow-amber-200;
  }
  .full-outline {
    @apply outline outline-2 -outline-offset-2;
  }
</style>
