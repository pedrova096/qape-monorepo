<script lang="ts">
  import { getItemById } from '~/services/item.services';
  import { useApiCall } from '~/stores/useApiCall';
  import ItemImage from '~/lib/atoms/ItemImage.svelte';
  import ItemChecks from '~/lib/molecules/ItemChecks.svelte';

  export let id: string;

  const { data: item, flags } = useApiCall(() => getItemById(id));
</script>

<div class="w-full flex justify-center overflow-hidden relative bg-slate-100">
  <main class="container flex h-screen items-center justify-center">
    <article
      class="bg-white p-4 rounded-md shadow-md shadow-slate-700/5 flex gap-2 flex-col min-w-[32rem]"
      class:skeleton={$flags.isLoading}
    >
      {#if $item}
        <div>
          <span class="font-semibold">{$item.brand}</span>
          <span class="text-xs bg-slate-200 text-slate-600 px-1 rounded">
            {$item.model}
          </span>
        </div>
        <ItemImage
          hasLeft={$item.hasLeft}
          hasRight={$item.hasRight}
          hasCharger={$item.hasCharger}
        />
        <p class="text-slate-600">{$item.description}</p>

        {#if $item.isNew}
          <span class="text-xs text-slate-200 bg-slate-800 px-2 rounded-b">
            Es nuevo
          </span>
        {/if}

        <div class="pointer-events-none flex gap-2 flex-col">
          <ItemChecks
            hasLeft={$item.hasLeft}
            hasRight={$item.hasRight}
            hasCharger={$item.hasCharger}
          />
        </div>
      {:else}
        <!--Skeleton-->
        <div class="h-4 bg-slate-200 rounded-sm" />
        <div class="bg-slate-200 w-24 aspect-square rounded-md" />
        <div class="h-4 bg-slate-200 rounded-sm" />
        <div class="h-4 bg-slate-200 rounded-sm w-24" />
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-slate-200 rounded" />
          <div class="h-4 bg-slate-200 rounded-sm flex-1" />
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-slate-200 rounded" />
          <div class="h-4 bg-slate-200 rounded-sm flex-1" />
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-square bg-slate-200 rounded" />
          <div class="h-4 bg-slate-200 rounded-sm flex-1" />
        </div>
      {/if}
    </article>
  </main>
</div>

<style lang="postcss">
  .skeleton > div {
    @apply animate-pulse;
  }
</style>
