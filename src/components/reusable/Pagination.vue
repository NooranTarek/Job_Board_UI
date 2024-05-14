<template>
    <nav aria-label="Pagination">
        <div class="pagination">
            <ul class="pagination-content">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="prevPage">Previous</button>
              </li>
              <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                <button class="page-link" @click="gotoPage(page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="nextPage">Next</button>
              </li>
            </ul>
        </div>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      },
      totalCount: {
        type: Number,
        required: true
      }
    },
    methods: {
      prevPage() {
        if (this.currentPage > 1) {
          this.$emit('page-changed', this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.$emit('page-changed', this.currentPage + 1);
        }
      },
      gotoPage(page) {
        this.$emit('page-changed', page);
      }
    }
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .pagination-content {
    margin: 20px 0;
    text-align: center;
    display: flex;
    justify-content: center;
    list-style: none;
  }
  
  .page-item {
    cursor: pointer;
  }
  
  .page-item.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  </style>
  