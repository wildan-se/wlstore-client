<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
          <span>WLStore Admin</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <h3 class="nav-title">Manajemen</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/admin/dashboard" class="nav-link active">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="9"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="5"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <rect
                    x="14"
                    y="12"
                    width="7"
                    height="9"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <rect
                    x="3"
                    y="16"
                    width="7"
                    height="5"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/products" class="nav-link">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path d="M3 10H21" stroke="currentColor" stroke-width="2" />
                </svg>
                Kelola Produk
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/orders" class="nav-link">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <circle
                    cx="9"
                    cy="20"
                    r="1"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="1"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                Kelola Pesanan
              </router-link>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <h3 class="nav-title">Sistem</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <a @click="handleLogout" class="nav-link logout">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M16 17L21 12L16 7"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path d="M21 12H9" stroke="currentColor" stroke-width="2" />
                </svg>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="admin-main">
      <!-- Header -->
      <header class="admin-header">
        <div class="header-content">
          <div class="header-left">
            <h1 class="page-title">Admin Dashboard</h1>
            <p class="page-subtitle">Panel Manajemen WLStore</p>
          </div>
          <div class="header-right">
            <div class="user-info">
              <span class="user-name">{{ currentUser.name }}</span>
              <span class="user-role">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="admin-content">
        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon primary">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                />
                <path d="M3 10H21" />
              </svg>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">{{ stats.totalProducts }}</h3>
              <p class="stat-label">Total Produk</p>
              <span class="stat-change positive">+12% bulan ini</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon success">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                />
                <circle cx="9" cy="20" r="1" />
                <circle cx="20" cy="20" r="1" />
              </svg>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">{{ stats.totalOrders }}</h3>
              <p class="stat-label">Total Pesanan</p>
              <span class="stat-change positive">+8% bulan ini</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon warning">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2V22M17 5H9.5C8.4 5 7.5 5.9 7.5 7S8.4 9 9.5 9H14.5C15.6 9 16.5 9.9 16.5 11S15.6 13 14.5 13H7"
                />
              </svg>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">
                Rp {{ formatCurrency(stats.totalRevenue) }}
              </h3>
              <p class="stat-label">Pendapatan</p>
              <span class="stat-change positive">+15% bulan ini</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon info">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M16 21V19C16 17.8954 15.1046 17 14 17H10C8.89543 17 8 17.8954 8 19V21"
                />
                <circle cx="12" cy="11" r="4" />
                <path
                  d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z"
                />
              </svg>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">{{ stats.totalCustomers }}</h3>
              <p class="stat-label">Pelanggan</p>
              <span class="stat-change positive">+5% bulan ini</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions-section">
          <h2 class="section-title">Aksi Cepat</h2>
          <div class="actions-grid">
            <router-link to="/admin/products" class="action-card">
              <div class="action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path d="M3 10H21" stroke="currentColor" stroke-width="2" />
                </svg>
              </div>
              <div class="action-content">
                <h3 class="action-title">Kelola Produk</h3>
                <p class="action-description">
                  Tambah, edit, atau hapus produk
                </p>
              </div>
            </router-link>

            <router-link to="/admin/orders" class="action-card">
              <div class="action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2H6C5.4 2 4.9 2.4 4.8 3L2 14H22L19.2 3C19.1 2.4 18.6 2 18 2H16"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 2V8L17 6L20 8V2"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 14V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20V14"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <div class="action-content">
                <h3 class="action-title">Kelola Pesanan</h3>
                <p class="action-description">
                  Pantau dan proses pesanan masuk
                </p>
              </div>
            </router-link>

            <button @click="exportData" class="action-card">
              <div class="action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15V19C21 19.6 20.6 20 20 20H4C3.4 20 3 19.6 3 19V15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 15V3"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="action-content">
                <h3 class="action-title">Export Data</h3>
                <p class="action-description">Download laporan dan data</p>
              </div>
            </button>

            <button @click="showSystemInfo" class="action-card">
              <div class="action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M19.4 15C19.1 15.4 19.1 15.9 19.3 16.3L20.4 18.1C20.6 18.5 20.5 19 20.1 19.3L18.1 20.7C17.7 21 17.2 21 16.8 20.8L14.9 19.8C14.5 19.6 14 19.7 13.6 20L12.4 21.7C12.2 22.1 11.8 22.3 11.3 22.3H9.7C9.2 22.3 8.8 22.1 8.6 21.7L7.4 20C7 19.7 6.5 19.6 6.1 19.8L4.2 20.8C3.8 21 3.3 21 2.9 20.7L0.9 19.3C0.5 19 0.4 18.5 0.6 18.1L1.7 16.3C1.9 15.9 1.9 15.4 1.6 15L0.3 13.3C0.1 12.9 0.1 12.4 0.4 12L2.4 10.6C2.8 10.3 2.8 9.8 2.6 9.4L1.5 7.6C1.3 7.2 1.4 6.7 1.8 6.4L3.8 5C4.2 4.7 4.7 4.7 5.1 4.9L7 5.9C7.4 6.1 7.9 6 8.3 5.7L9.5 4C9.7 3.6 10.1 3.4 10.6 3.4H12.2C12.7 3.4 13.1 3.6 13.3 4L14.5 5.7C14.9 6 15.4 6.1 15.8 5.9L17.7 4.9C18.1 4.7 18.6 4.7 19 5L21 6.4C21.4 6.7 21.5 7.2 21.3 7.6L20.2 9.4C20 9.8 20 10.3 20.3 10.7L21.6 12.4C21.8 12.8 21.8 13.3 21.5 13.7L19.4 15Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <div class="action-content">
                <h3 class="action-title">Info Sistem</h3>
                <p class="action-description">
                  Lihat informasi sistem dan status
                </p>
              </div>
            </button>
          </div>
        </div>

        <!-- Management Summary -->
        <div class="dashboard-grid">
          <!-- Recent Activities -->
          <div class="dashboard-card">
            <div class="card-header">
              <h3 class="card-title">Aktivitas Terbaru</h3>
              <button class="view-all-link">Lihat Semua</button>
            </div>
            <div class="card-content">
              <div class="activities-list">
                <div
                  v-for="activity in recentActivities"
                  :key="activity.id"
                  class="activity-item"
                >
                  <div class="activity-icon" :class="activity.type">
                    <svg
                      v-if="activity.type === 'product'"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                    <svg
                      v-else-if="activity.type === 'order'"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17 21V19C17 17.9 16.1 17 15 17H9C7.9 17 7 17.9 7 19V21"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <circle
                        cx="12"
                        cy="7"
                        r="4"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  <div class="activity-content">
                    <div class="activity-text">{{ activity.text }}</div>
                    <div class="activity-time">
                      {{ formatTime(activity.timestamp) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- System Status -->
          <div class="dashboard-card">
            <div class="card-header">
              <h3 class="card-title">Status Sistem</h3>
              <span class="status-indicator online">Online</span>
            </div>
            <div class="card-content">
              <div class="system-stats">
                <div class="system-stat">
                  <div class="stat-label">Server Status</div>
                  <div class="stat-value">
                    <span class="status-dot active"></span>
                    Aktif
                  </div>
                </div>
                <div class="system-stat">
                  <div class="stat-label">Database</div>
                  <div class="stat-value">
                    <span class="status-dot active"></span>
                    Terhubung
                  </div>
                </div>
                <div class="system-stat">
                  <div class="stat-label">Last Backup</div>
                  <div class="stat-value">2 jam yang lalu</div>
                </div>
                <div class="system-stat">
                  <div class="stat-label">Uptime</div>
                  <div class="stat-value">15 hari 4 jam</div>
                </div>
              </div>
            </div>
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
/* Import the same CSS variables as AdminProducts.vue */
:root {
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-600: #2563eb;
  --success-50: #f0fdf4;
  --success-600: #16a34a;
  --warning-50: #fffbeb;
  --warning-600: #d97706;
  --info-50: #f0f9ff;
  --info-600: #0891b2;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --surface-elevated: #ffffff;
  --border: var(--gray-200);
  --text-primary: var(--gray-900);
  --text-secondary: var(--gray-600);
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--gray-50);
}

/* Sidebar - Same as AdminProducts.vue */
.admin-sidebar {
  width: 280px;
  background: var(--surface-elevated);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 700;
  color: var(--text-primary);
}

.logo svg {
  width: 32px;
  height: 32px;
  color: var(--primary-600);
}

.sidebar-nav {
  flex: 1;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.nav-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.nav-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin: 0;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.nav-link:hover {
  background: var(--gray-100);
  color: var(--text-primary);
}

.nav-link.active {
  background: var(--primary-50);
  color: var(--primary-600);
}

.nav-link svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.nav-link.logout {
  color: #ef4444;
}

.nav-link.logout:hover {
  background: #fef2f2;
  color: #dc2626;
}

/* Main Content */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.admin-header {
  background: var(--surface-elevated);
  border-bottom: 1px solid var(--border);
  padding: var(--space-6);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-1) 0;
}

.page-subtitle {
  color: var(--text-secondary);
  margin: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-1);
}

.user-name {
  font-weight: 600;
  color: var(--text-primary);
}

.user-role {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: capitalize;
}

.admin-content {
  flex: 1;
  padding: var(--space-6);
  overflow: auto;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.stat-card {
  background: var(--surface-elevated);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
  display: flex;
  gap: var(--space-4);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon.primary {
  background: var(--primary-50);
  color: var(--primary-600);
}

.stat-icon.success {
  background: var(--success-50);
  color: var(--success-600);
}

.stat-icon.warning {
  background: var(--warning-50);
  color: var(--warning-600);
}

.stat-icon.info {
  background: var(--info-50);
  color: var(--info-600);
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-1) 0;
}

.stat-label {
  color: var(--text-secondary);
  margin: 0 0 var(--space-2) 0;
}

.stat-change {
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-change.positive {
  color: var(--success-600);
}

/* Quick Actions */
.quick-actions-section {
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-6);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
}

.action-card {
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s ease;
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-300);
}

.action-icon {
  width: 40px;
  height: 40px;
  background: var(--primary-50);
  color: var(--primary-600);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon svg {
  width: 20px;
  height: 20px;
}

.action-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 var(--space-1);
}

.action-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

/* Activities */
.activities-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  transition: background-color 0.2s ease;
}

.activity-item:hover {
  background: var(--gray-50);
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon svg {
  width: 18px;
  height: 18px;
}

.activity-icon.product {
  background: var(--primary-50);
  color: var(--primary-600);
}

.activity-icon.order {
  background: var(--success-50);
  color: var(--success-600);
}

.activity-icon.user {
  background: var(--info-50);
  color: var(--info-600);
}

.activity-text {
  font-size: 0.875rem;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
  line-height: 1.4;
}

.activity-time {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* System Status */
.status-indicator {
  padding: var(--space-1) var(--space-3);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.status-indicator.online {
  background: var(--success-50);
  color: var(--success-600);
}

.system-stats {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.system-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3);
  background: var(--gray-50);
  border-radius: var(--radius-md);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-value {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 500;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gray-400);
}

.status-dot.active {
  background: var(--success-500);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-6);
}

.dashboard-card {
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
  overflow: hidden;
}

.card-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.view-all-link {
  font-size: 0.875rem;
  color: var(--primary-600);
  text-decoration: none;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
}

.view-all-link:hover {
  text-decoration: underline;
}

.card-content {
  padding: var(--space-6);
}

/* Responsive */
@media (max-width: 1024px) {
  .admin-sidebar {
    width: 240px;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-layout {
    flex-direction: column;
  }

  .admin-sidebar {
    width: 100%;
    height: auto;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--space-4);
  }

  .stat-card {
    padding: var(--space-4);
  }

  .admin-content {
    padding: var(--space-4);
  }
}
</style>
