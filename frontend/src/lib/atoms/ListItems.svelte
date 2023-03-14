<script lang="ts">
  import type { ItemResponse } from '~/services/item.services';
  import Icon from '@iconify/svelte';
  import { Link } from 'svelte-navigator';
  import ItemImage from './ItemImage.svelte';

  export let items: ItemResponse[] = [];
</script>

<ul class="w-full grid grid-cols-2 gap-5 items-start">
  {#if items.length}
    {#each items as { id, brand, model, description, price, isNew, hasLeft, hasRight, hasCharger } (id)}
      <li
        class="bg-white rounded-md shadow-md shadow-slate-700/5 border border-slate-200 hover:shadow-slate-700/10 cursor-pointer"
      >
        <Link
          class="grid p-2 grid-flow-col grid-rows-3 auto-cols-[auto_1fr] gap-x-2 relative"
          to="/items/{id}"
        >
          <ItemImage {hasLeft} {hasRight} {hasCharger} />
          <div>
            <span class="font-semibold">{brand}</span>
            <span class="text-xs bg-slate-200 text-slate-600 px-1 rounded">
              {model}
            </span>
          </div>
          <p class="text-slate-600">{description}</p>
          <span
            class="bg-emerald-500  place-self-start text-white px-1 rounded"
          >
            {new Intl.NumberFormat('es-PY', {
              style: 'currency',
              currency: 'PYG',
            }).format(price)}
          </span>
          <div>
            {#if isNew}
              <span
                class="text-xs text-slate-200 bg-slate-800 px-2 absolute top-0 right-2 rounded-b"
              >
                Nuevo
              </span>
            {/if}
          </div>
        </Link>
      </li>
    {/each}
  {:else}
    <li class="text-center w-full col-span-2">
      <span class="text-slate-500 text-lg">
        No hay items <Icon icon="fluent:border-none-20-filled" class="inline" />
      </span>
    </li>
  {/if}
</ul>
