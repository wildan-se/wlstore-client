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
              <router-link to="/admin/dashboard" class="nav-link">
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
              <router-link to="/admin/orders" class="nav-link active">
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
            <h1 class="page-title">Kelola Pesanan</h1>
            <p class="page-subtitle">Pantau dan proses pesanan masuk</p>
          </div>
          <div class="header-right">
            <div class="header-stats">
              <div class="stat-item">
                <span class="stat-label">Total Pesanan</span>
                <span class="stat-value">{{ orders.length }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Total Pendapatan</span>
                <span class="stat-value"
                  >Rp {{ formatCurrency(totalRevenue) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="admin-content">
        <!-- Filters -->
        <div class="filters-section">
          <div class="filters-group">
            <div class="filter-item">
              <label class="filter-label">Cari Pesanan</label>
              <div class="search-input">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari berdasarkan ID pesanan atau nama pelanggan..."
                  class="search-field"
                />
              </div>
            </div>

            <div class="filter-item">
              <label class="filter-label">Status</label>
              <select v-model="statusFilter" class="filter-select">
                <option value="">Semua Status</option>
                <option value="pending">Menunggu</option>
                <option value="processing">Diproses</option>
                <option value="shipped">Dikirim</option>
                <option value="delivered">Terkirim</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>

            <div class="filter-item">
              <label class="filter-label">Rentang Tanggal</label>
              <select v-model="dateFilter" class="filter-select">
                <option value="">Semua Waktu</option>
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
                <option value="year">Tahun Ini</option>
              </select>
            </div>

            <button @click="clearFilters" class="clear-filters-btn">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" />
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" />
              </svg>
              Bersihkan
            </button>
          </div>
        </div>

        <!-- Orders Table -->
        <div class="table-section">
          <div class="table-container">
            <table class="orders-table" v-if="filteredOrders.length > 0">
              <thead>
                <tr>
                  <th>ID Pesanan</th>
                  <th>Pelanggan</th>
                  <th>Produk</th>
                  <th>Tanggal</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="order in paginatedOrders"
                  :key="order.id"
                  class="order-row"
                >
                  <td>
                    <span class="order-id">#{{ order.id }}</span>
                  </td>
                  <td>
                    <div class="customer-info">
                      <span class="customer-name">{{
                        order.customerName
                      }}</span>
                      <span class="customer-email">{{
                        order.customerEmail
                      }}</span>
                    </div>
                  </td>
                  <td>
                    <div class="products-info">
                      <span class="products-count"
                        >{{ order.items.length }} item(s)</span
                      >
                      <div class="products-preview">
                        <span
                          v-for="(item, index) in order.items.slice(0, 2)"
                          :key="index"
                          class="product-name"
                        >
                          {{ item.name
                          }}{{
                            index < Math.min(order.items.length, 2) - 1
                              ? ', '
                              : ''
                          }}
                        </span>
                        <span
                          v-if="order.items.length > 2"
                          class="more-products"
                        >
                          +{{ order.items.length - 2 }} more
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="date-info">
                      <span class="order-date">{{
                        formatDate(order.date)
                      }}</span>
                      <span class="order-time">{{
                        formatTime(order.date)
                      }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="order-amount"
                      >Rp {{ formatCurrency(order.total) }}</span
                    >
                  </td>
                  <td>
                    <span :class="['status-badge', order.status.toLowerCase()]">
                      {{ order.status }}
                    </span>
                  </td>
                  <td>
                    <div class="actions-group">
                      <button
                        @click="viewOrder(order)"
                        class="action-btn view-btn"
                      >
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                        </svg>
                      </button>
                      <button
                        @click="updateOrderStatus(order)"
                        class="action-btn edit-btn"
                      >
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                          <path
                            d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Empty State -->
            <div v-else class="empty-state">
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
              <h3>Belum Ada Pesanan</h3>
              <p>
                {{
                  searchQuery || statusFilter || dateFilter
                    ? 'Tidak ada pesanan yang sesuai dengan filter.'
                    : 'Belum ada pesanan yang masuk.'
                }}
              </p>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="filteredOrders.length > 0 && totalPages > 1"
            class="pagination"
          >
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="pagination-btn"
            >
              Sebelumnya
            </button>

            <div class="pagination-info">
              Halaman {{ currentPage }} dari {{ totalPages }} ({{
                filteredOrders.length
              }}
              pesanan)
            </div>

            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="pagination-btn"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Order Detail Modal -->
    <div v-if="selectedOrder" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Detail Pesanan - #{{ selectedOrder.id }}</h3>
          <button @click="closeModal" class="modal-close">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" />
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" />
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="order-details-grid">
            <div class="detail-section">
              <h4>Informasi Pelanggan</h4>
              <div class="detail-item">
                <span class="detail-label">Nama:</span>
                <span class="detail-value">{{
                  selectedOrder.customerName
                }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Email:</span>
                <span class="detail-value">{{
                  selectedOrder.customerEmail
                }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Telepon:</span>
                <span class="detail-value">{{
                  selectedOrder.customerPhone || 'Tidak Ada'
                }}</span>
              </div>
            </div>

            <div class="detail-section">
              <h4>Informasi Pesanan</h4>
              <div class="detail-item">
                <span class="detail-label">Tanggal:</span>
                <span class="detail-value"
                  >{{ formatDate(selectedOrder.date) }}
                  {{ formatTime(selectedOrder.date) }}</span
                >
              </div>
              <div class="detail-item">
                <span class="detail-label">Status:</span>
                <span
                  :class="['status-badge', selectedOrder.status.toLowerCase()]"
                  >{{ getStatusText(selectedOrder.status) }}</span
                >
              </div>
              <div class="detail-item">
                <span class="detail-label">Total:</span>
                <span class="detail-value"
                  >Rp {{ formatCurrency(selectedOrder.total) }}</span
                >
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h4>Item Pesanan</h4>
            <div class="order-items">
              <div
                v-for="item in selectedOrder.items"
                :key="item.id"
                class="order-item"
              >
                <div class="item-info">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-details"
                    >{{ item.quantity }}x @ Rp
                    {{ formatCurrency(item.price) }}</span
                  >
                </div>
                <div class="item-total">
                  Rp {{ formatCurrency(item.quantity * item.price) }}
                </div>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h4>Perbarui Status</h4>
            <div class="status-update">
              <select v-model="updatedStatus" class="status-select">
                <option value="pending">Menunggu</option>
                <option value="processing">Diproses</option>
                <option value="shipped">Dikirim</option>
                <option value="delivered">Terkirim</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
              <button @click="saveStatusUpdate" class="save-status-btn">
                Perbarui Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/auth.service'

export default {
  name: 'AdminOrders',
  setup() {
    const router = useRouter()

    // Check if user is admin
    if (!AuthService.isAdmin()) {
      router.push('/login')
      return
    }

    const orders = ref([])
    const searchQuery = ref('')
    const statusFilter = ref('')
    const dateFilter = ref('')
    const currentPage = ref(1)
    const itemsPerPage = 10
    const selectedOrder = ref(null)
    const updatedStatus = ref('')

    // Mock orders data - replace with actual API call
    const generateMockOrders = () => {
      const statuses = [
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
      ]
      const customers = [
        { name: 'John Doe', email: 'john@example.com', phone: '081234567890' },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '081234567891',
        },
        {
          name: 'Bob Johnson',
          email: 'bob@example.com',
          phone: '081234567892',
        },
        {
          name: 'Alice Brown',
          email: 'alice@example.com',
          phone: '081234567893',
        },
        {
          name: 'Charlie Wilson',
          email: 'charlie@example.com',
          phone: '081234567894',
        },
      ]

      const products = [
        { name: 'iPhone 14 Pro', price: 18000000 },
        { name: 'Samsung Galaxy S23', price: 15000000 },
        { name: 'MacBook Air M2', price: 20000000 },
        { name: 'iPad Pro', price: 12000000 },
        { name: 'AirPods Pro', price: 3500000 },
      ]

      const mockOrders = []
      for (let i = 1; i <= 25; i++) {
        const customer = customers[Math.floor(Math.random() * customers.length)]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const itemCount = Math.floor(Math.random() * 3) + 1
        const orderItems = []
        let total = 0

        for (let j = 0; j < itemCount; j++) {
          const product = products[Math.floor(Math.random() * products.length)]
          const quantity = Math.floor(Math.random() * 3) + 1
          const item = {
            id: `item-${i}-${j}`,
            name: product.name,
            price: product.price,
            quantity: quantity,
          }
          orderItems.push(item)
          total += product.price * quantity
        }

        mockOrders.push({
          id: `ORD${String(i).padStart(3, '0')}`,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          items: orderItems,
          date: new Date(
            Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
          ),
          total: total,
          status: status,
        })
      }

      return mockOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    const filteredOrders = computed(() => {
      let filtered = orders.value

      // Search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(
          order =>
            order.id.toLowerCase().includes(query) ||
            order.customerName.toLowerCase().includes(query) ||
            order.customerEmail.toLowerCase().includes(query),
        )
      }

      // Status filter
      if (statusFilter.value) {
        filtered = filtered.filter(order => order.status === statusFilter.value)
      }

      // Date filter
      if (dateFilter.value) {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        filtered = filtered.filter(order => {
          const orderDate = new Date(order.date)

          switch (dateFilter.value) {
            case 'today': {
              return orderDate >= today
            }
            case 'week': {
              const weekAgo = new Date(
                today.getTime() - 7 * 24 * 60 * 60 * 1000,
              )
              return orderDate >= weekAgo
            }
            case 'month': {
              const monthAgo = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                today.getDate(),
              )
              return orderDate >= monthAgo
            }
            case 'year': {
              const yearAgo = new Date(
                today.getFullYear() - 1,
                today.getMonth(),
                today.getDate(),
              )
              return orderDate >= yearAgo
            }
            default:
              return true
          }
        })
      }

      return filtered
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredOrders.value.length / itemsPerPage)
    })

    const paginatedOrders = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return filteredOrders.value.slice(start, end)
    })

    const totalRevenue = computed(() => {
      return orders.value.reduce((sum, order) => sum + order.total, 0)
    })

    const formatCurrency = amount => {
      return new Intl.NumberFormat('id-ID').format(amount)
    }

    const formatDate = date => {
      return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(new Date(date))
    }

    const formatTime = date => {
      return new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(date))
    }

    const getStatusText = status => {
      const statusMap = {
        pending: 'Menunggu',
        processing: 'Diproses',
        shipped: 'Dikirim',
        delivered: 'Terkirim',
        cancelled: 'Dibatalkan',
      }
      return statusMap[status] || status
    }

    const clearFilters = () => {
      searchQuery.value = ''
      statusFilter.value = ''
      dateFilter.value = ''
      currentPage.value = 1
    }

    const viewOrder = order => {
      selectedOrder.value = order
      updatedStatus.value = order.status
    }

    const updateOrderStatus = order => {
      viewOrder(order)
    }

    const closeModal = () => {
      selectedOrder.value = null
      updatedStatus.value = ''
    }

    const saveStatusUpdate = () => {
      if (selectedOrder.value && updatedStatus.value) {
        // Find the order and update its status
        const orderIndex = orders.value.findIndex(
          o => o.id === selectedOrder.value.id,
        )
        if (orderIndex !== -1) {
          orders.value[orderIndex].status = updatedStatus.value
          selectedOrder.value.status = updatedStatus.value
        }

        // In real app, make API call here
        console.log(
          `Updated order ${selectedOrder.value.id} status to ${updatedStatus.value}`,
        )

        closeModal()
      }
    }

    const handleLogout = () => {
      AuthService.logout()
    }

    onMounted(() => {
      orders.value = generateMockOrders()
    })

    return {
      orders,
      searchQuery,
      statusFilter,
      dateFilter,
      currentPage,
      selectedOrder,
      updatedStatus,
      filteredOrders,
      paginatedOrders,
      totalPages,
      totalRevenue,
      formatCurrency,
      formatDate,
      formatTime,
      getStatusText,
      clearFilters,
      viewOrder,
      updateOrderStatus,
      closeModal,
      saveStatusUpdate,
      handleLogout,
    }
  },
}
</script>

<style scoped>
/* Import the same CSS variables as AdminDashboard.vue */
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
  --shadow-lg:
    0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--gray-50);
}

/* Sidebar - Same as AdminDashboard.vue */
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

.header-stats {
  display: flex;
  gap: var(--space-6);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.admin-content {
  flex: 1;
  padding: var(--space-6);
  overflow: auto;
}

/* Filters */
.filters-section {
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
}

.filters-group {
  display: flex;
  gap: var(--space-4);
  align-items: end;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 200px;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.search-input {
  position: relative;
}

.search-icon {
  position: absolute;
  left: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
  stroke-width: 2;
}

.search-field {
  width: 100%;
  padding: var(--space-3) var(--space-3) var(--space-3) 2.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.search-field:focus {
  outline: none;
  border-color: var(--primary-600);
  box-shadow: 0 0 0 3px var(--primary-50);
}

.filter-select {
  padding: var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  background: var(--surface-elevated);
  transition: all 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-600);
  box-shadow: 0 0 0 3px var(--primary-50);
}

.clear-filters-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--gray-100);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  height: fit-content;
}

.clear-filters-btn:hover {
  background: var(--gray-200);
  color: var(--text-primary);
}

.clear-filters-btn svg {
  width: 16px;
  height: 16px;
}

/* Table */
.table-section {
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  overflow: hidden;
}

.table-container {
  overflow-x: auto;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th {
  background: var(--gray-50);
  padding: var(--space-4);
  text-align: left;
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border);
  font-size: 0.875rem;
}

.orders-table td {
  padding: var(--space-4);
  border-bottom: 1px solid var(--border);
  font-size: 0.875rem;
}

.order-row:hover {
  background: var(--gray-50);
}

.order-id {
  font-weight: 600;
  color: var(--primary-600);
}

.customer-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.customer-name {
  font-weight: 500;
  color: var(--text-primary);
}

.customer-email {
  color: var(--text-secondary);
  font-size: 0.75rem;
}

.products-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.products-count {
  font-weight: 500;
  color: var(--text-primary);
}

.products-preview {
  color: var(--text-secondary);
  font-size: 0.75rem;
}

.more-products {
  color: var(--text-secondary);
  font-style: italic;
}

.date-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.order-date {
  font-weight: 500;
  color: var(--text-primary);
}

.order-time {
  color: var(--text-secondary);
  font-size: 0.75rem;
}

.order-amount {
  font-weight: 600;
  color: var(--text-primary);
}

.status-badge {
  padding: var(--space-1) var(--space-3);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.pending {
  background: var(--warning-50);
  color: var(--warning-600);
}

.status-badge.processing {
  background: var(--info-50);
  color: var(--info-600);
}

.status-badge.shipped {
  background: var(--primary-50);
  color: var(--primary-600);
}

.status-badge.delivered {
  background: var(--success-50);
  color: var(--success-600);
}

.status-badge.cancelled {
  background: #fef2f2;
  color: #dc2626;
}

.actions-group {
  display: flex;
  gap: var(--space-2);
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--gray-50);
}

.action-btn svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.view-btn {
  color: var(--info-600);
}

.view-btn:hover {
  background: var(--info-50);
  border-color: var(--info-600);
}

.edit-btn {
  color: var(--warning-600);
}

.edit-btn:hover {
  background: var(--warning-50);
  border-color: var(--warning-600);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--space-8);
  color: var(--text-secondary);
}

.empty-state svg {
  width: 64px;
  height: 64px;
  margin-bottom: var(--space-4);
  stroke: currentColor;
}

.empty-state h3 {
  margin: 0 0 var(--space-2) 0;
  color: var(--text-primary);
}

.empty-state p {
  margin: 0;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--border);
  background: var(--gray-50);
}

.pagination-btn {
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface-elevated);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--gray-50);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
}

.modal-content {
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6);
  border-bottom: 1px solid var(--border);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: var(--gray-100);
  color: var(--text-primary);
}

.modal-close svg {
  width: 20px;
  height: 20px;
}

.modal-body {
  padding: var(--space-6);
}

.order-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.detail-section h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border);
  padding-bottom: var(--space-2);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
}

.detail-label {
  font-weight: 500;
  color: var(--text-secondary);
}

.detail-value {
  color: var(--text-primary);
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.item-name {
  font-weight: 500;
  color: var(--text-primary);
}

.item-details {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.item-total {
  font-weight: 600;
  color: var(--text-primary);
}

.status-update {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

.status-select {
  flex: 1;
  padding: var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  background: var(--surface-elevated);
}

.save-status-btn {
  padding: var(--space-3) var(--space-4);
  background: var(--primary-600);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-status-btn:hover {
  background: var(--primary-700);
}

/* Responsive */
@media (max-width: 1024px) {
  .admin-sidebar {
    width: 240px;
  }

  .filters-group {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-item {
    min-width: auto;
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

  .admin-content {
    padding: var(--space-4);
  }

  .table-container {
    overflow-x: scroll;
  }

  .orders-table {
    min-width: 800px;
  }

  .pagination {
    flex-direction: column;
    gap: var(--space-2);
  }

  .modal-overlay {
    padding: var(--space-2);
  }

  .order-details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
