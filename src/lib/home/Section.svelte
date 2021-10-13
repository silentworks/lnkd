<script>
  let className

  export { className as class }
</script>

<section class={className}>
  <div class="w-full mx-auto md:max-w-5xl">
    <slot />
  </div>
</section>
