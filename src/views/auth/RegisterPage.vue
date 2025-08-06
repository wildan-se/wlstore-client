<template>
  <div
    class="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 flex"
  >
    <!-- Left Side - Register Form -->
    <div
      class="w-full flex items-center justify-center p-3 lg:p-6 relative overflow-hidden"
    >
      <!-- Animated Background for Left Side -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Grid Pattern -->
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,119,186,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"
        ></div>

        <!-- Floating Orbs -->
        <div
          class="absolute w-48 h-48 rounded-full top-20 left-10 bg-gradient-to-br from-purple-400/20 to-pink-600/20 blur-3xl animate-float"
        ></div>
        <div
          class="absolute w-32 h-32 rounded-full bottom-20 right-10 bg-gradient-to-br from-pink-400/20 to-rose-600/20 blur-3xl animate-float-delayed"
        ></div>

        <!-- Geometric Shapes -->
        <div
          class="absolute w-16 h-16 rotate-45 border top-1/4 right-1/4 border-white/10 animate-spin-slow"
        ></div>
        <div
          class="absolute w-4 h-4 rotate-45 top-1/2 left-1/6 bg-pink-400/30 animate-bounce-slow"
        ></div>
      </div>

      <!-- Form Container -->
      <div class="relative z-10 w-full max-w-lg">
        <!-- Logo Section for Mobile -->
        <div class="mb-4 text-center lg:hidden animate-fade-in-up">
          <div class="relative inline-block mb-2">
            <div
              class="absolute inset-0 rounded-full opacity-75 bg-gradient-to-br from-purple-500 to-pink-600 blur-lg animate-pulse"
            ></div>
            <div
              class="relative flex items-center justify-center w-12 h-12 rounded-full shadow-2xl bg-gradient-to-br from-purple-500 to-pink-600"
            >
              <svg
                class="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
          </div>
          <h1 class="mb-1 text-lg font-bold text-white">WLStore</h1>
        </div>

        <!-- Register Card -->
        <div class="relative group animate-fade-in-up animation-delay-200">
          <!-- Card Glow Effect -->
          <div
            class="absolute inset-0 transition-opacity duration-500 opacity-75 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-2xl blur-xl group-hover:opacity-100"
          ></div>

          <!-- Main Card -->
          <div
            class="relative overflow-hidden border shadow-2xl bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl"
          >
            <!-- Card Header Gradient -->
            <div
              class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500"
            ></div>

            <div class="p-4 lg:p-5">
              <!-- Header -->
              <div class="mb-5 text-center">
                <h2 class="mb-2 text-lg font-bold text-white">
                  Bergabung Dengan Kami
                </h2>
                <p class="text-purple-200/70 text-xs lg:text-sm">
                  Daftarkan akun baru untuk memulai berbelanja
                </p>
              </div>

              <!-- Form -->
              <form @submit.prevent="handleRegister" class="space-y-4">
                <!-- Row 1: Username & Email -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <!-- Username Field -->
                  <div class="form-control group">
                    <label class="label" for="username">
                      <span
                        class="flex items-center gap-1.5 font-semibold text-white text-xs"
                      >
                        <div
                          class="flex items-center justify-center w-4 h-4 rounded-full bg-blue-500/20"
                        >
                          <svg
                            class="w-2.5 h-2.5 text-blue-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        Username
                      </span>
                    </label>
                    <div class="relative">
                      <input
                        type="text"
                        id="username"
                        v-model="username"
                        required
                        placeholder="Masukkan username"
                        class="w-full px-3 py-2 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-lg placeholder-white/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none text-xs"
                        :class="{
                          'border-red-400 bg-red-500/10':
                            username && username.length < 3,
                        }"
                      />
                      <div
                        class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg group-focus-within:opacity-100"
                      ></div>
                    </div>
                    <label v-if="username && username.length < 3" class="label">
                      <span class="text-xs text-red-400"
                        >Minimal 3 karakter</span
                      >
                    </label>
                  </div>

                  <!-- Email Field -->
                  <div class="form-control group">
                    <label class="label" for="email">
                      <span
                        class="flex items-center gap-1.5 font-semibold text-white text-xs"
                      >
                        <div
                          class="flex items-center justify-center w-4 h-4 rounded-full bg-purple-500/20"
                        >
                          <svg
                            class="w-2.5 h-2.5 text-purple-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <polyline
                              points="22,6 12,13 2,6"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        Email
                      </span>
                    </label>
                    <div class="relative">
                      <input
                        type="email"
                        id="email"
                        v-model="email"
                        required
                        placeholder="Masukkan email"
                        class="w-full px-3 py-2 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-lg placeholder-white/50 focus:bg-white/20 focus:border-purple-400 focus:outline-none text-xs"
                        :class="{
                          'border-red-400 bg-red-500/10':
                            email && !isValidEmail(email),
                        }"
                      />
                      <div
                        class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg group-focus-within:opacity-100"
                      ></div>
                    </div>
                    <label v-if="email && !isValidEmail(email)" class="label">
                      <span class="text-xs text-red-400"
                        >Format email tidak valid</span
                      >
                    </label>
                  </div>
                </div>

                <!-- Row 2: Name & Phone -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <!-- Name Field -->
                  <div class="form-control group">
                    <label class="label" for="name">
                      <span
                        class="flex items-center gap-1.5 font-semibold text-white text-xs"
                      >
                        <div
                          class="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20"
                        >
                          <svg
                            class="w-2.5 h-2.5 text-emerald-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        Nama Lengkap
                      </span>
                    </label>
                    <div class="relative">
                      <input
                        type="text"
                        id="name"
                        v-model="name"
                        required
                        placeholder="Masukkan nama lengkap"
                        class="w-full px-3 py-2 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-lg placeholder-white/50 focus:bg-white/20 focus:border-emerald-400 focus:outline-none text-xs"
                        :class="{
                          'border-red-400 bg-red-500/10':
                            name && name.length < 2,
                        }"
                      />
                      <div
                        class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg group-focus-within:opacity-100"
                      ></div>
                    </div>
                    <label v-if="name && name.length < 2" class="label">
                      <span class="text-xs text-red-400"
                        >Minimal 2 karakter</span
                      >
                    </label>
                  </div>

                  <!-- Phone Field (Optional) -->
                  <div class="form-control group">
                    <label class="label" for="phone">
                      <span
                        class="flex items-center gap-1.5 font-semibold text-white text-xs"
                      >
                        <div
                          class="flex items-center justify-center w-4 h-4 rounded-full bg-yellow-500/20"
                        >
                          <svg
                            class="w-2.5 h-2.5 text-yellow-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 16.92V19.92C22 20.9149 21.2165 21.7684 20.2254 21.9999C19.9457 22.0352 19.6612 21.9966 19.41 21.89L15.59 20.37C15.2147 20.224 14.7951 20.224 14.42 20.37L10.59 21.89C10.3388 21.9966 10.0543 22.0352 9.77456 21.9999C8.78351 21.7684 8 20.9149 8 19.92V16.92C8 15.9251 8.78351 15.0716 9.77456 14.8401C10.0543 14.8048 10.3388 14.8434 10.59 14.95L14.42 16.47C14.7951 16.616 15.2147 16.616 15.59 16.47L19.41 14.95C19.6612 14.8434 19.9457 14.8048 20.2254 14.8401C21.2165 15.0716 22 15.9251 22 16.92Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15 6C15 7.65685 13.6569 9 12 9C10.3431 9 9 7.65685 9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        Telepon (Opsional)
                      </span>
                    </label>
                    <div class="relative">
                      <input
                        type="tel"
                        id="phone"
                        v-model="phone"
                        placeholder="Masukkan nomor telepon"
                        class="w-full px-3 py-2 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-lg placeholder-white/50 focus:bg-white/20 focus:border-yellow-400 focus:outline-none text-xs"
                      />
                      <div
                        class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg group-focus-within:opacity-100"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Row 3: Password & Confirm Password -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <!-- Password Field -->
                  <div class="form-control group">
                    <label class="label" for="password">
                      <span
                        class="flex items-center gap-1.5 font-semibold text-white text-xs"
                      >
                        <div
                          class="flex items-center justify-center w-4 h-4 rounded-full bg-cyan-500/20"
                        >
                          <svg
                            class="w-2.5 h-2.5 text-cyan-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                              ry="2"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        Password
                      </span>
                    </label>
                    <div class="relative">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        id="password"
                        v-model="password"
                        required
                        placeholder="Masukkan password"
                        class="w-full px-3 py-2 text-white transition-all duration-300 border pr-10 bg-white/10 border-white/20 rounded-lg placeholder-white/50 focus:bg-white/20 focus:border-cyan-400 focus:outline-none text-xs"
                        :class="{
                          'border-red-400 bg-red-500/10':
                            password && password.length < 6,
                        }"
                      />
                      <button
                        type="button"
                        @click="showPassword = !showPassword"
                        class="absolute flex items-center -mt-8 justify-center w-8 h-8 transition-all duration-300 rounded-lg right-1 text-white/60 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                      >
                        <!-- Eye Open Icon -->
                        <svg
                          v-if="!showPassword"
                          class="w-3.5 h-3.5 transition-all duration-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          />
                          <circle cx="12" cy="12" r="3" />
                        </svg>

                        <!-- Eye Closed Icon -->
                        <svg
                          v-else
                          class="w-3.5 h-3.5 transition-all duration-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                          <path
                            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a13.16 13.16 0 0 1-1.67 2.68"
                          />
                          <path
                            d="M6.61 6.61A13.526 13.526 0 0 0 1 12s4 8 11 8a9.74 9.74 0 0 0 5.39-1.61"
                          />
                          <line x1="2" y1="2" x2="22" y2="22" />
                        </svg>
                      </button>
                      <div
                        class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg group-focus-within:opacity-100"
                      ></div>
                    </div>
                    <label v-if="password && password.length < 6" class="label">
                      <span class="text-xs text-red-400"
                        >Minimal 6 karakter</span
                      >
                    </label>
                  </div>

                  <!-- Confirm Password Field -->
                  <div class="form-control group">
                    <label class="label" for="confirmPassword">
                      <span
                        class="flex items-center gap-1.5 font-semibold text-white text-xs"
                      >
                        <div
                          class="flex items-center justify-center w-4 h-4 rounded-full bg-green-500/20"
                        >
                          <svg
                            class="w-2.5 h-2.5 text-green-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        Konfirmasi Password
                      </span>
                    </label>
                    <div class="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        v-model="confirmPassword"
                        required
                        placeholder="Konfirmasi password"
                        class="w-full px-3 py-2 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-lg placeholder-white/50 focus:bg-white/20 focus:border-green-400 focus:outline-none text-xs"
                        :class="{
                          'border-red-400 bg-red-500/10':
                            confirmPassword && password !== confirmPassword,
                        }"
                      />
                      <div
                        class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-lg group-focus-within:opacity-100"
                      ></div>
                    </div>
                    <label
                      v-if="confirmPassword && password !== confirmPassword"
                      class="label"
                    >
                      <span class="text-xs text-red-400"
                        >Password tidak cocok</span
                      >
                    </label>
                  </div>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="relative w-full py-2.5 mt-5 overflow-hidden font-semibold text-white group rounded-lg"
                  :disabled="isLoading || !isFormValid"
                  :class="{
                    'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300':
                      isFormValid && !isLoading,
                    'bg-gray-600 cursor-not-allowed': !isFormValid || isLoading,
                  }"
                >
                  <!-- Button Background Effect -->
                  <div
                    class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:opacity-100"
                  ></div>

                  <!-- Button Content -->
                  <div class="relative flex items-center justify-center gap-2">
                    <div
                      v-if="isLoading"
                      class="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"
                    ></div>
                    <svg
                      v-else
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 7C9 9.20914 10.7909 11 13 11C15.2091 11 17 9.20914 17 7C17 4.79086 15.2091 3 13 3C10.7909 3 9 4.79086 9 7Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23 21V19C23 18.1645 22.7155 17.3737 22.2094 16.7812C21.7033 16.1887 20.9926 15.8352 20.2 15.79"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span class="text-sm">{{
                      isLoading ? 'Memproses...' : 'Daftar Sekarang'
                    }}</span>
                  </div>
                </button>
              </form>

              <!-- Divider -->
              <div class="flex items-center my-4">
                <div
                  class="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                ></div>
                <span class="px-3 text-xs text-white/60">atau</span>
                <div
                  class="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                ></div>
              </div>

              <!-- Login Link -->
              <div class="text-center">
                <p class="mb-2 text-white/70 text-xs">Sudah punya akun?</p>
                <router-link
                  to="/login"
                  class="relative inline-flex items-center justify-center w-full px-4 py-2 font-medium text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-lg hover:bg-white/20 hover:border-white/30 group overflow-hidden"
                >
                  <!-- Background Effect -->
                  <div
                    class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:opacity-100"
                  ></div>

                  <!-- Content -->
                  <div
                    class="relative flex items-center justify-center gap-1.5"
                  >
                    <svg
                      class="w-3 h-3 transition-transform duration-300 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 17L15 12L10 7"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 12H3"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span
                      class="transition-transform duration-300 group-hover:translate-x-1 text-xs"
                    >
                      Masuk ke Akun
                    </span>
                    <svg
                      class="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12H19" />
                      <path d="M12 5L19 12L12 19" />
                    </svg>
                  </div>
                </router-link>
              </div>

              <!-- Alert Message -->
              <transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div v-if="message" class="mt-3">
                  <div
                    :class="[
                      'flex items-center gap-2 p-2.5 rounded-lg border backdrop-blur-sm',
                      messageType === 'success'
                        ? 'bg-green-500/20 border-green-400/50 text-green-100'
                        : 'bg-red-500/20 border-red-400/50 text-red-100',
                    ]"
                  >
                    <div class="flex-shrink-0">
                      <svg
                        v-if="messageType === 'success'"
                        class="w-4 h-4 text-green-400"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 12L11 14L15 10"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                      </svg>
                      <svg
                        v-else
                        class="w-4 h-4 text-red-400"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                        <path
                          d="M15 9L9 15"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 9L15 15"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <span class="font-medium text-xs">{{ message }}</span>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useAuth } from '../../composables/useAuth.js'
import {
  useMessage,
  useFormValidation,
} from '../../composables/useFormValidation.js'

export default {
  name: 'RegisterPage',
  setup() {
    const { register, isLoading } = useAuth()
    const { message, messageType, showMessage } = useMessage()
    const { isValidEmail } = useFormValidation()

    // Reactive state
    const username = ref('')
    const email = ref('')
    const name = ref('')
    const phone = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const showPassword = ref(false)

    // Computed properties
    const isFormValid = computed(() => {
      return (
        username.value.length >= 3 &&
        name.value.length >= 2 &&
        isValidEmail(email.value) &&
        password.value.length >= 6 &&
        password.value === confirmPassword.value
      )
    })

    const handleRegister = async () => {
      if (!isFormValid.value) {
        showMessage('Mohon lengkapi semua field dengan benar!')
        return
      }

      await register(
        {
          username: username.value,
          email: email.value,
          name: name.value,
          phone: phone.value || '',
          password: password.value,
        },
        showMessage,
      )
    }

    return {
      username,
      email,
      name,
      phone,
      password,
      confirmPassword,
      showPassword,
      isLoading,
      message,
      messageType,
      isFormValid,
      isValidEmail,
      handleRegister,
    }
  },
}
</script>

<style scoped>
/* Prevent scrolling */
html,
body {
  overflow: hidden !important;
  height: 100% !important;
}

/* Import the same animations from authPage.vue */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(-5deg);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation classes */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

/* Glass morphism effects */
.backdrop-blur-xl {
  backdrop-filter: blur(16px);
}

/* Smooth transitions */
* {
  transition: all 0.3s ease;
}

/* Form focus effects */
input:focus {
  transform: translateY(-1px);
}

/* Button hover effects */
button:hover:not(:disabled) {
  transform: translateY(-1px);
}

/* Loading animation for buttons */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Enhanced glass effect for form elements */
.form-control input:focus {
  box-shadow:
    0 0 0 1px rgba(59, 130, 246, 0.5),
    0 0 20px rgba(59, 130, 246, 0.2);
}
</style>
