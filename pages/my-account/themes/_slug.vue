<template>
  <div>
    <Header theme="light" />
    <admin-page>
      <admin-page-top>
        <h1 class="h2">Order #{{ $route.params.slug }}</h1>
      </admin-page-top>
      <admin-page-content>
        <div class="dashboard-table">
          <div class="table-row row m-0 th align-items-center">
            <div class="col-4 col-lg-2 p-0">
              <div><span>Date</span></div>
            </div>
            <div class="col-4 col-lg-2 p-0">
              <div><span>Order ID</span></div>
            </div>
            <div class="col-4 col-lg-2 p-0">
              <div><span>Amount</span></div>
            </div>
            <div class="d-none d-lg-block col-lg-2 p-0">
              <div><span>Selected plan</span></div>
            </div>
            <div class="d-none d-lg-block col-lg-2 p-0">
              <div><span>Theme ID</span></div>
            </div>
            <div class="d-none d-lg-block col-lg-2 p-0">
              <div><span>Cancellation</span></div>
            </div>
          </div>
          <div class="table-row row m-0 align-items-center">
            <div class="p-0 col-4 col-lg-2">
              <div><span>05.19.2021</span></div>
            </div>
            <div class="p-0 col-4 col-lg-2">
              <div><span>#987498920</span></div>
            </div>
            <div class="p-0 col-4 col-lg-2">
              <div><span>$999.00</span></div>
            </div>
            <div class="p-0 col-4 col-lg-2 d-none d-lg-block">
              <div><span>Ultimate</span></div>
            </div>
            <div class="p-0 col-4 col-lg-2 d-none d-lg-block">
              <div>
                <nuxt-link :to="`/themes/123456/`"
                  ><span>#123456</span></nuxt-link
                >
              </div>
            </div>
            <div class="p-0 col-4 col-lg-2 d-none d-lg-block">
              <div>
                <a href="#" class="btn-reset btn d-block"> Cancel </a>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard-table d-lg-none mt-3">
          <div class="table-row row m-0 th align-items-center">
            <div class="col-4 p-0">
              <div><span>Selected plan</span></div>
            </div>
            <div class="col-4 p-0">
              <div><span>Theme ID</span></div>
            </div>
            <div class="col-4 p-0">
              <div><span>Cancellation</span></div>
            </div>
          </div>
          <div class="table-row row m-0 align-items-center">
            <div class="p-0 col-4">
              <div><span>Ultimate</span></div>
            </div>
            <div class="p-0 col-4">
              <div>
                <nuxt-link :to="`/themes/123456/`"
                  ><span>#123456</span></nuxt-link
                >
              </div>
            </div>
            <div class="p-0 col-4">
              <div>
                <a href="#" class="btn-reset btn d-block"> Cancel </a>
              </div>
            </div>
          </div>
        </div>
      </admin-page-content>
    </admin-page>

    <Footer />
  </div>
</template>
