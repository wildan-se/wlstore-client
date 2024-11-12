<!-- NotFound.vue -->
<template>
  <div class="error-page">
    <div class="container">
      <div
        class="card-wrapper"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <div class="card" :style="cardStyle">
          <div class="card-front">
            <div class="error-code" :class="{ glitch: startGlitch }">404</div>
            <div class="message" v-show="showMessage">
              Oops! Halaman yang Anda cari tidak ditemukan.
            </div>
            <router-link to="/" class="home-btn" v-show="showButton">
              Kembali ke Beranda
            </router-link>
          </div>
          <div class="card-back">
            <div class="back-content">
              <div class="error-icon">❌</div>
              <div class="back-message">Page Not Found</div>
              <div class="back-details">
                The page you're looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      showMessage: false,
      showButton: false,
      startGlitch: false,
      rotateX: 0,
      rotateY: 0,
      isAutoRotating: true,
    }
  },
  computed: {
    cardStyle() {
      return {
        transform: `
          rotateX(${this.rotateX}deg) 
          rotateY(${this.rotateY}deg)
        `,
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.startGlitch = true
    }, 300)
    setTimeout(() => {
      this.showMessage = true
    }, 800)
    setTimeout(() => {
      this.showButton = true
    }, 1300)
    this.startAutoRotation()
  },
  beforeUnmount() {
    this.stopAutoRotation()
  },
  methods: {
    handleMouseMove(e) {
      this.isAutoRotating = false
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 30
      const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 30

      this.rotateX = rotateX
      this.rotateY = rotateY
    },
    handleMouseLeave() {
      this.isAutoRotating = true
      this.startAutoRotation()
    },
    startAutoRotation() {
      let angle = 0
      const animate = () => {
        if (!this.isAutoRotating) return
        angle = (angle + 0.5) % 360
        this.rotateY = Math.sin((angle * Math.PI) / 180) * 15
        this.rotateX = Math.cos((angle * Math.PI) / 180) * 15
        this.animationFrame = requestAnimationFrame(animate)
      }
      this.animationFrame = requestAnimationFrame(animate)
    },
    stopAutoRotation() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
      }
    },
  },
}
</script>

<style scoped>
.error-page {
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Arial', sans-serif;
  perspective: 1000px;
}

.container {
  padding: 2rem;
  position: relative;
}

.card-wrapper {
  width: 400px;
  height: 500px;
  perspective: 1000px;
  cursor: pointer;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-back {
  transform: rotateY(180deg);
  background: rgba(255, 255, 255, 0.15);
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  opacity: 0;
  transform: scale(0.8);
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.error-code.glitch {
  opacity: 1;
  transform: scale(1);
  animation: glitch 5s infinite;
}

.message {
  font-size: 24px;
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
  animation: fadeInUp 1s ease-out;
}

.home-btn {
  padding: 12px 30px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  text-decoration: none;
  animation: fadeInUp 1s ease-out;
}

.home-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.back-content {
  text-align: center;
  color: #fff;
}

.error-icon {
  font-size: 50px;
  margin-bottom: 20px;
}

.back-message {
  font-size: 28px;
  margin-bottom: 15px;
  font-weight: bold;
}

.back-details {
  font-size: 16px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
}

@keyframes glitch {
  0% {
    transform: translateX(0) scale(1);
    filter: hue-rotate(0deg);
  }
  25% {
    transform: translateX(-5px) scale(1.02) skew(10deg);
    filter: hue-rotate(90deg);
  }
  50% {
    transform: translateX(5px) scale(0.98) skew(-10deg);
    filter: hue-rotate(180deg);
  }
  75% {
    transform: translateX(-3px) scale(1.01) skew(5deg);
    filter: hue-rotate(270deg);
  }
  100% {
    transform: translateX(0) scale(1);
    filter: hue-rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-wrapper {
    width: 300px;
    height: 400px;
  }

  .error-code {
    font-size: 80px;
  }

  .message {
    font-size: 20px;
  }

  .home-btn {
    padding: 10px 25px;
    font-size: 14px;
  }

  .back-message {
    font-size: 24px;
  }

  .back-details {
    font-size: 14px;
  }
}
</style>
