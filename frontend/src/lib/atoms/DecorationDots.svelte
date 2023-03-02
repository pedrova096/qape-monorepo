<script lang="ts">
  import decorationDots from '~/assets/decoration-dots.png';

  let className = '';
  export let mode: 'small' | 'medium' = 'small';
  export { className as class };
</script>

<div class="absolute tint-dots {mode} {className}">
  <img src={decorationDots} class="w-full" alt="Decoration Dots" />
</div>

<style type="postcss">
  .small {
    @apply w-64;
  }
  .medium {
    @apply w-5/6;
  }
  .tint-dots::before {
    content: '';
    @apply absolute bg-amber-100 inset-0 mix-blend-screen;
  }
</style>
