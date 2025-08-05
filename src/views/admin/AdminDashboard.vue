<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Admin Sidebar -->
    <aside
      class="fixed top-0 left-0 z-10 flex flex-col h-screen bg-white border-r border-gray-200 w-72"
    >
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center gap-3 font-bold text-gray-900">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8 text-blue-600"
          >
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
          <span>WLStore Admin</span>
        </div>
      </div>

      <nav class="flex flex-col flex-1 gap-8 p-6">
        <div class="flex flex-col gap-4">
          <h3
            class="mb-0 text-xs font-semibold tracking-wider text-gray-500 uppercase"
          >
            Manajemen
          </h3>
          <ul class="flex flex-col gap-1 p-0 m-0 list-none">
            <li>
              <router-link
                to="/admin/dashboard"
                class="flex items-center gap-3 px-4 py-3 font-medium text-blue-600 no-underline transition-all duration-200 rounded-md cursor-pointer bg-blue-50"
              >
                <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="9"
                    stroke="currentColor"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="5"
                    stroke="currentColor"
                  />
                  <rect
                    x="14"
                    y="12"
                    width="7"
                    height="9"
                    stroke="currentColor"
                  />
                  <rect
                    x="3"
                    y="16"
                    width="7"
                    height="5"
                    stroke="currentColor"
                  />
                </svg>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/products"
                class="flex items-center gap-3 px-4 py-3 font-medium text-gray-600 no-underline transition-all duration-200 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-900"
              >
                <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                  <path
                    d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                    stroke="currentColor"
                  />
                  <path d="M3 10H21" stroke="currentColor" />
                </svg>
                Kelola Produk
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/orders"
                class="flex items-center gap-3 px-4 py-3 font-medium text-gray-600 no-underline transition-all duration-200 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-900"
              >
                <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                    stroke="currentColor"
                  />
                  <circle cx="9" cy="20" r="1" stroke="currentColor" />
                  <circle cx="20" cy="20" r="1" stroke="currentColor" />
                </svg>
                Kelola Pesanan
              </router-link>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h3
            class="mb-0 text-xs font-semibold tracking-wider text-gray-500 uppercase"
          >
            Sistem
          </h3>
          <ul class="flex flex-col gap-1 p-0 m-0 list-none">
            <li>
              <button
                @click="handleLogout"
                class="flex items-center w-full gap-3 px-4 py-3 font-medium text-left text-red-500 no-underline transition-all duration-200 border-none rounded-md cursor-pointer hover:bg-red-50 hover:text-red-600 bg-none"
              >
                <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                  <path
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                    stroke="currentColor"
                  />
                  <path d="M16 17L21 12L16 7" stroke="currentColor" />
                  <path d="M21 12H9" stroke="currentColor" />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex flex-col flex-1 overflow-hidden ml-72">
      <!-- Header -->
      <header class="p-6 bg-white border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="mb-1 text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p class="m-0 text-gray-600">Panel Manajemen WLStore</p>
          </div>
          <div class="flex flex-col items-end">
            <span class="font-medium text-gray-900">{{
              currentUser.name
            }}</span>
            <span class="text-sm text-gray-600">Administrator</span>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="flex-1 p-6 overflow-auto">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            class="p-6 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h3 class="mb-1 text-2xl font-bold text-gray-900">
                  {{ stats.totalProducts }}
                </h3>
                <p class="mb-2 text-sm text-gray-600">Total Produk</p>
                <span class="text-xs font-medium text-green-600"
                  >+12% bulan ini</span
                >
              </div>
              <div
                class="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 text-blue-600"
                >
                  <path
                    d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                  />
                  <path d="M3 10H21" />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="p-6 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h3 class="mb-1 text-2xl font-bold text-gray-900">
                  {{ stats.totalOrders }}
                </h3>
                <p class="mb-2 text-sm text-gray-600">Total Pesanan</p>
                <span class="text-xs font-medium text-green-600"
                  >+8% bulan ini</span
                >
              </div>
              <div
                class="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 text-green-600"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                  />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="20" cy="20" r="1" />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="p-6 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h3 class="mb-1 text-2xl font-bold text-gray-900">
                  Rp {{ formatCurrency(stats.totalRevenue) }}
                </h3>
                <p class="mb-2 text-sm text-gray-600">Pendapatan</p>
                <span class="text-xs font-medium text-green-600"
                  >+15% bulan ini</span
                >
              </div>
              <div
                class="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-100"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 text-amber-600"
                >
                  <path
                    d="M12 2V22M17 5H9.5C8.4 5 7.5 5.9 7.5 7S8.4 9 9.5 9H14.5C15.6 9 16.5 9.9 16.5 11S15.6 13 14.5 13H7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="p-6 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h3 class="mb-1 text-2xl font-bold text-gray-900">
                  {{ stats.totalCustomers }}
                </h3>
                <p class="mb-2 text-sm text-gray-600">Pelanggan</p>
                <span class="text-xs font-medium text-green-600"
                  >+5% bulan ini</span
                >
              </div>
              <div
                class="flex items-center justify-center w-12 h-12 rounded-lg bg-sky-100"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 text-sky-600"
                >
                  <path
                    d="M16 21V19C16 17.8954 15.1046 17 14 17H10C8.89543 17 8 17.8954 8 19V21"
                  />
                  <circle cx="12" cy="11" r="4" />
                  <path
                    d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Cards Grid -->
        <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          <!-- Recent Activities -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div
              class="flex items-center justify-between p-6 border-b border-gray-200"
            >
              <h3 class="m-0 text-lg font-semibold text-gray-900">
                Aktivitas Terbaru
              </h3>
              <button
                class="text-sm text-blue-600 border-none cursor-pointer hover:text-blue-700 bg-none"
              >
                Lihat Semua
              </button>
            </div>
            <div class="p-6">
              <div class="flex flex-col gap-4">
                <div
                  v-for="activity in recentActivities"
                  :key="activity.id"
                  class="flex items-start gap-3"
                >
                  <div
                    class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"
                    :class="{
                      'bg-blue-100 text-blue-600': activity.type === 'product',
                      'bg-green-100 text-green-600': activity.type === 'order',
                      'bg-purple-100 text-purple-600': activity.type === 'user',
                    }"
                  >
                    <svg
                      v-if="activity.type === 'product'"
                      viewBox="0 0 24 24"
                      fill="none"
                      class="w-4 h-4 stroke-2"
                    >
                      <path
                        d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                        stroke="currentColor"
                      />
                    </svg>
                    <svg
                      v-else-if="activity.type === 'order'"
                      viewBox="0 0 24 24"
                      fill="none"
                      class="w-4 h-4 stroke-2"
                    >
                      <path
                        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                        stroke="currentColor"
                      />
                    </svg>
                    <svg
                      v-else
                      viewBox="0 0 24 24"
                      fill="none"
                      class="w-4 h-4 stroke-2"
                    >
                      <path
                        d="M17 21V19C17 17.9 16.1 17 15 17H9C7.9 17 7 17.9 7 19V21"
                        stroke="currentColor"
                      />
                      <circle cx="12" cy="7" r="4" stroke="currentColor" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-gray-900">
                      {{ activity.text }}
                    </div>
                    <div class="mt-1 text-xs text-gray-500">
                      {{ formatTime(activity.timestamp) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- System Status -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div
              class="flex items-center justify-between p-6 border-b border-gray-200"
            >
              <h3 class="m-0 text-lg font-semibold text-gray-900">
                Status Sistem
              </h3>
              <span
                class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full"
              >
                <span
                  class="w-1.5 h-1.5 bg-green-600 rounded-full status-dot active"
                ></span>
                Online
              </span>
            </div>
            <div class="p-6">
              <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between">
                  <div class="text-sm font-medium text-gray-700">
                    Server Status
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-900">
                    <span
                      class="w-2 h-2 bg-green-500 rounded-full status-dot active"
                    ></span>
                    Aktif
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="text-sm font-medium text-gray-700">Database</div>
                  <div class="flex items-center gap-2 text-sm text-gray-900">
                    <span
                      class="w-2 h-2 bg-green-500 rounded-full status-dot active"
                    ></span>
                    Terhubung
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="text-sm font-medium text-gray-700">
                    Last Backup
                  </div>
                  <div class="text-sm text-gray-900">2 jam yang lalu</div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="text-sm font-medium text-gray-700">Uptime</div>
                  <div class="text-sm text-gray-900">15 hari 4 jam</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="mb-6">
          <h2 class="mb-4 text-xl font-semibold text-gray-900">Aksi Cepat</h2>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <router-link
              to="/admin/products"
              class="p-6 no-underline transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md group"
            >
              <div class="flex items-start gap-4">
                <div
                  class="flex items-center justify-center w-10 h-10 transition-colors bg-blue-100 rounded-lg group-hover:bg-blue-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    class="w-5 h-5 text-blue-600 stroke-2"
                  >
                    <path
                      d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                      stroke="currentColor"
                    />
                    <path d="M3 10H21" stroke="currentColor" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="mb-1 text-sm font-semibold text-gray-900">
                    Kelola Produk
                  </h3>
                  <p class="text-xs text-gray-600">
                    Tambah, edit, atau hapus produk
                  </p>
                </div>
              </div>
            </router-link>

            <router-link
              to="/admin/orders"
              class="p-6 no-underline transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md group"
            >
              <div class="flex items-start gap-4">
                <div
                  class="flex items-center justify-center w-10 h-10 transition-colors bg-green-100 rounded-lg group-hover:bg-green-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    class="w-5 h-5 text-green-600 stroke-2"
                  >
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                      stroke="currentColor"
                    />
                    <circle cx="9" cy="20" r="1" stroke="currentColor" />
                    <circle cx="20" cy="20" r="1" stroke="currentColor" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="mb-1 text-sm font-semibold text-gray-900">
                    Kelola Pesanan
                  </h3>
                  <p class="text-xs text-gray-600">
                    Pantau dan proses pesanan masuk
                  </p>
                </div>
              </div>
            </router-link>

            <button
              @click="exportData"
              class="w-full p-6 text-left transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md group"
            >
              <div class="flex items-start gap-4">
                <div
                  class="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-amber-100 group-hover:bg-amber-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    class="w-5 h-5 stroke-2 text-amber-600"
                  >
                    <path
                      d="M21 15V19C21 19.6 20.6 20 20 20H4C3.4 20 3 19.6 3 19V15"
                      stroke="currentColor"
                    />
                    <path d="M7 10L12 15L17 10" stroke="currentColor" />
                    <path d="M12 15V3" stroke="currentColor" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="mb-1 text-sm font-semibold text-gray-900">
                    Export Data
                  </h3>
                  <p class="text-xs text-gray-600">Download laporan dan data</p>
                </div>
              </div>
            </button>

            <button
              @click="showSystemInfo"
              class="w-full p-6 text-left transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md group"
            >
              <div class="flex items-start gap-4">
                <div
                  class="flex items-center justify-center w-10 h-10 transition-colors bg-purple-100 rounded-lg group-hover:bg-purple-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    class="w-5 h-5 text-purple-600 stroke-2"
                  >
                    <circle cx="12" cy="12" r="3" stroke="currentColor" />
                    <path
                      d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="mb-1 text-sm font-semibold text-gray-900">
                    Info Sistem
                  </h3>
                  <p class="text-xs text-gray-600">
                    Lihat informasi sistem dan status
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/auth.service'
import axios from 'axios'

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter()
    const currentUser = ref(AuthService.getCurrentUser())

    const stats = ref({
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalCustomers: 0,
    })

    const recentActivities = ref([
      {
        id: 1,
        type: 'product',
        text: 'Produk "Smartphone XYZ" berhasil ditambahkan',
        timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      },
      {
        id: 2,
        type: 'order',
        text: 'Pesanan #ORD-2024-001 telah diproses',
        timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
      },
      {
        id: 3,
        type: 'user',
        text: 'Pengguna baru "john.doe@email.com" telah mendaftar',
        timestamp: new Date(Date.now() - 120 * 60000), // 2 hours ago
      },
      {
        id: 4,
        type: 'product',
        text: 'Stok produk "Laptop ABC" telah diperbarui',
        timestamp: new Date(Date.now() - 180 * 60000), // 3 hours ago
      },
      {
        id: 5,
        type: 'order',
        text: 'Pesanan #ORD-2024-002 menunggu konfirmasi',
        timestamp: new Date(Date.now() - 240 * 60000), // 4 hours ago
      },
    ])

    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ||
      'http://localhost:8001'

    // Check if user is admin
    if (!AuthService.isAdmin()) {
      router.push('/login')
      return
    }

    const fetchDashboardData = async () => {
      try {
        // Fetch products for stats
        const productsResponse = await axios.get(`${API_BASE_URL}/api/products`)
        const products = productsResponse.data.data || productsResponse.data

        stats.value.totalProducts = products.length

        // Mock data for demo - replace with real API calls when available
        stats.value.totalOrders = 156
        stats.value.totalRevenue = 45650000
        stats.value.totalCustomers = 89
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        // Use fallback data if API fails
        stats.value.totalProducts = 24
        stats.value.totalOrders = 156
        stats.value.totalRevenue = 45650000
        stats.value.totalCustomers = 89
      }
    }

    const formatCurrency = amount => {
      return new Intl.NumberFormat('id-ID').format(amount)
    }

    const formatTime = timestamp => {
      const now = new Date()
      const diff = now - timestamp
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      if (days > 0) {
        return `${days} hari yang lalu`
      } else if (hours > 0) {
        return `${hours} jam yang lalu`
      } else if (minutes > 0) {
        return `${minutes} menit yang lalu`
      } else {
        return 'Baru saja'
      }
    }

    const exportData = () => {
      // Simulate export functionality
      alert('Fitur export data akan segera tersedia!')
    }

    const showSystemInfo = () => {
      // Simulate system info
      alert('Sistem berjalan normal. Server aktif dan database terhubung.')
    }

    const handleLogout = () => {
      AuthService.logout()
    }

    onMounted(() => {
      fetchDashboardData()
    })

    return {
      currentUser,
      stats,
      recentActivities,
      formatCurrency,
      formatTime,
      exportData,
      showSystemInfo,
      handleLogout,
    }
  },
}
</script>

<style scoped>
/* Minimal custom CSS - 98% replaced with Tailwind + DaisyUI */

/* Pulse animation for active status indicators */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.status-dot.active {
  animation: pulse 2s infinite;
}

/* Enhanced hover effects for admin cards */
.admin-card:hover {
  transform: translateY(-2px);
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease;
}

/* Responsive layout for mobile */
@media (max-width: 1024px) {
  .flex.min-h-screen .ml-72 {
    margin-left: 0;
  }

  .flex.min-h-screen .w-72 {
    width: 100%;
    position: relative;
    height: auto;
  }

  .flex.min-h-screen {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .grid.grid-cols-1.lg\\:grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
