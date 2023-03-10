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
    label="Son nuevos"
    labelInactive="No son nuevos"
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
  label="Con lado derecho"
  onChange={onCharacteristicsChange}
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
  bind:checked={hasLeft}
  label="Con lado izquierdo"
  onChange={onCharacteristicsChange}
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
  bind:checked={hasCharger}
  label="Con cargador"
  onChange={onCharacteristicsChange}
  labelInactive="Sin cargador"
>
  <img src={caseFillIcon} alt="earphoneFillIcon" class="invert" slot="active" />
  <img src={caseStokeIcon} alt="earphoneStokeIcon" slot="inactive" />
</CheckIcon>
