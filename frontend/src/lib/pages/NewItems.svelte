<script lang="ts">
  import Input from '~/lib/atoms/Input.svelte';
  import Button from '~/lib/atoms/Button.svelte';
  import {
    createItemForm,
    brand,
    model,
    price,
    description,
    hasLeft,
    hasRight,
    hasCharger,
    isNew,
  } from '~/forms/item.form';
  import { handleSubmit } from '~/forms/handleSubmit';
  import { createItem } from '~/services/item.services';
  import { useApiCall } from '~/stores/useApiCall';
  import { errorMessages } from '~/forms/errorMessages';
  import toast from '~/stores/toast';
  import { navigate } from 'svelte-navigator';
  import Icon from '@iconify/svelte';
  import CheckIcon from '~/lib/atoms/CheckIcon.svelte';
  import {
    caseFillIcon,
    caseStokeIcon,
    earphoneFillIcon,
    earphoneStokeIcon,
  } from '~/assets/icons';
  import type { ChangeEventHandler } from 'svelte/elements';
  import { onDestroy } from 'svelte';

  const { flags, execute: createItemCall } = useApiCall(createItem, {
    runOnMount: false,
    onSuccess: (data) => {
      toast.success('¡Item creado!');
      navigate(`/items/${data.created.id}`);
    },
    onError: (e) => {
      toast.error('Hubo un error al crear el item.');
    },
  });

  const submit = async (data) => {
    if (
      data.hasLeft === false &&
      data.hasRight === false &&
      data.hasCharger === false
    ) {
      toast.error('Debes seleccionar al menos un lado o el cargador.');
      return;
    }
    createItemCall(data);
  };

  const handleIsNewChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target['checked']) {
      hasLeft.set(true);
      hasRight.set(true);
      hasCharger.set(true);
    } else {
      hasLeft.set(false);
      hasRight.set(false);
      hasCharger.set(false);
    }
  };

  const handleCharacteristicsChange = () => {
    isNew.set(false);
  };

  onDestroy(() => {
    createItemForm.reset();
  });
</script>

<div class="w-full flex justify-center overflow-hidden relative">
  <main class="container flex h-screen pt-32 pb-10">
    <form
      class="flex-1 flex flex-col gap-6"
      class:pointer-events={$flags.isLoading ? 'none' : ''}
      on:submit={handleSubmit(createItemForm, submit)}
    >
      <span
        class="text-sm text-slate-600 border-b-2 border-b-slate-200 font-semibold tracking-wide"
      >
        Detalles de los audífonos
      </span>
      <Input
        label="Marca"
        placeholder="Samsung, Apple, Xiaomi"
        bind:value={$brand.value}
        error={$brand.invalid}
        helpText={errorMessages($brand.errors)}
      />
      <Input
        label="Modelo"
        placeholder="Pods 7"
        bind:value={$model.value}
        error={$model.invalid}
        helpText={errorMessages($model.errors)}
      />
      <Input
        label="Precio"
        type="number"
        placeholder="$123.000"
        bind:value={$price.value}
        error={$price.invalid}
        helpText={errorMessages($price.errors)}
      />
      <Input
        label="Descripción"
        placeholder="Descripción del producto"
        bind:value={$description.value}
        error={$description.invalid}
        helpText={errorMessages($description.errors)}
      />

      <span
        class="text-sm text-slate-600 border-b-2 border-b-slate-200 font-semibold tracking-wide"
      >
        Características de los audífonos
      </span>
      <CheckIcon
        id="isNew"
        bind:checked={$isNew.value}
        label="Son nuevos"
        labelInactive="No son nuevos"
        onChange={handleIsNewChange}
      >
        <Icon
          icon="fluent:checkmark-12-regular"
          class="text-2xl text-white"
          slot="active"
        />
        <Icon
          icon="fluent:checkmark-12-regular"
          class="text-2xl text-slate-500"
          slot="inactive"
        />
      </CheckIcon>

      <CheckIcon
        id="hasRight"
        bind:checked={$hasRight.value}
        label="Con lado derecho"
        onChange={handleCharacteristicsChange}
        labelInactive="Sin lado derecho"
      >
        <img
          src={earphoneFillIcon}
          alt="earphoneFillIcon"
          class="invert -scale-x-100"
          slot="active"
        />
        <img
          src={earphoneStokeIcon}
          alt="earphoneStokeIcon"
          class="-scale-x-100"
          slot="inactive"
        />
      </CheckIcon>
      <CheckIcon
        id="hasLeft"
        bind:checked={$hasLeft.value}
        label="Con lado izquierdo"
        onChange={handleCharacteristicsChange}
        labelInactive="Sin lado izquierdo"
      >
        <img
          src={earphoneFillIcon}
          alt="earphoneFillIcon"
          class="invert"
          slot="active"
        />
        <img src={earphoneStokeIcon} alt="earphoneStokeIcon" slot="inactive" />
      </CheckIcon>
      <CheckIcon
        id="hasCharger"
        bind:checked={$hasCharger.value}
        label="Con cargador"
        onChange={handleCharacteristicsChange}
        labelInactive="Sin cargador"
      >
        <img
          src={caseFillIcon}
          alt="earphoneFillIcon"
          class="invert"
          slot="active"
        />
        <img src={caseStokeIcon} alt="earphoneStokeIcon" slot="inactive" />
      </CheckIcon>
      <Button variant="fill" type="submit" class="flex relative mt-auto">
        {@const buttonText = $flags.isLoading ? 'Creando' : 'Crear'}
        <span class="text-center w-full">{buttonText}</span>
        {#if $flags.isLoading}
          <Icon
            icon="fluent:spinner-ios-20-filled"
            class="animate-spin text-xl absolute right-4"
          />
        {/if}
      </Button>
    </form>
  </main>
</div>
