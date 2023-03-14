<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { ChangeEventHandler } from 'svelte/elements';
  import {
    caseFillIcon,
    caseStokeIcon,
    earphoneFillIcon,
    earphoneStokeIcon,
  } from '~/assets/icons';
  import CheckIcon from '~/lib/atoms/CheckIcon.svelte';

  export let showText: boolean = true;
  export let isNew: boolean = undefined;
  export let hasRight: boolean;
  export let hasLeft: boolean;
  export let hasCharger: boolean;
  export let onIsNewChange: ChangeEventHandler<HTMLInputElement> = undefined;
  export let onCharacteristicsChange: ChangeEventHandler<HTMLInputElement> =
    undefined;
</script>

{#if typeof isNew === 'boolean'}
  <CheckIcon
    id="isNew"
    bind:checked={isNew}
    label={showText ? 'Son nuevos' : ''}
    labelInactive={showText ? 'No son nuevos' : ''}
    onChange={onIsNewChange}
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
{/if}

<CheckIcon
  id="hasRight"
  bind:checked={hasRight}
  label={showText ? 'Con lado derecho' : ''}
  labelInactive={showText ? 'Sin lado derecho' : ''}
  onChange={onCharacteristicsChange}
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
  bind:checked={hasLeft}
  label={showText ? 'Con lado izquierdo' : ''}
  labelInactive={showText ? 'Sin lado izquierdo' : ''}
  onChange={onCharacteristicsChange}
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
  bind:checked={hasCharger}
  label={showText ? 'Con cargador' : ''}
  labelInactive={showText ? 'Sin cargador' : ''}
  onChange={onCharacteristicsChange}
>
  <img src={caseFillIcon} alt="earphoneFillIcon" class="invert" slot="active" />
  <img src={caseStokeIcon} alt="earphoneStokeIcon" slot="inactive" />
</CheckIcon>
