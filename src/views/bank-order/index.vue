<template>
  <div class="bank-order">
    
  </div>
</template>




<script>
export default {
  mounted(){
    const order = JSON.parse(this.$route.query.order);
    console.log(order);
  }
}
</script>