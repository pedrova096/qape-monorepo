<script lang="ts">
  import heroPhoto from '~/assets/pexels-thirdman-8053704.png';
  import Button from '~/lib/atoms/Button.svelte';
</script>

<div class="w-full flex justify-center">
  <main class="container h-screen flex pt-20">
    <section class="mx-auto p-10 flex-1 flex flex-col justify-center gap-5">
      <h1 class="text-5xl font-bold leading-tight outline-slate-100">
        Completa<br />
        la <span class="highlight">experiencia</span> <br />
        de tus oídos
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
      <img
        src={heroPhoto}
        class="h-[90%] object-contain mt-auto z-10"
        alt="Happy woman with earphones"
      />
    </section>
  </main>
</div>
