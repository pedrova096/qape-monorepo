<script lang="ts">
  import type {
    ChangeEventHandler,
    HTMLInputTypeAttribute,
  } from 'svelte/elements';
  let className = '';
  export let id = '';
  export let label: string;
  export let value: string | number = '';
  export let placeholder: string = '';
  export let inputClass = '';
  export let type: HTMLInputTypeAttribute = 'text';
  export let error = false;
  export let helpText = undefined;
  export let onChange: ChangeEventHandler<HTMLInputElement> = null;
  export { className as class };
  id = id || label;

  function useType(node: HTMLInputElement, params: { type: typeof type }) {
    node.type = params.type;

    return {
      update(updateParams: typeof params) {
        node.type = updateParams.type;
      },
    };
  }
</script>

<div class="flex flex-col {className} relative">
  <label
    class="text-xs font-semibold absolute left-4 top-2 text-slate-600 tracking-wide"
    for={id}>{label}</label
  >
  <input
    {id}
    use:useType={{ type }}
    class="text-slate-800 tracking-wide px-4 pt-7 pb-2 rounded-md outline outline-2 -outline-offset-2 mb-1 {inputClass}"
    class:outline-slate-200={!error}
    class:outline-red-400={error}
    bind:value
    on:change={onChange}
    {placeholder}
  />
  {#if helpText !== undefined}
    <span class="text-sm text-slate-600 ml-4" class:!text-red-600={error}
      >{helpText}
    </span>
  {/if}
  <slot />
</div>
