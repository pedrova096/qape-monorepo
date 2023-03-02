<script lang="ts">
  import qapeLogo from './assets/qape-logo.svg';
  import heroPhoto from './assets/pexels-thirdman-8053704.png';
</script>

<header class="p-6 absolute w-full">
  <nav class="container mx-auto flex items-center justify-between relative">
    <a href="/" class="z-10">
      <img src={qapeLogo} class="h-8" alt="Qape Logo" />
    </a>
    <div>
      <a href="#" class="px-4 py-2 hover:bg-slate-100 rounded-md font-semibold">
        Inicio
      </a>
      <a href="#" class="px-4 py-2 hover:bg-slate-100 rounded-md font-semibold">
        Nosotros
      </a>
      <a href="#" class="px-4 py-2 hover:bg-slate-100 rounded-md font-semibold">
        Login
      </a>
      <a
        href="#"
        class="outline outline-2 outline-slate-800 -outline-offset-2 px-4 py-2 rounded-md font-semibold"
      >
        Regístrate
      </a>
    </div>
  </nav>
</header>

<div class="w-full flex justify-center">
  <main class="container h-screen flex pt-20">
    <section class="mx-auto p-10 flex-1 flex flex-col justify-center gap-5">
      <h1 class="text-5xl font-bold leading-tight">
        Completa<br />
        la <span class="highlight">experiencia</span> <br />
        de tus oídos
      </h1>
      <p class="text-slate-500 leading-relaxed">
        Nunca más tendrás que preocuparte por<br />
        tener audífonos incompletos o piezas extras.
      </p>
      <div class="flex w-2/3 gap-10 mt-10">
        <button
          class="outline outline-2 outline-amber-500 -outline-offset-2 px-4 py-3 rounded-md font-semibold flex-1"
        >
          Vender
        </button>
        <button
          class="bg-amber-500 px-4 py-3 rounded-md font-semibold text-white tracking-wide flex-1"
        >
          Buscar
        </button>
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
