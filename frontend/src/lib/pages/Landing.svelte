<script lang="ts">
  import heroPhoto from '~/assets/pexels-thirdman-8053704.png';
  import Button from '~/lib/atoms/Button.svelte';
  import DecorationDots from '~/lib/atoms/DecorationDots.svelte';
  import Icon from '@iconify/svelte';
</script>

<div class="w-full flex justify-center">
  <main class="container h-screen flex pt-20">
    <section class="mx-auto p-10 flex-1 flex flex-col justify-center gap-5">
      <h1 class="text-5xl font-bold leading-tight outline-slate-100">
        Completa<br />
        la <span class="highlight">experiencia</span> <br />
        de tus oídos<Icon icon="fluent-emoji:ear" class="inline" />
      </h1>
      <p class="text-slate-500 leading-relaxed">
        Nunca más tendrás que preocuparte por<br />
        tener audífonos incompletos o piezas extras.
      </p>
      <div class="flex w-2/3 gap-10 mt-10">
        <Button class="flex-1" variant="outline">Vender</Button>
        <Button class="flex-1" variant="fill">Buscar</Button>
      </div>
    </section>
    <section class="w-1/2 h-full overflow-hidden flex justify-center relative">
      <Icon
        icon="fluent-emoji:musical-notes"
        class="absolute top-[20%] left-[30%] text-4xl p-4 box-content rounded-full z-20 bg-slate-100/50 backdrop-filter backdrop-blur-sm shadow-[-2px_-2px_8px_rgb(100_116_139_/_20%)]"
      />
      <Icon
        icon="fluent-emoji:sparkles"
        class="absolute top-[35%] right-[20%] text-4xl p-4 box-content rounded-full z-20 bg-slate-100/50 backdrop-filter backdrop-blur-sm shadow-[2px_-2px_8px_rgb(100_116_139_/_20%)]"
      />
      <div
        class="absolute bottom-[5%] right-[20%] p-2 box-content rounded-md z-20 bg-slate-800 flex items-center gap-4"
      >
        <Icon icon="fluent-emoji:handshake" class="text-4xl" />
        <span class="text-white text-sm font-light tracking-wide">
          ¡Ey, Escúchame! <br />
          Ofrece para completar
        </span>
      </div>
      <img
        src={heroPhoto}
        class="h-[90%] object-contain mt-auto z-10"
        alt="Happy woman with earphones"
      />
      <DecorationDots mode="medium" />
    </section>
  </main>
</div>
