<script lang="ts">
  import {
    caseFillAltIcon,
    caseStokeIcon,
    earphoneFillIcon,
    earphoneStokeIcon,
  } from '~/assets/icons';

  export let hasLeft: boolean;
  export let hasRight: boolean;
  export let hasCharger: boolean;
</script>

<div
  class="w-24 aspect-square bg-slate-800 rounded-md row-span-3 grid grid-cols-2 grid-rows-[1fr_2fr] p-2 place-items-center gap-y-1 "
>
  <img
    src={hasLeft ? earphoneFillIcon : earphoneStokeIcon}
    alt="earphoneLeftIcon"
    class="invert -rotate-[20deg] h-full"
  />
  <img
    src={hasRight ? earphoneFillIcon : earphoneStokeIcon}
    alt="earphoneRightIcon"
    class="invert -scale-x-100 rotate-[20deg] h-full"
  />
  <img
    src={hasCharger ? caseFillAltIcon : caseStokeIcon}
    alt="caseIcon"
    class="h-full invert col-span-2"
  />
</div>
