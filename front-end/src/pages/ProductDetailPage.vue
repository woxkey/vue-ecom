<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button @click="addToCart" class="add-to-cart" v-if="!itemIsInCart">Add to Cart</button>
      <button class="grey-button" v-if="itemIsInCart">Item is already in cart</button>
      <button class="sign-in" @click="signIn">Sign in to add to cart</button>
    </div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>

<script>
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import axios from 'axios'
import NotFoundPage from './NotFoundPage.vue';

export default {
  name: 'ProductDetailPage',
  components: {
    NotFoundPage
  },
  data() {
    return {
      product: {},
      cartItems: []
    }
  },
  computed: {
    itemIsInCart() {
      return this.cartItems.some(item => item.id === this.$route.params.productId)
    }
  },
  methods: {
    async addToCart() {
      await axios.post('/api/users/12345/cart', { id: this.$route.params.productId })
      alert('successfuly added item to cart')
    },
    async signIn() {
      const email = prompt('please enter your email to sign in')
      const auth = getAuth();
      const actionCodeSettings = {
        url: `https://symmetrical-goggles-6x7gv9xvg5425j99-8080.app.github.dev/products/${this.$route.params.productId}`,
        handleCodeInApp: true
      }

      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      alert('check your email!')
      window.localStorage.setItem('emailForSignIn', email);
    }
  },
  async created() {
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn')
      await signInWithEmailLink(auth, email, window.location.href)
      alert('you are signed in!')
      window.localStorage.removeItem('emailForSignIn')
    }

    const response = await axios.get(`/api/products/${this.$route.params.productId}`)
    const product = response.data;
    this.product = product

    const cartResponse = await axios.get('/api/users/12345/cart')
    const cartItems = cartResponse.data;
    this.cartItems = cartItems;
  }
}
</script>