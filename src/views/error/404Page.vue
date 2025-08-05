<template>
  <div
    class="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-primary/20 flex items-center justify-center p-4 relative overflow-hidden"
  >
    <!-- Background Animation -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="n in 20"
        :key="n"
        class="absolute animate-pulse"
        :class="['w-2 h-2 bg-primary/20 rounded-full', 'animate-float']"
        :style="particleStyle(n)"
      ></div>
    </div>

    <!-- Floating Geometric Shapes -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="n in 8"
        :key="`shape-${n}`"
        class="absolute animate-spin opacity-10"
        :class="[
          n % 3 === 0
            ? 'w-20 h-20 bg-secondary'
            : n % 3 === 1
              ? 'w-16 h-16 bg-accent'
              : 'w-12 h-12 bg-primary',
          n % 2 === 0 ? 'rounded-full' : 'rounded-lg rotate-45',
        ]"
        :style="shapeStyle(n)"
      ></div>
    </div>

    <!-- Main Content Card -->
    <div
      class="card bg-base-100/80 backdrop-blur-lg border border-base-300/50 shadow-2xl w-full max-w-lg relative z-10 transform transition-all duration-500 hover:scale-105"
      ref="card"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div class="card-body text-center p-12" ref="cardContent">
        <!-- 404 Code with Gradient -->
        <div class="mb-6">
          <div
            class="text-8xl md:text-9xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse select-none"
          >
            404
          </div>
          <div class="flex justify-center mt-4">
            <div
              class="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
            ></div>
          </div>
        </div>

        <!-- Error Message -->
        <div class="space-y-4 mb-8">
          <h1 class="text-3xl font-bold text-base-content">
            Halaman Tidak Ditemukan
          </h1>
          <p class="text-base-content/70 text-lg leading-relaxed">
            Ups! Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau
            tidak tersedia sementara.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/" class="btn btn-primary btn-lg">
            <svg
              class="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Kembali ke Beranda
          </router-link>
          <button @click="$router.go(-1)" class="btn btn-outline btn-lg">
            <svg
              class="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Halaman Sebelumnya
          </button>
        </div>

        <!-- Fun Stats -->
        <div
          class="stats stats-vertical sm:stats-horizontal bg-base-200/50 mt-8 border border-base-300/50"
        >
          <div class="stat">
            <div class="stat-title text-xs">Status Code</div>
            <div class="stat-value text-error text-2xl">404</div>
          </div>
          <div class="stat">
            <div class="stat-title text-xs">Error Type</div>
            <div class="stat-value text-warning text-base">Not Found</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Decoration -->
    <div
      class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-base-300/50 to-transparent pointer-events-none"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  mounted() {
    // Tidak perlu manipulasi DOM untuk background karena sudah menggunakan Tailwind
  },
  methods: {
    handleMouseMove(e) {
      const card = this.$refs.card
      const cardContent = this.$refs.cardContent
      const rect = card.getBoundingClientRect()

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = -(x - centerX) / 20

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
      cardContent.style.transform = 'translateZ(60px)'
    },
    handleMouseLeave() {
      const card = this.$refs.card
      const cardContent = this.$refs.cardContent

      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'
      cardContent.style.transform = 'translateZ(0)'
    },
    // Generate particle positions
    particleStyle(n) {
      function seededRandom(seed) {
        var x = Math.sin(seed) * 10000
        return x - Math.floor(x)
      }
      const left = seededRandom(n) * 100
      const top = seededRandom(n + 100) * 100
      const delay = seededRandom(n + 200) * 4
      return {
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${delay}s`,
      }
    },
    // Generate shape positions and sizes
    shapeStyle(n) {
      function seededRandom(seed) {
        var x = Math.sin(seed) * 10000
        return x - Math.floor(x)
      }
      const left = seededRandom(n) * 100
      const top = seededRandom(n + 50) * 100
      const duration = 8 + seededRandom(n + 100) * 12
      return {
        left: `${left}%`,
        top: `${top}%`,
        animationDuration: `${duration}s`,
      }
    },
  },
}
</script>

<style scoped>
@keyframes animate-float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

.animate-float {
  animation: animate-float 6s ease-in-out infinite;
}

/* Custom keyframes for more complex animations */
@keyframes float-up {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-20vh) scale(1);
    opacity: 0;
  }
}
</style>
