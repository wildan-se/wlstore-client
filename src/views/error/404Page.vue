<!-- NotFound.vue -->
<template>
  <div class="not-found-container">
    <div class="background">
      <div v-for="n in 20" :key="n" class="circle-container">
        <div class="circle"></div>
      </div>
    </div>
    <div class="particles" ref="particles"></div>
    <div
      class="card"
      ref="card"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div class="card-content" ref="cardContent">
        <div class="error-code">404</div>
        <h1 class="error-title">Page Not Found</h1>
        <p class="error-message">
          Oops! The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>
        <router-link to="/" class="home-button">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  mounted() {
    this.createParticles()
    // Memastikan background full layar
    document.body.style.margin = '0'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.height = '100%'
    document.body.style.height = '100%'
  },
  unmounted() {
    // Membersihkan style ketika komponen unmount
    document.body.style.margin = ''
    document.body.style.overflow = ''
    document.documentElement.style.height = ''
    document.body.style.height = ''
  },
  methods: {
    createParticles() {
      const particlesContainer = this.$refs.particles
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        particle.style.animationDelay = `${Math.random() * 4}s`
        particlesContainer.appendChild(particle)
      }
    },
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
  },
}
</script>

<style scoped>
/* Reset default margins dan set full height */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.not-found-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1a1a1a;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
}

/* Background animation styles */
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.circle-container {
  position: absolute;
  transform: translateY(0);
  animation: fall linear infinite;
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(108, 99, 255, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

/* Generate different animations for each circle */
.circle-container:nth-child(1) {
  left: 10vw;
  animation-duration: 15s;
  animation-delay: -10s;
}

.circle-container:nth-child(2) {
  left: 20vw;
  animation-duration: 18s;
  animation-delay: -20s;
}

/* Repeat for all 20 elements with different values */
.circle-container:nth-child(3) {
  left: 30vw;
  animation-duration: 20s;
  animation-delay: -30s;
}

/* Add similar rules for nth-child(4) to nth-child(20) */

@keyframes fall {
  0% {
    transform: translateY(-20vh) translateX(0);
  }
  50% {
    transform: translateX(20px);
  }
  100% {
    transform: translateY(120vh) translateX(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.4;
  }
}

.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: float 4s infinite;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(100px);
    opacity: 0;
  }
}

.card {
  position: relative;
  z-index: 2;
  width: 400px;
  height: 500px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  padding: 40px;
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: transform 0.5s ease;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
}

.card:hover {
  transform: scale(1.02);
}

.card-content {
  text-align: center;
  transform: translateZ(60px);
  transition: transform 0.5s ease;
}

.error-code {
  font-size: 120px;
  color: #6c63ff;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 10px rgba(108, 99, 255, 0.5);
}

.error-title {
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
}

.error-message {
  color: #ccc;
  margin-bottom: 30px;
  line-height: 1.6;
}

.home-button {
  display: inline-block;
  padding: 12px 30px;
  background: #6c63ff;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: none;
  cursor: pointer;
}

.home-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(108, 99, 255, 0.4);
}

@media (max-width: 480px) {
  .card {
    width: 90%;
    height: auto;
    padding: 30px;
  }

  .error-code {
    font-size: 80px;
  }
}
</style>
