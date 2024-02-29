import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'
import ShoppingCartPage from './pages/ShoppingCartPage.vue'
import ProductsPage from './pages/ProductsPage.vue'
import ProductDetailPage from './pages/ProductDetailPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKN9F_gaEy7GIFWEhhT2xajJhnVbbGIZ4",
  authDomain: "vue-ecom-654d2.firebaseapp.com",
  projectId: "vue-ecom-654d2",
  storageBucket: "vue-ecom-654d2.appspot.com",
  messagingSenderId: "705888886091",
  appId: "1:705888886091:web:1f423b6fd040a91d1edcce",
  measurementId: "G-L09VCZKPEQ"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

createApp(App)
  .use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [
      {
        path: '/cart',
        component: ShoppingCartPage
      },
      {
        path: '/products',
        component: ProductsPage
      },
      {
        path: '/products/:productId',
        component: ProductDetailPage
      },
      {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage
      }
    ]
  }))
  .mount('#app')
