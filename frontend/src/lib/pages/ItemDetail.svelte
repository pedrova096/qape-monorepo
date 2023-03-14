<script lang="ts">
  import { buyItem, getItemById } from '~/services/item.services';
  import { useApiCall } from '~/stores/useApiCall';
  import { authStore } from '~/stores/auth.store';
  import ItemImage from '~/lib/atoms/ItemImage.svelte';
  import ItemChecks from '~/lib/molecules/ItemChecks.svelte';
  import Button from '~/lib/atoms/Button.svelte';
  import toast from '~/stores/toast';
  import { navigate } from 'svelte-navigator';
  import Icon from '@iconify/svelte';

  export let id: string;
  const { data: item, flags } = useApiCall(() => getItemById(id));

  const { flags: buyFlags, execute: buyItemCall } = useApiCall(
    () => buyItem(id),
    {
      runOnMount: false,
      onSuccess: () => {
        toast.success('¡Item comprado!');
        navigate(`/profile/buys`);
      },
      onError: (e) => {
        toast.error('Hubo un error al comprar el item');
      },
    }
  );

  $: isAllowToBuy =
    $item?.userId !== $authStore.user?.id && $item?.status === 'AVL';

  const onBuy = () => {
    if (!$authStore.user) {
      toast('Debes iniciar sesión para comprar un item');
      navigate(`/login?redirect_uri=${window.location.pathname}`);
    } else {
      buyItemCall();
    }
  };
</script>

<div class="w-full flex justify-center overflow-hidden relative bg-slate-100">
  <main class="container flex h-screen items-center justify-center">
    <article
      class="bg-white p-4 rounded-md shadow-md shadow-slate-700/5 flex gap-2 flex-col min-w-[32rem]"
      class:skeleton={$flags.isLoading}
      class:pointer-events-none={$buyFlags.isLoading}
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

        {#if isAllowToBuy}
          <Button
            variant="fill"
            type="submit"
            class="flex relative mt-4"
            onClick={onBuy}
          >
            {@const buttonText = $buyFlags.isLoading ? 'Comprando' : 'Comprar'}
            <span class="text-center w-full">{buttonText}</span>
            {#if $buyFlags.isLoading}
              <Icon
                icon="fluent:spinner-ios-20-filled"
                class="animate-spin text-xl absolute right-4"
              />
            {/if}
          </Button>
        {/if}
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
