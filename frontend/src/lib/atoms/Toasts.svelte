<script lang="ts">
  import Icon from '@iconify/svelte';
  import { flip } from 'svelte/animate';
  import { fly, scale } from 'svelte/transition';
  import { toasts } from '~/stores/toast';
</script>

<ul class="fixed flex flex-col max-w-sm top-20 z-50 gap-2">
  {#each $toasts as toast (toast.id)}
    <li
      class="flex items-center justify-between p-2 bg-white rounded-md shadow-md shadow-slate-700/10 border border-slate-200"
      in:fly={{ duration: 200 }}
      out:fly={{ x: -100, duration: 200 }}
      animate:flip={{ duration: 200 }}
    >
      {#if toast.type}
        <span class="text-2xl" in:scale={{ duration: 150 }}>
          {#if toast.type === 'error'}
            <Icon icon="fluent:dismiss-circle-12-filled" class="text-red-500" />
          {:else if toast.type === 'success'}
            <Icon
              icon="fluent:checkmark-circle-12-filled"
              class="text-green-500"
            />
          {/if}
        </span>
      {/if}

      <div class="mx-2 min-w-[10rem]">
        <h3 class="text-md font-medium">
          {toast.message}
        </h3>
      </div>
      <button
        on:click={() => toasts.remove(toast.id)}
        class="p-1 rounded-full hover:bg-slate-100 mb-auto"
      >
        <Icon icon="fluent:dismiss-12-regular" class="text-md text-slate-500" />
      </button>
    </li>
  {/each}
</ul>
