<script lang="ts">
  import Button from '~/lib/atoms/Button.svelte';
  import Input from '~/lib/atoms/Input.svelte';
  import ItemChecks from '~/lib/molecules/ItemChecks.svelte';
  import filterForm, {
    brand,
    minPrice,
    maxPrice,
    hasCharger,
    hasLeft,
    hasRight,
  } from '~/forms/filter.form';
  import { handleSubmit } from '~/forms/handleSubmit';
  import Icon from '@iconify/svelte';
  import { errorMessages } from '~/forms/errorMessages';
  import ListItems from '~/lib/atoms/ListItems.svelte';
  import { useApiCall } from '~/stores/useApiCall';
  import {
    getSearchItem,
    type QuerySearchItem,
  } from '~/services/item.services';
  import { useLocation, useNavigate, useParams } from 'svelte-navigator';
  import { onMount } from 'svelte';

  const navigate = useNavigate();
  const location = useLocation();

  function getFilterFormQuery() {
    const search = $location.search;
    const params = new URLSearchParams(search);

    const keys = [
      'brand',
      'minPrice',
      'maxPrice',
      'hasCharger',
      'hasLeft',
      'hasRight',
    ]
      .filter((key) => params.has(key))
      .map((key) => [key, params.get(key)]);

    keys.forEach(([key, value]) => {
      if (key === 'brand') {
        $brand.value = value;
      } else if (key === 'minPrice') {
        $minPrice.value = parseInt(value);
      } else if (key === 'maxPrice') {
        $maxPrice.value = parseInt(value);
      } else if (key === 'hasCharger') {
        $hasCharger.value = value === 'true';
      } else if (key === 'hasLeft') {
        $hasLeft.value = value === 'true';
      } else if (key === 'hasRight') {
        $hasRight.value = value === 'true';
      }
    });
  }

  const { data: items, execute: getSearchItemCall } = useApiCall(
    getSearchItem,
    {
      runOnMount: false,
    }
  );

  const submit = async (data?: QuerySearchItem) => {
    Object.keys(data).forEach(
      (key) =>
        (data[key] == null || data[key] === undefined) && delete data[key]
    );
    if (Object.keys(data).length > 0) {
      navigate(
        `/search?${new URLSearchParams(data as Record<string, string>)}`
      );
    }
    getSearchItemCall(data);
  };

  onMount(() => {
    getFilterFormQuery();
    submit(filterForm.summary());
  });
</script>

<div class="w-full flex justify-center overflow-hidden relative flex-col">
  <header
    class="w-full flex justify-center bg-slate-200 mt-20 pb-10 pt-12 px-6"
  >
    <form
      class="container flex gap-4 items-center"
      on:submit={handleSubmit(filterForm, submit)}
    >
      <Input
        label="Marca"
        placeholder="Samsung, Apple, Xiaomi"
        bind:value={$brand.value}
        error={$brand.invalid}
        class="flex-1"
        helpText={errorMessages($brand.errors)}
      />
      <Input
        label="Mínimo"
        type="number"
        placeholder="$0"
        bind:value={$minPrice.value}
        error={$minPrice.invalid}
        class="flex-1"
        helpText={errorMessages($minPrice.errors)}
      />
      <Input
        label="Máximo"
        type="number"
        placeholder="$1.000.000"
        bind:value={$maxPrice.value}
        error={$maxPrice.invalid}
        class="flex-1"
        helpText={errorMessages($maxPrice.errors)}
      />
      <div class="bg-white rounded-md flex p-3 mb-1 justify-between">
        <ItemChecks
          bind:hasLeft={$hasLeft.value}
          bind:hasRight={$hasRight.value}
          bind:hasCharger={$hasCharger.value}
          showText={false}
        />
      </div>
      <Button variant="fill" type="submit" class="flex !py-4 mb-1">
        <!-- icon="fluent:spinner-ios-20-filled" -->
        <Icon icon="fluent:search-12-filled" class="text-2xl" />
        <span class="text-center w-full ml-2">Buscar</span>
      </Button>
    </form>
  </header>
  <main class="container w-full flex-1 my-10 mx-auto">
    <ListItems items={$items || []} />
  </main>
</div>
